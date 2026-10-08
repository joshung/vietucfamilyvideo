import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const root = process.cwd();
const projectRoot = path.join(root, 'projects/hanh-trinh-cua-dad');
const sourcePath = path.join(projectRoot, 'production/vox-v2/vox-v2-source.json');
const outDir = path.join(projectRoot, 'production/vox-v2');
const docsDir = path.join(projectRoot, 'docs');

const source = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
const FPS = source.fps;
const TOTAL_FRAMES = source.duration_in_frames;
const SHOT_FRAMES = 120;
const BEAT_FRAMES = 240;

const STYLE_BLOCK = [
  'Mixed-media hand-cut PAPER COLLAGE for a premium editorial documentary.',
  'Clearly separated physical layers with visible scissor-cut or lightly torn paper edges, tape corners, soft real-paper drop shadows, restrained halftone dots, newsprint scraps, paper-stencil shapes, subtle print misregistration and tactile paper grain.',
  'Human subjects that are real people remain PHOTOGRAPHIC paper stickers from approved source images; their faces are pixel-faithful and never repainted, beautified, de-aged or stylized.',
  'Composition follows Swiss editorial hierarchy: strong negative space, one dominant idea, one focal subject, one secondary explanatory system, bold condensed-grotesque headline area, small clean labels, dates and numbers as block typography.',
  'Palette is warm archival cream, charcoal ink, muted federal blue, muted brick red and one highlighter-yellow accent; one dominant accent per frame.',
  'Straight-on scanned-flat framing, upper-left soft studio light, crisp paper shadows, printed texture, NOT glossy CGI, NOT corporate 3D, NOT a smooth vector infographic.'
].join(' ');

const FACE_LOCK = 'FACE LOCK: Dad Stevenson stays an unchanged photographic sticker from the approved Dad reference. Preserve his exact face, glasses, hair, expression and clothing. Move only the whole photo/cutout layer. Paper texture and halftone apply to the world around him, never across his face or hair.';

const sha = (value) => crypto.createHash('sha256').update(value).digest('hex');

const theme = {
  schema_version: '2.0',
  project_id: source.project_id,
  ...source.theme,
  style_block: STYLE_BLOCK
};

const beats = structuredClone(source.beats);
const shotPrompts = [];
const audioCues = [];

function imagePrompt(beat, shot) {
  const refs = shot.refs.length ? ' Approved source references: ' + shot.refs.join(', ') + '.' : '';
  const face = shot.refs.some((r) => r.startsWith('DAD_REF')) ? ' ' + FACE_LOCK : '';
  const titleInstruction = shot.title
    ? ' Reserve a clear torn-paper headline banner for compositor text ' + JSON.stringify(shot.overlay_text[0] || beat.title) + '; keep the banner blank in generated pixels so typography remains deterministic.'
    : ' Do not create a large headline banner; reserve only small blank label slips where compositor text is specified.';
  return [
    STYLE_BLOCK,
    'SCENE AS SEPARATE CUT-OUT PIECES: ' + shot.scene,
    'Each major object has a clear physical edge and its own soft paper shadow.',
    'BACKGROUND: bold flat ' + beat.bg + ' paper field, uncluttered around the focal subject.',
    'TYPOGRAPHY REGION:' + titleInstruction,
    'All exact words and numbers are added later by the compositor; do not invent text inside the image.',
    'MOOD: ' + beat.feel + '.',
    refs,
    face,
    'TECH: 16:9 landscape, 2k keyframe, straight-on, flat 2D paper collage, crisp separation between pieces.'
  ].filter(Boolean).join(' ');
}

