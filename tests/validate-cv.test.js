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
const profileMd = fs.readFileSync(path.join(root, 'examples/about-me.example.md'), 'utf8');
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
  assert.ok(html.includes('alex@example.com'), 'contact details come from the file');
  console.log('\nAll validator checks passed.');
})().catch(e => { console.error(e); process.exit(1); });
