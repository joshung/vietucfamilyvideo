import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const project = path.join(root, 'projects/hanh-trinh-cua-dad');
const factPath = path.join(project, 'production/facts/fact-lock.json');
const audioPath = path.join(project, 'production/audio/voiceover-cues.json');
const heroPath = path.join(project, 'production/remotion/hero-frame-prompts.json');
const framePath = path.join(project, 'production/remotion/frame-prompt-manifest.jsonl');

const fact = JSON.parse(fs.readFileSync(factPath, 'utf8'));
const audio = JSON.parse(fs.readFileSync(audioPath, 'utf8'));
const hero = JSON.parse(fs.readFileSync(heroPath, 'utf8'));

const fail = (msg) => {
  console.error('FACT LOCK FAIL: ' + msg);
  process.exitCode = 1;
};

if (fact.identity.country !== 'Australia') fail('identity.country must be Australia, got ' + fact.identity.country);
if (!/Australian/i.test(fact.identity.nationality_en || '')) fail('nationality_en must be Australian');
if (!/Úc/u.test(fact.identity.nationality_vi || '')) fail('nationality_vi must identify Dad as người Úc');
if (!/Adelaide/i.test(fact.identity.known_residence_work_context || '')) fail('Adelaide context missing');

const forbiddenRe = /(Mỹ|Hoa Kỳ|USA|America|American|United States)/iu;

const openingCues = audio.cues.filter((c) => c.start_frame < 240);
const openingText = openingCues.map((c) => c.text).join(' ');
const allAudioText = audio.cues.map((c) => c.text).join(' ');

for (const required of ['Dad Stevenson', 'Úc', 'Adelaide']) {
  if (!openingText.includes(required)) fail('opening audio missing required claim/token: ' + required);
}
if (forbiddenRe.test(openingText)) fail('opening narration contains forbidden US/America origin term');
if (forbiddenRe.test(allAudioText)) fail('voiceover contains forbidden US/America term');

const hero1 = hero.prompts.find((p) => p.scene_id === 'S01_SH01');
if (!hero1) fail('missing S01_SH01 hero prompt');
else {
  if (!/Australia/i.test(hero1.prompt)) fail('S01_SH01 hero prompt must explicitly use Australia');
  if (!/DAD_REF_01/.test(hero1.prompt)) fail('S01_SH01 hero prompt must use DAD_REF_01');
  if (forbiddenRe.test(hero1.prompt)) fail('S01_SH01 hero prompt contains forbidden US/America term');
}

if (!fs.existsSync(framePath)) fail('frame-prompt-manifest.jsonl missing; rebuild it first');
else {
  const lines = fs.readFileSync(framePath, 'utf8').trim().split(/\r?\n/);
  const openingFrames = [];
  for (let i = 0; i < Math.min(240, lines.length); i++) openingFrames.push(JSON.parse(lines[i]));
  if (openingFrames.length !== 240) fail('expected 240 opening frames, found ' + openingFrames.length);
  const factAware = openingFrames.map((r) => [r.scene_title, r.action, ...(r.reference_assets || [])].join(' ')).join('\n');
  const constraintText = openingFrames.map((r) => (r.fact_constraints || []).join(' ')).join('\n');
  if (!/Australia|Australian|Úc/i.test(constraintText)) fail('first 10 seconds frame prompts do not carry Australia fact constraints');
  if (forbiddenRe.test(factAware)) fail('first 10 seconds action/title/reference fields contain forbidden US/America term');
  const s1 = openingFrames.filter((r) => r.scene_id === 'S01_SH01');
  if (!s1.every((r) => (r.fact_constraints || []).some((x) => /Australian|Australia|Úc/i.test(x)))) {
    fail('S01_SH01 frame prompts are missing Australia/Australian fact constraints');
  }
}

const srcDir = path.join(root, 'src');
if (fs.existsSync(srcDir)) {
  const walk = (dir) => fs.readdirSync(dir, {withFileTypes: true}).flatMap((ent) => {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) return ent.name === 'node_modules' ? [] : walk(p);
    return /\.(tsx?|jsx?|json)$/i.test(ent.name) ? [p] : [];
  });
  for (const p of walk(srcDir)) {
    const txt = fs.readFileSync(p, 'utf8');
    if (forbiddenRe.test(txt)) fail('implementation source contains forbidden US/America term: ' + path.relative(root, p));
  }
}

if (!process.exitCode) {
  console.log('FACT LOCK PASS');
  console.log('Dad = Australian / người Úc');
  console.log('Origin context = Adelaide, South Australia');
  console.log('First 10 seconds contain no US/America origin terms');
}
