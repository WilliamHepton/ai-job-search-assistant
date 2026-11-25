// Runs the real title filter, ranking, location and score-cap code from the workflows.
// Usage: node tests/job-search.test.js
const fs = require('fs'), path = require('path'), assert = require('assert/strict');
const load = f => JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'workflows', f + '.json'), 'utf8'));
const A = load('daily-job-scan'), B = load('manual-job-webhook');
const code = (w, n) => w.nodes.find(x => x.name === n).parameters.jsCode;
const config = JSON.parse(A.nodes.find(n => n.name === 'Search config').parameters.jsonOutput);
const items = l => l.map(json => ({ json }));

// Title filter: whole words only.
const filter = titles => new Function('$', '$input', code(A, 'Drop obvious mismatches'))(
  () => ({ first: () => ({ json: config }) }), { all: () => items(titles.map(title => ({ title }))) }).map(i => i.json.title);
const keep = ['JavaScript Developer', 'Implementation Manager', 'Full Stack TypeScript Developer', 'C# Developer'];
assert.deepEqual(filter(keep), keep);
assert.deepEqual(filter(['Java Developer', 'Lead Developer', 'Solutions Architect', 'Product Manager', 'SAP Consultant', 'Trainee DevOps Engineer']), []);

// Location helpers, identical in every node that uses them.
const block = s => /\/\/ ===== Location helpers[\s\S]*?\/\/ ===== End of location helpers =====/.exec(s)[0];
const blocks = [code(A, 'Places to look up'), code(A, 'Rank and cap'), code(A, 'Full text and location'), code(B, 'Place to look up'), code(B, 'Build Claude request')].map(block);
assert.ok(blocks.every(b => b === blocks[0]), 'helpers are the same everywhere');
const h = new Function(blocks[0] + '\nreturn { locate, workMode, outcodeOf, geoKey, milesBetween };')();
assert.equal(h.outcodeOf('GU212JX'), 'GU21');
assert.equal(h.outcodeOf('London'), null);
assert.equal(h.geoKey('Bournbrook, Birmingham'), 'Bournbrook');
const at = (description, point, location = 'Town') => h.locate({ title: 'Developer', location, description }, point, config);
const london = { lat: 51.5, lon: -0.1 }, birmingham = { lat: 52.44, lon: -1.93 }, coventry = { lat: 52.41, lon: -1.51 };
assert.equal(at('Role based remotely (UK)', london).location_verdict, 'ok');
assert.equal(at('Location: London, UK / Remote Working', london).location_verdict, 'possible');
assert.equal(at('Hybrid working', coventry).location_verdict, 'ok');
assert.equal(at('Office based role', coventry).location_verdict, 'too far');
assert.equal(at('', coventry).location_verdict, 'possible');
assert.equal(at('', birmingham).location_verdict, 'ok');
assert.equal(at('', london).location_verdict, 'probably too far');
assert.equal(at('', null).location_verdict, 'unknown');
assert.equal(at('We offer remote support to customers', london).work_mode, 'unclear');
assert.equal(at('This is not fully remote. 3 days in the office', london).location_verdict, 'too far');
assert.equal(at('', null, 'Belfast, Northern Ireland').location_verdict, 'probably too far');

// Score caps are enforced by code.
const cap = (score, location_verdict) => new Function('$', '$input', code(A, 'Parse score'))(
  () => ({ all: () => items([{ location_verdict }]) }),
  { all: () => items([{ content: [{ type: 'text', text: JSON.stringify({ score, matched_skills: [], missing_skills: [], reason: 'x', remote_or_local_ok: true }) }] }]) })[0].json;
assert.equal(cap(62, 'probably too far').score, 45);
assert.equal(cap(62, 'too far').score, 35);
assert.equal(cap(62, 'ok').score, 62);
assert.equal(cap(62, 'too far').remote_or_local_ok, false);
console.log('All job search checks passed.');
