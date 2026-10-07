import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const root=process.cwd();
const dir=path.join(root,'projects/hanh-trinh-cua-dad/production/vox-v2');
const theme=JSON.parse(fs.readFileSync(path.join(dir,'theme.json'),'utf8'));
const beatsDoc=JSON.parse(fs.readFileSync(path.join(dir,'beats.json'),'utf8'));
const audioDoc=JSON.parse(fs.readFileSync(path.join(dir,'audio-cues.json'),'utf8'));
const promptsDoc=JSON.parse(fs.readFileSync(path.join(dir,'shot-prompts.json'),'utf8'));
const actionsDoc=JSON.parse(fs.readFileSync(path.join(dir,'frame-actions.json'),'utf8'));
const index=JSON.parse(fs.readFileSync(path.join(dir,'frame-index.json'),'utf8'));
const frameLines=fs.readFileSync(path.join(dir,'frame-manifest.jsonl'),'utf8').trim().split(/\r?\n/);
const frames=frameLines.map(JSON.parse);
const phase=(process.argv[2]||'all').toUpperCase();

let errors=[];
const ok=(cond,msg)=>{if(!cond) errors.push(msg)};
const words=s=>s.trim().split(/\s+/).filter(Boolean).length;
const sha=x=>crypto.createHash('sha256').update(x).digest('hex');

function validateA(){
  const beats=beatsDoc.beats;
  ok(beatsDoc.arc==='origin','A: arc must be origin');
  ok(beats.length===12,'A: expected 12 beats');
  ok(beatsDoc.duration_seconds===120,'A: duration must be 120s');
  ok(beatsDoc.duration_in_frames===2880,'A: duration must be 2880 frames');
  let shotCount=0;
  let prevCamera=null;
  let totalDur=0;
  let totalWords=0;
  for(const beat of beats){
    ok(beat.shots.length===2,`A: beat ${beat.id} must have exactly 2 shots`);
    ok(beat.narration_cues.length===2,`A: beat ${beat.id} must have exactly 2 narration cues`);
    for(const cue of beat.narration_cues){
      const seconds=(cue.local_end_frame_exclusive-cue.local_start_frame)/24;
      const wpm=words(cue.text)/seconds*60;
      totalWords+=words(cue.text);
      ok(wpm<=180.0001,`A: ${cue.id} too dense at ${wpm.toFixed(1)} WPM`);
    }
    for(const shot of beat.shots){
      shotCount++; totalDur+=shot.dur;
      ok(shot.dur===5,`A: shot ${shot.id} must be 5s`);
      ok(['EST_WIDE','WIDE','MEDIUM','CLOSE','DETAIL'].includes(shot.shot_size),`A: bad shot size ${shot.id}`);
      ok(['static','push_in','pull_out','pan','tilt','parallax','element'].includes(shot.camera_move),`A: unsafe camera move ${shot.id}`);
      if(prevCamera!==null) ok(prevCamera!==shot.camera_move,`A: adjacent camera move repeated at ${shot.id}: ${shot.camera_move}`);
      prevCamera=shot.camera_move;
    }
  }
  ok(shotCount===24,'A: expected 24 shots');
  ok(totalDur===120,'A: total shot duration must be 120s');
  ok(totalWords/120*60<=155,`A: average narration too dense at ${(totalWords/120*60).toFixed(1)} WPM`);
  ok(audioDoc.cue_count===24,'A: expected 24 global audio cues');
  ok(audioDoc.global_audio_offset_frames===0,'A: global audio offset must be 0');
  ok(audioDoc.sample_rate_hz===48000,'A: audio sample rate must be 48kHz');
  ok(audioDoc.cues.length===24,'A: audio cue array must contain 24 entries');
  for(let i=0;i<audioDoc.cues.length;i++){
    const cue=audioDoc.cues[i];
    ok(cue.global_start_frame===i*120,`A: audio cue ${cue.id} must start at shot boundary ${i*120}`);
    ok(cue.global_end_frame_exclusive<=i*120+120,`A: audio cue ${cue.id} overflows its 5s shot window`);
    ok(/\.wav$/i.test(cue.file),'A: audio cue must target WAV: '+cue.id);
  }

  const narration=beats.flatMap(b=>b.narration_cues.map(c=>c.text)).join(' ');
  for(const token of ['Adelaide','Sơ Nien','1996','Đoàn Minh Nam','1997','SunWay','tám sinh viên','Stevenson Scholarship Programme','1997 đến 2006','Nguyễn Hoàng Cung','Viet Uc Family','không phải trả nợ','Dream. Believe. Do.']){
    ok(narration.includes(token),`A: narration missing locked fact/token: ${token}`);
  }
  ok(!/(Mỹ|Hoa Kỳ|United States|\bUSA\b|\bAmerican\b)/iu.test(narration),'A: narration contains forbidden US-origin term');
  ok(!/2027|1000\+|trên 1000/iu.test(narration),'A: future-dated 2027/1000+ claim leaked into narration');
  ok(!/con trâu|buffalo/iu.test(narration),'A: buffalo detour should be removed from V2 narration');

  const first=beats[0];
  ok(first.shots[0].title===true,'A: first shot must carry hook title');
  ok(first.shots[0].overlay_text.some(x=>/MỘT NGƯỜI ÚC/u.test(x)),'A: first 3s hook must establish Dad as Australian');
  ok(first.shots[0].refs.includes('SVG_AUSTRALIA'),'A: opening must use accurate Australia geography');
  ok(first.shots[0].refs.includes('DAD_REF_01'),'A: opening must use real Dad reference');
}

