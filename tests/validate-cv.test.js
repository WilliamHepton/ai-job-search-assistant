// Validator test: runs the real "Parse profile" and "Validate and render" node code from
// workflows/tailored-cv.json against a fake Claude response that tries to cheat.
// Usage: node tests/validate-cv.test.js        (no dependencies)
const fs = require('fs');
const path = require('path');
const assert = require('assert/strict');

const root = path.join(__dirname, '..');
const wf = JSON.parse(fs.readFileSync(path.join(root, 'workflows/tailored-cv.json'), 'utf8'));
const nodeCode = name => wf.nodes.find(n => n.name === name).parameters.jsCode;
const config = JSON.parse(wf.nodes.find(n => n.name === 'CV config').parameters.jsonOutput);
// The example's "not yet learned" list is a placeholder; the test uses its own list.
const TEST_NOT_LEARNED = 'Make, Zapier, Power Automate, Azure, Python, MCP / AI agents with tool calling, Kubernetes';
const profileMd = fs.readFileSync(path.join(root, 'examples/about-me.example.md'), 'utf8')
  .replace(/^(\*\*Not yet learned[^*]*\*\*\s*).+$/m, (_, h) => h + TEST_NOT_LEARNED);
const template = fs.readFileSync(path.join(root, 'templates/cv-template.html'), 'utf8');

// Minimal stand-ins for n8n's Code node globals.
const $now = { setZone() { return this; }, minus() { return this; }, toFormat: () => '2026-11-20' };
const runNode = async (code, ctx) => {
  const fn = new Function('$', '$input', '$now', 'Buffer', `return (async () => {${code}\n}).call(this);`);
  return fn.call(ctx.self ?? {}, ctx.$, ctx.$input, $now, Buffer);
};

