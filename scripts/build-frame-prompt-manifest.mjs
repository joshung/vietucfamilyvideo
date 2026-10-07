import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const docPath = path.join(root, 'projects/hanh-trinh-cua-dad/docs/22-frame-by-frame-paper-stop-motion.md');
const actionsPath = path.join(root, 'projects/hanh-trinh-cua-dad/production/remotion/frame-actions.json');
const scenePlanPath = path.join(root, 'projects/hanh-trinh-cua-dad/production/remotion/scene-plan.json');
const heroPath = path.join(root, 'projects/hanh-trinh-cua-dad/production/remotion/hero-frame-prompts.json');
const outPath = path.join(root, 'projects/hanh-trinh-cua-dad/production/remotion/frame-prompt-manifest.jsonl');
const indexPath = path.join(root, 'projects/hanh-trinh-cua-dad/production/remotion/frame-prompt-index.json');

const scenePlan = JSON.parse(fs.readFileSync(scenePlanPath, 'utf8'));
const heroData = JSON.parse(fs.readFileSync(heroPath, 'utf8'));
const heroByScene = new Map(heroData.prompts.map((p) => [p.scene_id, p]));
const planByScene = new Map(scenePlan.scenes.map((s) => [s.scene_id, s]));
const sceneTitleById = new Map([
  ['S01_SH01','DAD HERO'],['S01_SH02','KANGAROO POSTER'],['S01_SH03','BUFFALO FINAL BOSS → TRUTH PIVOT'],
  ['S02_SH01','ADELAIDE'],['S02_SH02','THE SCHOLARSHIP QUESTION'],['S02_SH03','1996 ROUTE'],['S02_SH04','MEET ĐOÀN MINH NAM'],
  ['S03_SH01','1997 DAD RETURNS'],['S03_SH02','SUNWAY: IDEA → SYSTEM'],['S03_SH03','THE CONNECTION NETWORK'],['S03_SH04','THE FIRST 8'],
  ['S04_SH01','STEVENSON SCHOLARSHIP PROGRAMME'],['S04_SH02','HOW THE PROGRAMME WORKED'],['S04_SH03','GROWTH 1997 → 2006'],['S04_SH04','COMMUNITY MAP'],
  ['S05_SH01','2006 HANDOFF'],['S05_SH02','VIET UC FAMILY REVEAL'],['S05_SH03','WHAT DAD BUILT'],['S05_SH04','DREAM. BELIEVE. DO.']
]);