function validateB(){
  ok(theme.theme_id==='humanist-newsprint-v2','B: unexpected theme id');
  ok(theme.text_policy.includes('compositor'),'B: text policy must be deterministic compositor');
  ok(theme.face_policy.includes('photographic'), 'B: real people must be photographic stickers');
  ok(promptsDoc.prompts.length===24,'B: expected 24 shot prompt pairs');
  ok(promptsDoc.style_block_sha256===sha(theme.style_block),'B: shared style block hash mismatch');
  let prevCamera=null;
  const ids=new Set();
  for(const p of promptsDoc.prompts){
    ok(p.image_prompt.startsWith(theme.style_block),'B: image prompt does not reuse style block verbatim for '+p.shot_id);
    for(const marker of ['SCENE AS SEPARATE CUT-OUT PIECES','BACKGROUND:','TYPOGRAPHY REGION:','MOOD:','TECH:']){
      ok(p.image_prompt.includes(marker),`B: image prompt ${p.shot_id} missing ${marker}`);
    }
    for(const marker of ['GOAL:','CAMERA:','MOVEMENT:','AESTHETIC:','FEEL:','COLOR:','STABILITY:']){
      ok(p.motion_prompt.includes(marker),`B: motion prompt ${p.shot_id} missing ${marker}`);
    }
    if(p.refs.some(r=>r.startsWith('DAD_REF'))){
      ok(p.image_prompt.includes('FACE LOCK:'),`B: Dad shot ${p.shot_id} missing face lock`);
      ok(p.image_prompt.includes('pixel-faithful'),`B: Dad shot ${p.shot_id} missing pixel-faithful identity lock`);
    }
    ok(!/glossy CGI/iu.test(p.image_prompt.slice(0,theme.style_block.length)) || theme.style_block.includes('NOT glossy CGI'),'B: style block anti-CGI phrase missing');
    ok(p.negative_constraints.length>=5,`B: insufficient negative constraints for ${p.shot_id}`);
    ok(!ids.has(p.image_prompt_id),'B: duplicate image prompt id '+p.image_prompt_id); ids.add(p.image_prompt_id);
    ok(!ids.has(p.motion_prompt_id),'B: duplicate motion prompt id '+p.motion_prompt_id); ids.add(p.motion_prompt_id);
    if(prevCamera!==null) ok(prevCamera!==p.camera_move,`B: adjacent prompt camera move repeated at ${p.shot_id}`);
    prevCamera=p.camera_move;
    ok(p.transition_out && p.transition_out.length>20,`B: transition out under-specified for ${p.shot_id}`);
  }
}