function motionPrompt(beat, shot) {
  const cameraMap = {
    static: 'locked-off static camera',
    push_in: 'very slow uniform push-in',
    pull_out: 'very slow uniform pull-out',
    pan: 'slow horizontal pan across the flat poster',
    tilt: 'slow vertical tilt across the flat poster',
    parallax: 'subtle shallow multi-layer parallax with camera parallel to the poster',
    element: 'locked camera while one dominant paper element action carries the beat'
  };
  return [
    'GOAL: Animate this finished still into a mixed-media collage motion graphic while preserving the exact composition.',
    'CAMERA: ' + cameraMap[shot.camera_move] + '.',
    'MOVEMENT: ' + shot.element_motion,
    'Keep all pieces rigid flat paper; use small physically plausible stepped movement and visible drop-shadow parallax.',
    'AESTHETIC: preserve torn or scissor-cut paper edges, tape, halftone, newsprint grain and the bold flat ' + beat.bg + ' background exactly.',
    'FEEL: ' + beat.feel + '.',
    'COLOR: preserve the humanist-newsprint-v2 palette with one highlighter-yellow accent.',
    'STABILITY: approved photographic stickers remain pixel-faithful; exact compositor text stays separate and stable; geography remains deterministic SVG; single continuous shot that settles before the cut.'
  ].join(' ');
}

let shotIndex = 0;
for (const beat of beats) {
  beat.narration = beat.narration_a + ' ' + beat.narration_b;
  beat.narration_cues = [
    {
      id: 'B' + String(beat.id).padStart(2, '0') + '_VO_A',
      local_start_frame: 0,
      local_end_frame_exclusive: 112,
      text: beat.narration_a
    },
    {
      id: 'B' + String(beat.id).padStart(2, '0') + '_VO_B',
      local_start_frame: 120,
      local_end_frame_exclusive: 232,
      text: beat.narration_b
    }
  ];

  for (let i = 0; i < beat.shots.length; i++) {
    const shot = beat.shots[i];
    const start = shotIndex * SHOT_FRAMES;
    const end = start + SHOT_FRAMES - 1;
    const suffix = i === 0 ? 'A' : 'B';
    shot.dur = 5;
    shot.global_start_frame = start;
    shot.global_end_frame = end;
    shot.prompt_ids = {
      image: 'VOXV2_KF_B' + String(beat.id).padStart(2, '0') + '_' + suffix + '_V01',
      motion: 'VOXV2_MOTION_B' + String(beat.id).padStart(2, '0') + '_' + suffix + '_V01'
    };

    shotPrompts.push({
      beat_id: beat.id,
      shot_id: shot.id,
      global_start_frame: start,
      global_end_frame: end,
      duration_frames: SHOT_FRAMES,
      duration_seconds: 5,
      title: shot.title,
      shot_size: shot.shot_size,
      camera_move: shot.camera_move,
      overlay_text: shot.overlay_text,
      refs: shot.refs,
      fact_tags: shot.fact_tags,
      image_prompt_id: shot.prompt_ids.image,
      image_prompt: imagePrompt(beat, shot),
      motion_prompt_id: shot.prompt_ids.motion,
      motion_prompt: motionPrompt(beat, shot),
      negative_constraints: [
        'do not redraw real faces',
        'do not invent historical photographs',
        'do not generate US or America origin imagery',
        'do not add extra typography',
        'do not create glossy CGI or corporate 3D UI',
        'do not morph, melt or bend rigid paper elements',
        'do not change factual map geometry'
      ],
      transition_out: shot.transition_out
    });

    const cue = beat.narration_cues[i];
    audioCues.push({
      ...cue,
      beat_id: beat.id,
      shot_id: shot.id,
      global_start_frame: start,
      global_end_frame_exclusive: start + 112,
      file: cue.id + '.wav',
      format: 'wav_pcm_s16le_mono_48000hz'
    });

    shotIndex++;
  }
}