(async () => {
  // 1. Parse the example profile with the real node code.
  const [{ json: { profile } }] = await runNode(nodeCode('Parse profile'), {
    self: { helpers: { getBinaryDataBuffer: async () => Buffer.from(profileMd, 'utf8') } },
    $: () => { throw new Error('not used'); },
  });

  // 2. A Claude response that breaks the rules on purpose.
  const job = { job_id: 'test_1', title: 'AI Automation Engineer', company: 'Example Ltd', description: 'Build n8n and Python automations.', score: 80 };
  const cheat = {
    headline: 'Senior Python Automation Architect', headline_id: 'HL-02',
    profile: 'Software developer with a BSc (Hons) in Computing and Software Development (2:1). Builds AI automations in Python. Built pipelines that process 5000 jobs a day.',
    profile_ids: ['PR-01', 'PR-02'],
    skills: [
      { group: 'Automation', items: 'n8n (self-hosted in Docker), Zapier, REST APIs', source_id: 'SK-AUTO' },
      { group: 'Programming', items: 'JavaScript, Python, C#', source_id: 'SK-PROG' },
      { group: 'Made up', items: 'Kubernetes', source_id: 'SK-FAKE' },
    ],
    experience: [
      { source: 'YFT', bullets: [
        { text: 'Led a 12-person engineering team.', source_id: 'YFT-99' },              // made-up ID
        { text: 'Built an AI FAQ assistant with Python and MCP.', source_id: 'YFT-06' }, // not-yet-learned terms
        { text: 'Cut costs with a £50 monthly cap.', source_id: 'YFT-13' },             // invented number
        { text: 'Built a replacement for the gym software using Claude Code.', source_id: 'YFT-04' },
      ] },
      { source: 'TG', bullets: [{ text: 'Shipped two commercial games.', source_id: 'PZ-01' }] }, // ID from another role
    ],
    projects: [{ source: 'JS', bullets: [{ text: 'Handled a security incident.', source_id: 'JS-09' }] }], // interviews-only fact
    earlier_roles_line: true, include_baccalaureate: false, tailoring_notes: 'Test.',
  };
  const claudeResponse = { stop_reason: 'end_turn', content: [{ type: 'text', text: JSON.stringify(cheat) }], usage: { input_tokens: 100, output_tokens: 50 } };

  // 3. Run the real validator node.
  const [out] = await runNode(nodeCode('Validate and render'), {
    $: name => ({
      'CV config': { first: () => ({ json: config }) },
      'Parse profile': { first: () => ({ json: { profile } }) },
      'Build tailoring request': { itemMatching: () => ({ json: { job, template } }) },
    }[name]),
    $input: { all: () => [{ json: claudeResponse }] },
  });

  const { cv_data: cv, validator_log: log } = out.json;
  const html = Buffer.from(out.binary.index.data, 'base64').toString('utf8');
  const printed = JSON.stringify(cv);
  console.log('Validator log:\n  - ' + log.join('\n  - '));

  assert.equal(out.json.ok, true);
  for (const term of ['Python', 'Zapier', 'MCP', 'Kubernetes']) assert.ok(!html.includes(term), `${term} must not be printed`);
  assert.ok(!printed.includes('YFT-99') && !html.includes('12-person'), 'made-up bullet ID removed');
  assert.ok(!printed.includes('JS-09'), 'interviews-only fact removed');
  assert.ok(!html.includes('£50') && html.includes('£2 a month'), 'invented number replaced by the original wording');
  assert.ok(!html.includes('5000'), 'profile with an invented number replaced');
  assert.equal(cv.headline, 'Software Developer | n8n, LLM APIs & Integrations', 'invalid headline replaced by the cited option');
  assert.ok(cv.experience[0].title.includes('(voluntary)'), 'voluntary role labelled');
  assert.deepEqual(cv.experience.map(e => e.source), ['YFT', 'TG', 'PZ', 'UW'], 'roles in date order, newest first');
  assert.ok(cv.experience.find(e => e.source === 'TG').bullets.every(b => b.source_id.startsWith('TG-')), 'TG falls back to its own bullets');
  assert.ok(!html.includes('{{'), 'template fully rendered');
  assert.ok(html.includes('font-variant-ligatures: none'), 'ligatures are off, so checkers can read the text');
  assert.ok(Array.isArray(cv.earlier) && cv.earlier.length === 2 && cv.earlier.every(x => html.includes(`<li>${x}</li>`)), 'earlier roles printed as bullets');
  assert.ok(html.includes('alex@example.com'), 'contact details come from the file');

  // 4. A Microsoft-stack job: skill layout, n8n wording, and tech that the cited fact doesn't name.
  const msJob = { job_id: 'test_2', title: 'Application Engineer', company: 'Example Ltd', description: 'C# .NET, Power Automate and Azure.', score: 60 };
  const ms = { ...cheat, headline: 'Software Developer | Azure Engineer',
    skills: [
      { group: 'Programming', items: 'Java, MongoDB, C++, JavaScript (including n8n Code nodes), C#, Docker', source_id: 'SK-PROG' },
      { group: 'Automation', items: 'n8n (self-hosted in Docker), REST APIs, Power Automate', source_id: 'SK-AUTO' },
    ],
    experience: [{ source: 'PZ', bullets: [{ text: 'Worked on workforce management software in Angular.', source_id: 'PZ-01' }] }] };
  const [out2] = await runNode(nodeCode('Validate and render'), {
    $: name => ({
      'CV config': { first: () => ({ json: config }) },
      'Parse profile': { first: () => ({ json: { profile } }) },
      'Build tailoring request': { itemMatching: () => ({ json: { job: msJob, template } }) },
    }[name]),
    $input: { all: () => [{ json: { ...claudeResponse, content: [{ type: 'text', text: JSON.stringify(ms) }] } }] },
  });
  assert.equal(out2.json.ok, true, out2.json.error);
  const cv2 = out2.json.cv_data, html2 = Buffer.from(out2.binary.index.data, 'base64').toString('utf8');
  const group = g => cv2.skills.find(s => s.group === g)?.items ?? '';
  assert.match(group('Programming'), /^C#, \.NET, SQL(, PostgreSQL)?(, TypeScript)?, JavaScript[^,]*, C\+\+/, 'Microsoft-stack order');
  assert.ok(!/\bJava\b|MongoDB|Docker|Git/.test(group('Programming')), 'Java, MongoDB and tools not under Programming');
  assert.equal(group('Tools and DevOps'), 'Git/GitHub, Docker');
  const order = cv2.skills.map(s => profile.skills.findIndex(k => k.group === s.group)).filter(i => i >= 0);
  assert.deepEqual(order, [...order].sort((a, b) => a - b), 'skill groups in the profile order');
  assert.ok(group('Integration and automation').startsWith('workflow automation in n8n (same model as Power Automate'), 'fixed n8n wording');
  assert.equal(html2.split('Power Automate').length, 2, 'Power Automate only inside the fixed wording');
  assert.ok(!html2.includes('Azure') || !profile.notLearned.includes('Azure'), 'Azure blocked when it is on the not-learned list');
  assert.ok(!html2.includes('Angular'), 'tech the cited fact does not name is removed');
  // The headline may use job-title words only; a tech word from neither source is reported.
  assert.ok(!out2.json.validator_log.some(l => l.startsWith('NOT IN MASTER PROFILE')), 'nothing outside the profile is printed');
  console.log('\nAll validator checks passed.');
})().catch(e => { console.error(e); process.exit(1); });
