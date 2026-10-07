import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const project = path.join(root, 'projects/hanh-trinh-cua-dad');
const audio = JSON.parse(fs.readFileSync(path.join(project, 'production/audio/voiceover-cues.json'), 'utf8'));
const scenePlan = JSON.parse(fs.readFileSync(path.join(project, 'production/remotion/scene-plan.json'), 'utf8'));

const fail = (msg) => {
  console.error('AUDIO CUE FAIL: ' + msg);
  process.exitCode = 1;
};

const fps = audio.fps;
if (fps !== 24) fail('audio fps must be 24, got ' + fps);
if (audio.sample_rate_hz !== 48000) fail('sample_rate_hz must be 48000');
if (!/wav/i.test(audio.internal_audio_format || '')) fail('internal format must be WAV');
if (audio.audio_policy?.global_audio_offset_frames !== 0) fail('global_audio_offset_frames must equal 0');
if (audio.audio_policy?.one_file_per_cue !== true) fail('one_file_per_cue must be true');

const cues = [...audio.cues].sort((a,b) => a.start_frame - b.start_frame || a.end_frame_exclusive - b.end_frame_exclusive);
if (cues.length !== 35) fail('expected 35 cues, got ' + cues.length);

const ids = new Set();
const sceneIds = new Set(scenePlan.scenes.map((s) => s.scene_id));
const representedScenes = new Set();
const maxWpm = audio.audio_policy?.max_estimated_wpm ?? 170;
const forbiddenRe = /(Mỹ|Hoa Kỳ|USA|America|American|United States)/iu;

let prevEnd = -1;
let maxObservedWpm = 0;
for (const cue of cues) {
  if (ids.has(cue.id)) fail('duplicate cue id ' + cue.id);
  ids.add(cue.id);
  if (!sceneIds.has(cue.scene_id)) fail(cue.id + ' references unknown scene ' + cue.scene_id);
  representedScenes.add(cue.scene_id);
  if (!Number.isInteger(cue.start_frame) || !Number.isInteger(cue.end_frame_exclusive)) fail(cue.id + ' frames must be integers');
  if (cue.start_frame < 0 || cue.end_frame_exclusive > scenePlan.duration_in_frames) fail(cue.id + ' outside master bounds');
  if (cue.end_frame_exclusive <= cue.start_frame) fail(cue.id + ' invalid frame window');
  if (cue.start_frame < prevEnd) fail(cue.id + ' overlaps previous narration cue');
  prevEnd = cue.end_frame_exclusive;
  if (!/\.wav$/i.test(cue.file || '')) fail(cue.id + ' must use .wav internal file');
  if (forbiddenRe.test(cue.text)) fail(cue.id + ' contains forbidden US/America term');

  const words = cue.text.trim().split(/\s+/).filter(Boolean).length;
  const seconds = (cue.end_frame_exclusive - cue.start_frame) / fps;
  const wpm = words / seconds * 60;
  maxObservedWpm = Math.max(maxObservedWpm, wpm);
  if (wpm > maxWpm + 0.001) fail(cue.id + ' estimated ' + wpm.toFixed(1) + ' WPM exceeds max ' + maxWpm);

  const scene = scenePlan.scenes.find((s) => s.scene_id === cue.scene_id);
  const cueIntersectsScene = cue.end_frame_exclusive > scene.from && cue.start_frame <= scene.end;
  if (!cueIntersectsScene) fail(cue.id + ' does not intersect its declared scene');
  const extendsPastScene = cue.end_frame_exclusive > scene.end + 1;
  if (extendsPastScene && cue.audio_bridge_into_next_scene !== true) {
    fail(cue.id + ' extends beyond scene without audio_bridge_into_next_scene=true');
  }
}

for (const s of scenePlan.scenes) {
  if (!representedScenes.has(s.scene_id)) fail('scene ' + s.scene_id + ' has no VO cue');
}

const exact = new Map(cues.map((c) => [c.id, c.text]));
if (exact.get('VO_C001') !== 'Đây là Dad Stevenson.') fail('VO_C001 opening line changed');
if (exact.get('VO_C002') !== 'Một người Úc.') fail('VO_C002 must be exactly "Một người Úc."');
if (exact.get('VO_C003') !== 'Sống và làm việc tại Adelaide.') fail('VO_C003 Adelaide line changed');

if (!process.exitCode) {
  console.log('AUDIO CUE PASS');
  console.log('cues: ' + cues.length);
  console.log('scenes represented: ' + representedScenes.size);
  console.log('max estimated cue rate: ' + maxObservedWpm.toFixed(1) + ' WPM');
  console.log('global audio offset: 0 frames');
}