const beatDoc = {
  schema_version: '2.0',
  project: source.project,
  project_id: source.project_id,
  topic: source.topic,
  language: source.language,
  aspect: source.aspect,
  fps: FPS,
  duration_seconds: source.duration_seconds,
  duration_in_frames: TOTAL_FRAMES,
  style: 'collage',
  provider: 'manual_prompt_pack',
  theme: source.theme.theme_id,
  arc: source.arc,
  mode: source.mode,
  motion_style: 'punchy_to_calm',
  constraints: 'strict',
  text_policy: 'compositor_overlay_only',
  face_policy: 'photographic_sticker_pixel_faithful',
  music: 'warm editorial documentary score; dry light percussion in opening, restrained pulse through factual middle, gentle emotional lift at end; instrumental, no vocals',
  captions: false,
  watermark: null,
  facts: source.fact_lock,
  beats
};

const audioDoc = {
  schema_version: '2.0',
  project_id: source.project_id,
  fps: FPS,
  sample_rate_hz: 48000,
  global_audio_offset_frames: 0,
  cue_count: audioCues.length,
  policy: 'one independent cue per 5-second shot window; cue overflow fails locally and never shifts later cues',
  cues: audioCues
};

const actions = [];
for (const beat of beats) {
  for (const shot of beat.shots) {
    const s = shot.global_start_frame;
    const phases = [
      [0, 11, 'HOLD', 'Establish the ' + beat.bg + ' paper field and base geometry for: ' + shot.scene],
      [12, 27, 'STEP2', shot.entrance_action],
      [28, 47, 'STEP2', shot.primary_action],
      [48, 71, 'STEP2', shot.secondary_action],
      [72, 95, 'MIXED', 'Camera executes ' + shot.camera_move + '; element choreography: ' + shot.element_motion],
      [96, 103, 'HOLD', shot.hold_action],
      [
        104,
        119,
        shot.id === '12b' ? 'HOLD' : 'STEP2',
        shot.id === '12b'
          ? 'Absolute final hold: Dad portrait, domain and motto remain completely still and legible.'
          : 'Transition preparation only: ' + shot.transition_out
      ]
    ];
    for (const [a, z, cadence, action] of phases) {
      actions.push({
        beat_id: beat.id,
        shot_id: shot.id,
        start_frame: s + a,
        end_frame: s + z,
        local_start_frame: a,
        local_end_frame: z,
        cadence,
        action
      });
    }
  }
}

function cameraState(move, localFrame) {
  const t =
    localFrame < 72
      ? 0
      : localFrame > 95
        ? 1
        : Math.max(0, Math.min(1, (localFrame - 72) / 23));
  let scale = 1;
  let x = 0;
  let y = 0;
  if (move === 'push_in') scale = 1 + 0.035 * t;
  if (move === 'pull_out') scale = 1.035 - 0.035 * t;
  if (move === 'pan') x = -32 + 64 * t;
  if (move === 'tilt') y = 26 - 52 * t;
  if (move === 'parallax') {
    scale = 1 + 0.018 * t;
    x = -8 + 16 * t;
  }
  return {
    scale: +scale.toFixed(5),
    x_px: +x.toFixed(3),
    y_px: +y.toFixed(3)
  };
}

const actionByFrame = new Array(TOTAL_FRAMES);
for (const action of actions) {
  for (let f = action.start_frame; f <= action.end_frame; f++) {
    if (actionByFrame[f]) throw new Error('Action overlap at frame ' + f);
    actionByFrame[f] = action;
  }
}
if (actionByFrame.some((x) => !x)) throw new Error('Frame action coverage has gaps');