let actions;
if (fs.existsSync(actionsPath)) {
  const actionData = JSON.parse(fs.readFileSync(actionsPath, 'utf8'));
  actions = actionData.actions.map(([scene_id,start,end,action]) => ({scene_id,start,end,action,scene_title:sceneTitleById.get(scene_id) || scene_id}));
} else {
  const md = fs.readFileSync(docPath, 'utf8');
  const strip = (s) => s.replace(/`/g, '').replace(/\*\*/g, '').replace(/<br\s*\/?\s*>/gi, ' ').replace(/\s+/g, ' ').trim();
  actions = [];
  let currentSceneId = null;
  let currentSceneTitle = null;
  for (const line of md.split(/\r?\n/)) {
    const h = line.match(/^# SCENE\s+\d+\s+—\s+(S\d+_SH\d+)\s+—\s+(.+)$/);
    if (h) { currentSceneId = h[1]; currentSceneTitle = h[2].trim(); continue; }
    const m = line.match(/^\|\s*F(\d{4})[–-]F(\d{4})\s*\|\s*(.*?)\s*\|\s*$/);
    if (!m || !currentSceneId) continue;
    actions.push({scene_id:currentSceneId,scene_title:currentSceneTitle,start:Number(m[1]),end:Number(m[2]),action:strip(m[3])});
  }
}

const actionByFrame = new Array(scenePlan.duration_in_frames).fill(null);
for (const a of actions) {
  const plan = planByScene.get(a.scene_id);
  if (!plan) throw new Error(`Action references unknown scene ${a.scene_id}`);
  if (a.start < plan.from || a.end > plan.end) {
    throw new Error(`Action ${a.scene_id} F${a.start}-F${a.end} escapes scene F${plan.from}-F${plan.end}`);
  }
  for (let f = a.start; f <= a.end; f++) {
    if (actionByFrame[f]) throw new Error(`Overlapping action at frame ${f}`);
    actionByFrame[f] = a;
  }
}

for (const scene of scenePlan.scenes) {
  for (let f = scene.from; f <= scene.end; f++) {
    if (!actionByFrame[f]) throw new Error(`Uncovered frame ${f} in ${scene.scene_id}`);
    if (actionByFrame[f].scene_id !== scene.scene_id) throw new Error(`Scene mismatch at frame ${f}`);
  }
}

const cadenceFor = (action) => {
  const s = action.toUpperCase();
  const has2 = s.includes('STEP2');
  const has3 = s.includes('STEP3');
  const smooth = s.includes('SMOOTH');
  if (has3 && smooth) return {name: 'MIXED_STEP3_SMOOTH', step: 3};
  if (has2 && smooth) return {name: 'MIXED_STEP2_SMOOTH', step: 2};
  if (has3) return {name: 'STEP3', step: 3};
  if (has2) return {name: 'STEP2', step: 2};
  if (smooth) return {name: 'SMOOTH', step: 1};
  if (/HOLD|ONLY|ALREADY|REMAINS|VISIBLE|FREEZ|STILL/.test(s)) return {name: 'HOLD', step: 1};
  return {name: 'STEP2_DEFAULT', step: 2};
};

const tc = (frame, fps) => {
  const totalSeconds = Math.floor(frame / fps);
  const ff = frame % fps;
  const hh = Math.floor(totalSeconds / 3600);
  const mm = Math.floor((totalSeconds % 3600) / 60);
  const ss = totalSeconds % 60;
  return [hh, mm, ss, ff].map((n) => String(n).padStart(2, '0')).join(':');
};

const pad4 = (n) => String(n).padStart(4, '0');
const clamp01 = (x) => Math.max(0, Math.min(1, x));

const invariants = [
  'handcrafted premium editorial paper-cut documentary',
  'soft upper-left tabletop light; paper shadows fall down-right',
  'yellow is semantic highlight, not decoration everywhere',
  'all factual text remains editable Remotion text',
  'do not regenerate or deform real faces',
  'do not invent historical photographs',
  'paper motion follows authored stepped cadence; camera may be smooth only when documented',
  'no watermark, no logo fabrication, no AI-generated typography'
];

const lines = [];
for (let frame = 0; frame < scenePlan.duration_in_frames; frame++) {
  const scene = scenePlan.scenes.find((s) => frame >= s.from && frame <= s.end);
  if (!scene) throw new Error(`No scene for frame ${frame}`);
  const a = actionByFrame[frame];
  const hero = heroByScene.get(scene.scene_id);
  if (!hero) throw new Error(`No hero prompt for ${scene.scene_id}`);
  const cadence = cadenceFor(a.action);
  const denom = Math.max(1, a.end - a.start);
  const progress = clamp01((frame - a.start) / denom);
  const poseFrame = cadence.step > 1 ? a.start + Math.floor((frame - a.start) / cadence.step) * cadence.step : frame;
  const poseProgress = clamp01((poseFrame - a.start) / denom);
  const localFrame = frame - scene.from;
  const refs = [...new Set(hero.refs || [])];
  const prompt = [
    `FRAME F${pad4(frame)} (${tc(frame, scenePlan.fps)}) of DadJourneyMaster.`,
    `Scene ${scene.scene_id}: ${a.scene_title}. Component ${scene.component}.`,
    `Hero composition target: ${hero.prompt}`,
    `Current documented state for F${pad4(a.start)}–F${pad4(a.end)}: ${a.action}`,
    `This exact frame is ${(progress * 100).toFixed(2)}% through that action range; cadence=${cadence.name}; paper pose frame=F${pad4(poseFrame)}; stepped pose progress=${(poseProgress * 100).toFixed(2)}%.`,
    `Reference assets: ${refs.length ? refs.join(', ') : 'none beyond deterministic SVG/text/paper assets'}.`,
    `Preserve these invariants: ${invariants.join('; ')}.`
  ].join(' ');

  lines.push(JSON.stringify({
    schema_version: '1.0',
    project_id: 'VUF_DAD_001',
    composition_id: scenePlan.composition_id,
    frame,
    frame_label: `F${pad4(frame)}`,
    timecode_24fps: tc(frame, scenePlan.fps),
    scene_id: scene.scene_id,
    scene_title: a.scene_title,
    component: scene.component,
    local_frame: localFrame,
    scene_from: scene.from,
    scene_end: scene.end,
    action_from: a.start,
    action_end: a.end,
    action: a.action,
    range_progress: Number(progress.toFixed(6)),
    cadence: cadence.name,
    pose_frame: poseFrame,
    pose_progress: Number(poseProgress.toFixed(6)),
    hero_frame: hero.hero_frame,
    generation_policy: hero.policy,
    reference_assets: refs,
    prompt_id: `FRAME_F${pad4(frame)}_V01`,
    prompt,
    invariants
  }));
}

fs.mkdirSync(path.dirname(outPath), {recursive: true});
fs.writeFileSync(outPath, `${lines.join('\n')}\n`);
const stat = fs.statSync(outPath);
const index = {
  schema_version: '1.0',
  project_id: 'VUF_DAD_001',
  composition_id: scenePlan.composition_id,
  fps: scenePlan.fps,
  width: scenePlan.width,
  height: scenePlan.height,
  frame_count: lines.length,
  first_frame: 0,
  last_frame: lines.length - 1,
  jsonl_path: 'production/remotion/frame-prompt-manifest.jsonl',
  bytes: stat.size,
  generator: 'scripts/build-frame-prompt-manifest.mjs'
};
fs.writeFileSync(indexPath, JSON.stringify(index, null, 2) + '\n');
console.log(`Wrote ${lines.length} frame prompts to ${outPath}`);
console.log(`Wrote index to ${indexPath}`);