function validateC(){
  ok(actionsDoc.action_ranges.length===168,'C: expected 168 action ranges (24×7)');
  ok(frames.length===2880,'C: expected 2880 frame records');
  ok(index.frame_count===2880,'C: index frame_count mismatch');
  ok(index.first==='VOXV2_F0000','C: first frame id mismatch');
  ok(index.last==='VOXV2_F2879','C: last frame id mismatch');
  ok(index.beats===12 && index.shots===24 && index.actions===168,'C: index counts mismatch');
  const manifestSha=sha(fs.readFileSync(path.join(dir,'frame-manifest.jsonl')));
  ok(index.manifest_sha256===manifestSha,'C: manifest SHA mismatch');

  const seen=new Set();
  for(let i=0;i<frames.length;i++){
    const f=frames[i];
    ok(f.frame===i,`C: frame sequence mismatch at line ${i}`);
    ok(f.frame_id===`VOXV2_F${String(i).padStart(4,'0')}`,`C: bad frame id at ${i}`);
    ok(!seen.has(f.frame_id),'C: duplicate frame id '+f.frame_id); seen.add(f.frame_id);
    ok(f.shot_local_frame>=0 && f.shot_local_frame<120,`C: local frame outside shot at ${i}`);
    ok(['HOLD','STEP2','STEP3','MIXED'].includes(f.action_range.cadence),`C: bad cadence at ${i}`);
    ok(Number.isFinite(f.camera_state.scale)&&Number.isFinite(f.camera_state.x_px)&&Number.isFinite(f.camera_state.y_px),`C: bad camera state at ${i}`);
    ok(f.image_prompt_id && f.motion_prompt_id,`C: prompt ids missing at ${i}`);
    ok(f.exact_frame_prompt.includes('FRAME '+String(i).padStart(4,'0')),`C: exact frame prompt missing frame label at ${i}`);
    if(f.action_range.cadence==='STEP2') ok(f.action_range.paper_pose_frame%2===0,`C: STEP2 paper pose not even at ${i}`);
  }

  for(let shotIndex=0;shotIndex<24;shotIndex++){
    const chunk=frames.slice(shotIndex*120,(shotIndex+1)*120);
    ok(chunk.length===120,`C: shot ${shotIndex+1} missing frames`);
    const id=chunk[0]?.shot_id;
    ok(chunk.every(x=>x.shot_id===id),`C: shot id changes inside 120-frame chunk ${id}`);
    const ranges=actionsDoc.action_ranges.filter(a=>a.shot_id===id);
    ok(ranges.length===7,`C: shot ${id} must have 7 frame action ranges`);
    ok(ranges[0].start_frame===shotIndex*120 && ranges.at(-1).end_frame===shotIndex*120+119,`C: action coverage wrong for shot ${id}`);
  }

  const opening=frames.slice(0,240);
  ok(opening.some(f=>f.refs.includes('SVG_AUSTRALIA')),'C: opening 10s missing Australia reference');
  ok(opening.some(f=>f.refs.includes('DAD_REF_01')),'C: opening 10s missing Dad reference');
  ok(opening.every(f=>!/(United States|\bUSA\b|Mỹ|Hoa Kỳ)/iu.test((f.visible_overlay_text||[]).join(' '))),'C: forbidden US origin text in opening visible overlays');
  ok(frames[0].visible_overlay_text.length===0,'C: frame F0000 must begin before typography appears');
  ok(frames[47].visible_overlay_text.includes('MỘT NGƯỜI ÚC.'),'C: opening hook must be visibly established by F0047');
  ok(frames.at(-1).visible_overlay_text.includes('DREAM. BELIEVE. DO.'),'C: final frame must visibly carry motto');
  ok(frames.at(-1).action_range.cadence==='HOLD','C: final frame must be an absolute HOLD');
}

if(phase==='A'||phase==='ALL') validateA();
if(phase==='B'||phase==='ALL') validateB();
if(phase==='C'||phase==='ALL') validateC();

if(errors.length){
  console.error('VOX V2 VALIDATION FAILED ('+phase+')');
  for(const e of errors) console.error('- '+e);
  process.exit(1);
}
console.log('VOX V2 '+phase+' PASS');
if(phase==='A'||phase==='ALL') console.log('A: story/facts/beats/narration/camera rhythm locked');
if(phase==='B'||phase==='ALL') console.log('B: theme + 24 image/motion prompt pairs locked');
if(phase==='C'||phase==='ALL') console.log('C: 2880 frames + 168 action ranges deterministic and complete');