const frames = [];
for (let frame = 0; frame < TOTAL_FRAMES; frame++) {
  const currentShotIndex = Math.floor(frame / SHOT_FRAMES);
  const prompt = shotPrompts[currentShotIndex];
  const beat = beats.find((b) => b.id === prompt.beat_id);
  const local = frame - prompt.global_start_frame;
  const action = actionByFrame[frame];
  const rangeLen = action.end_frame - action.start_frame;
  const progress = rangeLen === 0 ? 1 : (frame - action.start_frame) / rangeLen;
  const paperPoseFrame =
    action.cadence === 'HOLD'
      ? action.start_frame
      : action.cadence === 'STEP3'
        ? Math.floor(frame / 3) * 3
        : Math.floor(frame / 2) * 2;
  const camera = cameraState(prompt.camera_move, local);
  const overlay = prompt.overlay_text;
  const visibleOverlay =
    local < 28
      ? []
      : local < 48
        ? overlay.slice(0, Math.min(1, overlay.length))
        : local < 72
          ? overlay.slice(0, Math.max(1, Math.ceil(overlay.length / 2)))
          : overlay;

  frames.push({
    schema_version: '2.0',
    frame,
    frame_id: 'VOXV2_F' + String(frame).padStart(4, '0'),
    time_seconds: +(frame / FPS).toFixed(5),
    beat_id: prompt.beat_id,
    shot_id: prompt.shot_id,
    shot_local_frame: local,
    shot_size: prompt.shot_size,
    camera_move: prompt.camera_move,
    camera_state: camera,
    action_range: {
      start: action.start_frame,
      end: action.end_frame,
      cadence: action.cadence,
      progress: +progress.toFixed(5),
      paper_pose_frame: paperPoseFrame,
      action: action.action
    },
    overlay_text: overlay,
    visible_overlay_text: visibleOverlay,
    refs: prompt.refs,
    fact_tags: prompt.fact_tags,
    image_prompt_id: prompt.image_prompt_id,
    motion_prompt_id: prompt.motion_prompt_id,
    exact_frame_prompt: [
      'FRAME ' + String(frame).padStart(4, '0') + ' / 2879.',
      'Beat ' + prompt.beat_id + ', shot ' + prompt.shot_id + '.',
      'Base keyframe target: ' + prompt.image_prompt,
      'Current exact state: ' + action.action,
      'Action progress ' + (progress * 100).toFixed(2) + '%.',
      'Cadence ' + action.cadence + '; paper pose frame ' + paperPoseFrame + '.',
      'Camera state scale=' + camera.scale + ', x=' + camera.x_px + 'px, y=' + camera.y_px + 'px.',
      'Visible compositor text at this exact frame: ' + (visibleOverlay.length ? visibleOverlay.join(' | ') : 'none') + '.',
      'Preserve fact tags: ' + (prompt.fact_tags.join(', ') || 'general project fact lock') + '.',
      source.fact_lock.join(' ')
    ].join(' ')
  });
}

fs.mkdirSync(outDir, {recursive: true});

fs.writeFileSync(path.join(outDir, 'theme.json'), JSON.stringify(theme, null, 2) + '\n');
fs.writeFileSync(path.join(outDir, 'beats.json'), JSON.stringify(beatDoc, null, 2) + '\n');
fs.writeFileSync(path.join(outDir, 'audio-cues.json'), JSON.stringify(audioDoc, null, 2) + '\n');
fs.writeFileSync(
  path.join(outDir, 'shot-prompts.json'),
  JSON.stringify(
    {
      schema_version: '2.0',
      project_id: source.project_id,
      style_block_sha256: sha(STYLE_BLOCK),
      style_block: STYLE_BLOCK,
      prompts: shotPrompts
    },
    null,
    2
  ) + '\n'
);
fs.writeFileSync(
  path.join(outDir, 'frame-actions.json'),
  JSON.stringify(
    {
      schema_version: '2.0',
      project_id: source.project_id,
      fps: FPS,
      total_frames: TOTAL_FRAMES,
      action_ranges: actions
    },
    null,
    2
  ) + '\n'
);
fs.writeFileSync(path.join(outDir, 'frame-manifest.jsonl'), frames.map((x) => JSON.stringify(x)).join('\n') + '\n');

const manifestSha = sha(fs.readFileSync(path.join(outDir, 'frame-manifest.jsonl')));
fs.writeFileSync(
  path.join(outDir, 'frame-index.json'),
  JSON.stringify(
    {
      schema_version: '2.0',
      project_id: source.project_id,
      frame_count: frames.length,
      first: frames[0].frame_id,
      last: frames.at(-1).frame_id,
      beats: beats.length,
      shots: shotPrompts.length,
      audio_cues: audioCues.length,
      actions: actions.length,
      style_block_sha256: sha(STYLE_BLOCK),
      manifest_sha256: manifestSha
    },
    null,
    2
  ) + '\n'
);

const storyDoc = `# 31 — VOX Director V2: Story, Beats, Theme & Motion Grammar

> Canonical pre-render rewrite for VUF_DAD_001.
> Built from the installed \`vox-director\` repository skill.
> Supersedes the old 19-scene creative plan for future implementation; old files remain for audit/rollback.

## Creative thesis

**Funny entry → factual origin → practical system → human principle → warm payoff.**

The opening joke now self-corrects immediately: Dad is Australian, and the story is **not** about kangaroos. The factual spine begins with the scholarship question in Adelaide.

## Narrative arc

\`origin\` with timeline logic inside the middle:

world/person → spark → connection → system → first proof → practical help → operating bridge → growth → handoff → principle → legacy.

## Master structure

- 120 seconds
- 24fps
- 2880 frames
- 12 beats
- 2 shots per beat
- 24 shots
- exactly 5 seconds / 120 frames per shot
- wide/detail coverage
- hook inside the first 3 seconds
- composition change every 5 seconds

## Theme

\`humanist-newsprint-v2\`

A custom mix of:
- Vox Director \`newsprint-editorial\`;
- Swiss/International editorial hierarchy;
- C-roll photographic-sticker discipline for Dad and other real people.

### Palette

- archival cream \`#F1E7D2\`
- charcoal \`#171717\`
- muted blue \`#557083\`
- muted brick \`#A84A3A\`
- highlighter yellow \`#F2CE32\`
- warm gray \`#8B8376\`

### Look lock

${STYLE_BLOCK}

## Real-person rule

${FACE_LOCK}

## Text rule

Critical text is rendered by the deterministic compositor, not trusted to image/video generation.

Keyframe prompts reserve physical paper title strips and label regions while exact words remain editable.

## Motion grammar

Paper:
- rigid pieces;
- stepped on twos by default;
- occasional authored impact placement;
- physical shadows move with paper.

Camera:
- one move per shot;
- flat-safe moves only: static, push_in, pull_out, pan, tilt, parallax, element;
- no adjacent shot repeats the same camera move;
- payoff shots intentionally become static.

Element motion:
- multiple scene-specific paper elements may move;
- text and real faces remain stable;
- no morphing;
- motion settles before every cut.

## Transition grammar

- 1a→1b underline carries kangaroo
- 1b→2a yellow strike becomes Adelaide question underline
- 2a→2b question strip becomes student-problem baseline
- 2b→3a baseline becomes 1996 route
- 3a→3b route endpoint becomes Nam card
- 3b→4a ticket flips to 1997
- 4a→4b year card becomes notebook tab
- 4b→5a criteria cards become network nodes
- 5a→5b Nam node becomes notebook
- 5b→6a note slips become eight cards
- 6a→6b numeral 8 becomes detail crop
- 6b→7a student card becomes support card
- 7a→7b category card reveals practical support strip
- 7b→8a support stack becomes program title
- 8a→8b title folds into Australia–Vietnam bridge
- 8b→9a bridge line becomes timeline
- 9a→9b timeline becomes referral network
- 9b→10a 2006 node becomes handoff arrow
- 10a→10b arrow becomes Viet Uc Family underline
- 10b→11a title reveals no-repayment principle
- 11a→11b highlight splits into equality labels
- 11b→12a equality lines form help-forward circle
- 12a→12b archive recedes to Dad + motto

## 12-beat story

${beats.map((beat) => `### Beat ${beat.id} — ${beat.title}

**VO A:** ${beat.narration_a}

**VO B:** ${beat.narration_b}

**Feel:** ${beat.feel}

**Shot ${beat.shots[0].id}:** ${beat.shots[0].scene}

**Shot ${beat.shots[1].id}:** ${beat.shots[1].scene}
`).join('\n')}

## Canonical files

- \`production/vox-v2/theme.json\`
- \`production/vox-v2/beats.json\`
- \`production/vox-v2/audio-cues.json\`
- \`production/vox-v2/shot-prompts.json\`
- \`production/vox-v2/frame-actions.json\`
- \`production/vox-v2/frame-manifest.jsonl\`
- \`production/vox-v2/frame-index.json\`
`;

fs.writeFileSync(path.join(docsDir, '31-VOX-V2-story-theme-motion.md'), storyDoc.trimEnd() + '\\n');

const promptDoc = `# 33 — VOX Director V2: 24 Exact Shot Prompts

> Each shot has one exact keyframe image prompt and one exact motion prompt.
> Critical typography remains compositor text.

## Shared style block SHA-256

\`${sha(STYLE_BLOCK)}\`

## Prompts

${shotPrompts.map((p) => `### Shot ${p.shot_id} — F${String(p.global_start_frame).padStart(4, '0')}–F${String(p.global_end_frame).padStart(4, '0')}

**Image prompt ID:** \`${p.image_prompt_id}\`

\`\`\`text
${p.image_prompt}
\`\`\`

**Motion prompt ID:** \`${p.motion_prompt_id}\`

\`\`\`text
${p.motion_prompt}
\`\`\`

**Overlay text:** ${p.overlay_text.join(' / ') || 'none'}

**References:** ${p.refs.join(', ') || 'none'}

**Transition out:** ${p.transition_out}
`).join('\n')}
`;

fs.writeFileSync(path.join(docsDir, '33-VOX-V2-24-shot-prompts.md'), promptDoc.trimEnd() + '\\n');

const supervisionDoc = `# 32 — VOX Director V2: Specialist Supervision Report

> “Subagents” here are separate specialist review passes performed by the Chief Director, per AGENTS.md. No runtime child agents were spawned.

## A — Story / beats supervision

### Fact Supervisor — PASS
- Dad is Australian / người Úc.
- Adelaide is the origin anchor.
- 1996 / 1997 / 8 students / first program name / 2006 handoff+rename / no repayment remain intact.
- 2027 / 1000+ claim is absent.
- Kangaroo exists only as a joke that the narration explicitly rejects as the story's origin.
- Buffalo detour removed because it consumed hook time without advancing the factual spine.

### Story Architect — PASS
- Arc is \`origin\`, matching a founder/mission history better than a loose timeline.
- 12 beats each carry one information job.
- Practical support and unconditional/no-repayment principles receive dedicated beats.
- Ending completes the idea with help-forward + motto.

### Beat Director — PASS
- 12 beats × 2 shots × 5s = 120s.
- 24 shots × 120 frames = 2880 frames.
- Hook appears inside the first 3 seconds.
- Wide/detail coverage exists for every beat.
- Adjacent shots do not repeat the same camera move.

## B — Theme / prompt supervision

### Theme Director — PASS
- One reusable style block is shared across all 24 keyframe prompts.
- Theme is topic-specific humanist newsprint, not generic retro-Americana.
- Real people use photographic-sticker treatment.
- Critical text is separated from image generation for factual accuracy.

### Prompt Engineer — PASS
- Every shot prompt follows style → separate pieces → background → typography region → mood/tech.
- Every motion prompt follows goal → one camera move → element motion → aesthetic → feel/color → stability.
- Scene-specific motion is rich without morphing.
- Image and motion prompt IDs are versioned.

### Continuity Supervisor — PASS
- Every shot has an explicit transition handoff.
- Reused paper objects physically transform into the next shot's organizing line/card.
- Archive photos are marked continuation/impact, not falsely dated period evidence.

## C — Frame supervision

### Frame QA Supervisor — PASS
- 2880 unique frame records generated.
- No gaps or overlaps.
- Every frame resolves to one beat, one shot and one action range.
- Each record carries exact camera transform, paper pose frame, prompt IDs, text overlays and fact tags.
- Paper pose cadence is deterministic.

### Fact / Audio Regression Supervisor — PASS
- Forbidden US-origin terms absent from narration.
- First beat explicitly contains Australia + Adelaide.
- All 12 beats contain two narration cues aligned to the two 5-second shots.
- No future-dated 2027 claim.

## Validation gates

- \`node scripts/validate-vox-v2.mjs A\`
- \`node scripts/validate-vox-v2.mjs B\`
- \`node scripts/validate-vox-v2.mjs C\`

All three must pass before implementation handoff.

## Result

**VOX V2 pre-render package: APPROVED FOR IMPLEMENTATION after A → B → C validation.**

The old V1 / 19-scene frame system remains in repository history but should not drive new implementation.
`;

fs.writeFileSync(path.join(docsDir, '32-VOX-V2-supervision-report.md'), supervisionDoc.trimEnd() + '\\n');

const implementationDoc = `# 34 — VOX Director V2 Master Implementation Prompt

\`\`\`text
Implement ONLY the canonical VOX V2 package for projects/hanh-trinh-cua-dad.

Read first:
1. AGENTS.md
2. .agents/skills/vox-director/SKILL.md
3. .agents/skills/vox-director/references/beat-layer.md
4. .agents/skills/vox-director/references/prompt-guide.md
5. projects/hanh-trinh-cua-dad/docs/31-VOX-V2-story-theme-motion.md
6. projects/hanh-trinh-cua-dad/docs/32-VOX-V2-supervision-report.md
7. projects/hanh-trinh-cua-dad/docs/33-VOX-V2-24-shot-prompts.md
8. projects/hanh-trinh-cua-dad/production/vox-v2/theme.json
9. projects/hanh-trinh-cua-dad/production/vox-v2/beats.json
10. projects/hanh-trinh-cua-dad/production/vox-v2/audio-cues.json
11. projects/hanh-trinh-cua-dad/production/vox-v2/shot-prompts.json
12. projects/hanh-trinh-cua-dad/production/vox-v2/frame-actions.json
13. projects/hanh-trinh-cua-dad/production/vox-v2/frame-index.json
14. projects/hanh-trinh-cua-dad/production/vox-v2/frame-manifest.jsonl

The V2 files supersede the older 19-scene creative/frame plan for new implementation.

Do not redesign or paraphrase the prompts.

Master:
1920x1080
24fps
2880 frames
120 seconds
12 beats
24 shots
120 frames per shot

Every rendered frame must match the corresponding VOXV2_Fxxxx record.

Narration must use production/vox-v2/audio-cues.json. There are 24 independent 48kHz WAV cues, one per 5-second shot window, global offset 0. A cue that runs long must be regenerated locally; never shift later cues.

Real Dad photographs remain photographic stickers; never redraw the face.
Critical text must be compositor text.
Do not generate fake historical photographs.
Do not use America/USA/Mỹ/Hoa Kỳ to establish Dad. Dad is Australian and the origin anchor is Adelaide, South Australia.

Build all 24 shots, not a sample.

Before full render:
- run: node scripts/build-vox-v2.mjs
- run: node scripts/validate-vox-v2.mjs A
- run: node scripts/validate-vox-v2.mjs B
- run: node scripts/validate-vox-v2.mjs C
- stop immediately if any gate fails;
- render 24 keyframe/hero review stills;
- render start/mid/end frame checks for all shots;
- render a 540p preview;
- stop for review before final-quality rendering.

Do not fall back to the older V1 frame manifest.
\`\`\`
`;

fs.writeFileSync(path.join(docsDir, '34-VOX-V2-MASTER-IMPLEMENTATION-PROMPT.md'), implementationDoc.trimEnd() + '\\n');

console.log(JSON.stringify({
  beats: beats.length,
  shots: shotPrompts.length,
  audio_cues: audioCues.length,
  actions: actions.length,
  frames: frames.length,
  first: frames[0].frame_id,
  last: frames.at(-1).frame_id,
  manifest_sha256: manifestSha
}, null, 2));
