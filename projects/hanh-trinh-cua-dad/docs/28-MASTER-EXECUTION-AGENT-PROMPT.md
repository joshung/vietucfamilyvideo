# 28 — MASTER EXECUTION AGENT PROMPT — LEGACY V1

> **SUPERSEDED.** New implementation agents must use `docs/34-VOX-V2-MASTER-IMPLEMENTATION-PROMPT.md`. Do not execute this V1 prompt for a new render.


> This is the single master handoff prompt for implementing VUF_DAD_001.
> Give this file to the execution agent and tell it to execute the prompt completely.

## COPY-PASTE MASTER PROMPT

```text
You are the lead execution agent for the VietUcFamilyVideo repository.

Your job is to IMPLEMENT the complete pre-render production system for:

projects/hanh-trinh-cua-dad/

You are responsible for:
1. controlled generated visual assets;
2. deterministic Remotion implementation;
3. exact frame-by-frame compliance;
4. review renders and validation;
5. render-execution infrastructure where already specified.

You are NOT allowed to redesign the film.

Do not rewrite the story.
Do not rewrite narration.
Do not invent a new visual style.
Do not replace exact frame instructions with generic animation.
Do not turn factual history into fake AI archival footage.

======================================================================
A. SOURCE OF TRUTH — READ THIS ORDER FIRST
======================================================================

Read all of these before coding:

1. AGENTS.md
2. docs/editorial-remotion-style-system.md
3. docs/render-execution-pipeline.md
4. docs/ai-production-pipeline.md
5. docs/ai-video-short-clip-continuity.md

Project:

6. projects/hanh-trinh-cua-dad/README.md
7. projects/hanh-trinh-cua-dad/project.json
8. projects/hanh-trinh-cua-dad/docs/03-screenplay.md
9. projects/hanh-trinh-cua-dad/docs/04-directors-treatment.md
10. projects/hanh-trinh-cua-dad/docs/05-shot-list.md
11. projects/hanh-trinh-cua-dad/docs/06-shot-cards.md
12. projects/hanh-trinh-cua-dad/docs/07-continuity-bible.md
13. projects/hanh-trinh-cua-dad/docs/08-paper-edit.md
14. projects/hanh-trinh-cua-dad/docs/09-sound-plan.md
15. projects/hanh-trinh-cua-dad/docs/10-ai-generation-plan.md
16. projects/hanh-trinh-cua-dad/docs/11-qc-report.md
17. projects/hanh-trinh-cua-dad/docs/15-archive-shortlist-qc.md
18. projects/hanh-trinh-cua-dad/docs/16-storyboard-animatic-spec.md
19. projects/hanh-trinh-cua-dad/docs/17-voiceover-lock.md
20. projects/hanh-trinh-cua-dad/docs/18-model-routing.md
21. projects/hanh-trinh-cua-dad/docs/19-render-execution-pipeline.md
22. projects/hanh-trinh-cua-dad/docs/21-reference-style-breakdown.md
23. projects/hanh-trinh-cua-dad/docs/22-frame-by-frame-paper-stop-motion.md
24. projects/hanh-trinh-cua-dad/docs/24-image-generation-prompts.md
25. projects/hanh-trinh-cua-dad/docs/25-frame-prompt-contract.md
26. projects/hanh-trinh-cua-dad/docs/29-fact-lock-and-regression.md
27. projects/hanh-trinh-cua-dad/docs/30-audio-sync-cue-sheet.md

Machine-readable contracts:

28. projects/hanh-trinh-cua-dad/production/facts/fact-lock.json
29. projects/hanh-trinh-cua-dad/production/audio/voiceover-cues.json
30. projects/hanh-trinh-cua-dad/production/remotion/style-tokens.json
31. projects/hanh-trinh-cua-dad/production/remotion/scene-plan.json
32. projects/hanh-trinh-cua-dad/production/remotion/image-generation-manifest.json
33. projects/hanh-trinh-cua-dad/production/remotion/hero-frame-prompts.json
34. projects/hanh-trinh-cua-dad/production/remotion/frame-actions.json
35. projects/hanh-trinh-cua-dad/production/remotion/frame-prompt-index.json
36. projects/hanh-trinh-cua-dad/production/remotion/frame-prompt-manifest.jsonl
37. projects/hanh-trinh-cua-dad/production/render/render-plan.json
38. projects/hanh-trinh-cua-dad/production/production-manifest.json
39. .env.example

Mandatory validators:

40. scripts/build-frame-prompt-manifest.mjs
41. scripts/validate-frame-prompts.mjs
42. scripts/validate-audio-cues.mjs
43. scripts/validate-fact-lock.mjs

Helper prompts 20/23/26/27 are subordinate to this master prompt.
If they conflict, this file plus the machine-readable contracts above win.

======================================================================
B. PROJECT INTENT
======================================================================

This is a 120-second Vietnamese editorial mini-documentary about Dad Stevenson and the origin of Viet Uc Family.

Master visual language:

premium editorial documentary
+
physical paper cutout / paper stop-motion
+
maps / timelines / archival photographs
+
dry humor in the first 24 seconds
+
factual credibility for the remaining film

The intended result must NOT resemble:
- PowerPoint;
- Canva slideshow;
- generic motion-graphics template;
- unrelated AI B-roll;
- smooth floating web UI;
- a full film hallucinated by a video model.

The master compositor is REMOTION.

AI image/video tools provide optional source assets only.

======================================================================
B1. ZERO-TOLERANCE FACT REGRESSION GATE
======================================================================

Before rendering ANY preview:

run:

node scripts/build-frame-prompt-manifest.mjs
node scripts/validate-frame-prompts.mjs
node scripts/validate-audio-cues.mjs
node scripts/validate-fact-lock.mjs

All four must pass.

Critical opening fact:

Dad Stevenson is AUSTRALIAN — một người Úc.

Scholarship-origin context:

Adelaide, South Australia.

The first 10 seconds MUST NOT:
- call Dad American;
- say he comes from America, USA, United States, Mỹ or Hoa Kỳ;
- use a United States map, flag, Statue of Liberty, stars-and-stripes origin treatment or USA label;
- replace Australia geography with another country.

Required opening VO is sourced only from production/audio/voiceover-cues.json:

VO_C001 = "Đây là Dad Stevenson."
VO_C002 = "Một người Úc."
VO_C003 = "Sống và làm việc tại Adelaide."

If the implementation contradicts production/facts/fact-lock.json:

the render MUST fail.

Do not "fix it in edit later".
Fix the implementation before rendering.

======================================================================
C. MASTER VIDEO CONTRACT
======================================================================

Composition ID:

DadJourneyMaster

Master:

width: 1920
height: 1080
fps: 24
durationInFrames: 2880
duration: exactly 120 seconds
aspect ratio: 16:9

There are exactly 19 scenes.

Frame coverage:

F0000 through F2879

No gaps.
No unintended overlaps.

Use exact scene ranges from:

production/remotion/scene-plan.json

======================================================================
D. ABSOLUTE FRAME AUTHORITY
======================================================================

For every rendered frame Fxxxx:

the row in

production/remotion/frame-prompt-manifest.jsonl

with:

prompt_id = FRAME_Fxxxx_V01

is the exact visual-state contract.

Do NOT implement the scene based only on a scene name.

For each frame record obey:
- scene_id;
- local_frame;
- action range;
- action text;
- progress;
- cadence;
- pose_frame;
- hero target;
- reference assets;
- invariants.

If a rendered frame disagrees with its JSONL contract, the rendered frame is wrong.

Before working, run:

node scripts/build-frame-prompt-manifest.mjs
node scripts/validate-frame-prompts.mjs

Expected validation:

frames = 2880
hero_prompts = 19
image_asset_prompts = 7
action_ranges = 183
first = FRAME_F0000_V01
last = FRAME_F2879_V01

Do not proceed if validation fails.

======================================================================
E. PAPER STOP-MOTION MOTION LAW
======================================================================

Master remains 24fps.

Paper movement defaults to ON TWOS:

const onTwos = (frame: number) => Math.floor(frame / 2) * 2;

Heavy/comedic card placement may use ON THREES:

const onThrees = (frame: number) => Math.floor(frame / 3) * 3;

Interpret:

STEP2:
paper pose updates every 2 frames.

STEP3:
paper pose updates every 3 frames.

SMOOTH:
documented camera/crop transform updates every frame.

MIXED:
paper remains stepped while explicitly specified camera/crop motion is smooth.

Camera motion may be smooth.
Physical paper motion should visibly feel stepped.

Use deterministic authored jitter only.

Never use Math.random() at render time.
Never use wall-clock time for animation.

Dad and real archive receive strongly reduced jitter.

Do not animate Dad's face.

======================================================================
F. REMOTION IMPLEMENTATION
======================================================================

Use TypeScript strict mode and current stable mutually-compatible Remotion 4.x packages.

Create reusable primitives instead of hard-coding everything:

PaperTexture
PaperCard
PhotoPrint
PaperShadow
YellowHighlighter
EditorialHeadline
FactLabel
HandPlacedNote
PersonCutoutCard
ArchiveCard
YearCard
Timeline
MapBase
MapPin
MapRoute
NetworkNode
NetworkEdge
CounterCard
AnnotationCircle
DocumentHighlight
EndCard

Recommended structure:

src/
  Root.tsx
  compositions/
    DadJourneyMaster.tsx
  scenes/
    Scene01DadHero.tsx
    Scene02Kangaroo.tsx
    Scene03BuffaloPivot.tsx
    Scene04Adelaide.tsx
    Scene05ScholarshipQuestion.tsx
    Scene06Route1996.tsx
    Scene07MeetNam.tsx
    Scene08Year1997.tsx
    Scene09SunwayCriteria.tsx
    Scene10FirstStudentsNetwork.tsx
    Scene11FirstEight.tsx
    Scene12StevensonProgramme.tsx
    Scene13ProgrammeNetwork.tsx
    Scene14GrowthTimeline.tsx
    Scene15CommunityMap.tsx
    Scene16Handoff2006.tsx
    Scene17VietUcReveal.tsx
    Scene18ValuesImpact.tsx
    Scene19EndCard.tsx
  components/
  theme/
  data/
  utils/

Register:

DadJourneyMaster

Optionally register individual scene compositions for debugging.

======================================================================
G. ALL 19 SCENES MUST BE IMPLEMENTED
======================================================================

Do not stop after the first 3 scenes.

Implement:

01 S01_SH01 DadHeroIntro
02 S01_SH02 KangarooPosterScene
03 S01_SH03 BuffaloPivotScene
04 S02_SH01 AdelaideMapScene
05 S02_SH02 ScholarshipQuestionScene
06 S02_SH03 Route1996Scene
07 S02_SH04 MeetNamScene
08 S03_SH01 Year1997ReturnScene
09 S03_SH02 SunwayCriteriaScene
10 S03_SH03 FirstStudentsNetworkScene
11 S03_SH04 FirstEightScene
12 S04_SH01 StevensonProgrammeTitle
13 S04_SH02 ProgrammeNetworkScene
14 S04_SH03 GrowthTimelineScene
15 S04_SH04 CommunityMapScene
16 S05_SH01 Handoff2006Scene
17 S05_SH02 VietUcNameRevealScene
18 S05_SH03 ValuesImpactScene
19 S05_SH04 DadEndCard

For exact geometry, animation intervals and handoffs, obey doc 22 and frame-prompt-manifest.jsonl.

======================================================================
H. TRANSITION CHAIN
======================================================================

Do not invent random transitions.

Implement this physical/narrative chain:

01→02 serious composition → sports-poster slam

02→03 poster slides away → Australia/Vietnam map already underneath

03→04 buffalo/game paper world freezes and leaves → Adelaide factual map

04→05 Adelaide marker becomes yellow question underline

05→06 underline extends into timeline baseline

06→07 route endpoint opens/turns into portrait card

07→08 portrait card exits into year timeline

08→09 1997 marker transforms into notebook tab

09→10 criteria cards reduce into network nodes

10→11 student nodes collect into counted student cards

11→12 yellow highlight behind 8 expands into STEVENSON title highlight

12→13 title reduces into network header

13→14 network connector extends into timeline

14→15 timeline line becomes Vietnam map baseline/outline

15→16 map darkens and 2006 card rises

16→17 handoff arrow becomes Viet–Úc connector

17→18 connector opens archive/photo window

18→19 archive collage collapses to one Dad portrait

Most cuts should still feel editorial and fast.
No random dissolves.
No generic 3D transition presets.

======================================================================
I. IMAGE GENERATION — EXACT POLICY
======================================================================

Do NOT generate full factual scenes with an image model.

Only generate assets whose entries exist in:

production/remotion/image-generation-manifest.json

There are exactly 7 approved image-model prompt assets in V01.

Use:
- exact prompt verbatim;
- exact global negative prompt verbatim;
- requested size;
- requested alpha state.

Do not paraphrase prompts.

Do not add extra style terms.

Do not allow generated typography.

If an exact prompt needs modification:
- create V02;
- preserve V01;
- record reason;
- do not silently overwrite the original prompt.

Expected generated asset IDs include:

PAPER_CREAM_TEXTURE_V01
PAPER_DARK_TEXTURE_V01
KANGAROO_CUTOUT_V01
BUFFALO_CUTOUT_V01
VIETNAM_PAPER_LANDSCAPE_V01
SPORTS_TORN_PANEL_V01
GAME_PANEL_V01

For each generated asset persist:

prompt_id
asset_id
exact prompt
negative prompt
model/version
seed when available
size
alpha state
attempt number
output URI/path
SHA-256
QC result

Default:
2 candidates per generated asset.
Third only if both fail objective QC.

======================================================================
J. DAD IDENTITY
======================================================================

DAD_REF_02:
primary facial identity reference.

DAD_REF_01:
primary editorial upper-body/cutout reference.

Dad is a REAL source layer.

Never generate Dad from a text-only prompt.

Never:
- change glasses;
- change face geometry;
- de-age him synthetically;
- change skin tone;
- change recognizable expression;
- apply facial morphing;
- lip-sync unless separately approved;
- create fake historical younger-Dad footage.

Transform Dad only as a whole photo/cutout layer:
position, scale, small whole-card rotation, crop.

If an AI reference-edit changes identity:
reject it.

======================================================================
K. HISTORICAL / FACTUAL INTEGRITY
======================================================================

Do not generate fake historical photographs.

Do not invent faces for:
- Sơ Nien;
- Đoàn Minh Nam;
- Nguyễn Hoàng Cung.

If a portrait is not verified:
use a text/name card or neutral icon.

Do not display recent archive photography in a way that implies it was captured in 1996, 1997 or 2006.

Recent archive belongs to:
impact / continuation / community montage.

Year labels belong to:
timeline graphics.

Never use the future-dated 2027 / 1000+ statement as a current 2026 fact.

======================================================================
L. HERO FRAME GATE
======================================================================

Before animating a scene:

render its hero frame.

Hero targets live in:

production/remotion/hero-frame-prompts.json

There are exactly 19 hero prompts.

The hero frame must communicate the scene without motion.

Create:

review/hero-frames/

Export every hero frame.

A scene should not proceed to full motion until its hero composition is structurally correct.

Do not call an image model for COMPOSITOR_ONLY hero frames.

The hero prompt is a composition contract for Remotion.

======================================================================
M. TRAJECTORY REVIEW GATE
======================================================================

For every scene export:

start
25%
50%
75%
end

For important moving paper objects also create a contact sheet showing numbered positions.

Create:

review/trajectory/

The reviewer should be able to see:
1 → 2 → 3 → 4 → 5

without watching the video.

======================================================================
N. EXACT TYPOGRAPHY RULE
======================================================================

All factual text, years, labels and captions are Remotion text.

Never depend on AI-generated typography.

Vietnamese glyphs must render correctly.

Use no more than two functional font families:
- editorial serif;
- clean sans-serif.

Pin exact font source/version.

Do not copy Vox's exact proprietary type system.

Yellow highlight has semantic meaning only:
- active location;
- active year;
- active number;
- one important phrase;
- current connector.

Do not highlight everything.

======================================================================
O. MAPS
======================================================================

Factual maps must use deterministic SVG/geographic assets.

Do not use image-model-generated maps for geography.

Use SVG paths for:
- Australia;
- South Australia;
- Vietnam;
- northern Vietnam route context.

Routes are deterministic.

Markers and labels are editable.

======================================================================
P. ARCHIVE
======================================================================

Use selected archive metadata:

assets/catalog/selected_for_animatic.json

Use real image files when materialized.

Do not distort faces.

Archive photo treatment:
- paper/photo-print edge;
- subtle shadow;
- small crop drift allowed;
- no fake film damage that reduces readability.

Selected archive includes strong assets such as:
ARCH_0407
ARCH_0411
ARCH_0426
ARCH_0428
ARCH_0448
ARCH_0460
ARCH_0471
ARCH_0521
ARCH_0527
ARCH_0529

Respect identity-confirmation flags.

======================================================================
Q. AI VIDEO
======================================================================

AI video is OPTIONAL.

Only these are approved candidates:

S01_SH02 kangaroo
S01_SH03 buffalo

The full master must render successfully without AI video.

If approved AI clips exist:
- insert them as controlled masked media layers;
- preserve Remotion text and layout above them;
- use them only for animal/secondary motion;
- do not let provider-generated frames dictate final composition;
- preserve exact global scene timing.

If no AI clips exist:
animate layered still assets in Remotion.

Never send factual middle scenes to AI video.

======================================================================
R. AUDIO
======================================================================

Audio is frame-locked.

Source-of-truth:

projects/hanh-trinh-cua-dad/production/audio/voiceover-cues.json

Narration editorial reference:

projects/hanh-trinh-cua-dad/docs/17-voiceover-lock.md

Audio sync contract:

projects/hanh-trinh-cua-dad/docs/30-audio-sync-cue-sheet.md

MANDATORY RULE:

Do NOT synthesize one continuous 120-second TTS narration track.

There are exactly 35 independent narration cues.

For each cue:
1. synthesize that cue only;
2. acquire provider output;
3. decode to 48kHz PCM WAV;
4. trim only head/tail silence or encoder padding;
5. preserve internal intended pauses;
6. ffprobe exact duration;
7. place WAV at exact start_frame in Remotion;
8. verify it ends before end_frame_exclusive.

Internal narration format:
WAV PCM
48kHz
mono

Internal MP3 narration is forbidden.

global_audio_offset_frames MUST equal 0.

If one cue overflows:
- fail that cue;
- regenerate that cue or create an approved shorter version;
- do NOT shift later cues;
- do NOT introduce a global delay;
- do NOT time-drift the rest of the film.

The following opening cues are immutable unless the project owner explicitly changes the fact:

VO_C001:
"Đây là Dad Stevenson."

VO_C002:
"Một người Úc."

VO_C003:
"Sống và làm việc tại Adelaide."

VO_C004:
"Kangaroo. Người Úc khó tránh."

Support:
- narration;
- music;
- SFX.

Key sound beats:
- record scratch entering kangaroo;
- small boxing bell;
- buffalo/game hit;
- count ticks for Scene 11;
- stronger hit at 8;
- restraint under final values;
- optional real Dad voice for "Dream. Believe. Do."

Do not add whooshes to every movement.

Before the full 120-second preview, render:

review/previews/DadJourneyMaster_SYNC_DEBUG_0-30s.mp4

The debug render must visibly burn in:
- global frame;
- 24fps timecode;
- scene ID;
- active VO cue ID;
- cue start frame;
- cue end frame.

Do not proceed to full review render until the first 30 seconds are factually correct and audibly synchronized.

======================================================================
S. RENDER EXECUTION INFRASTRUCTURE
======================================================================

Also implement or preserve the render-execution contract already specified in:

docs/render-execution-pipeline.md
projects/hanh-trinh-cua-dad/docs/19-render-execution-pipeline.md
projects/hanh-trinh-cua-dad/docs/20-render-agent-handoff-prompt.md

If provider credentials are available:
Runway adapter is v1 primary.

Veo is fallback.

Do not make billable calls by default.

Require:

ALLOW_BILLABLE_SMOKE_TEST=true

for a live paid smoke test.

A successful provider response is NOT creative approval.

Provider output must be:
downloaded
→ hashed
→ ffprobed
→ stored in canonical storage
→ marked CREATIVE_QC_PENDING

before selection.

Never auto-select.
Never auto-publish.

======================================================================
T. STORAGE / SECRETS
======================================================================

Use .env.example.

Never commit real .env.

Never log:
API keys,
bearer tokens,
service-account JSON,
long-lived signed URLs.

Canonical media storage:
S3-compatible / R2 according to existing execution docs.

Heavy media must not be committed to normal Git.

======================================================================
U. REQUIRED TESTS
======================================================================

At minimum test:

1. DadJourneyMaster exists.
2. width = 1920.
3. height = 1080.
4. fps = 24.
5. durationInFrames = 2880.
6. 19 scenes exist.
7. frame 0 through 2879 are covered exactly.
8. no timing gaps.
9. no accidental overlaps.
10. scene component names match scene-plan.json.
11. STEP2 helper repeats odd frame pose.
12. STEP3 helper repeats each pose three frames.
13. no Math.random in render-time animation.
14. AI clips are optional.
15. factual scenes do not require AI video.
16. all critical text is editable Remotion text.
17. Dad is only transformed as whole image/card.
18. required Dad refs fail production preflight when unavailable.
19. development mode can show clearly marked placeholders.
20. frame-prompt manifest validates 2880 unique prompt IDs.
21. frame F0000 resolves to FRAME_F0000_V01.
22. frame F2879 resolves to FRAME_F2879_V01.
23. all 19 hero prompts resolve.
24. all 7 generation asset prompts resolve.
25. no generated factual portrait is required.
26. low-resolution master render completes.
27. fact-lock validator passes.
28. audio-cue validator passes.
29. first 10 seconds contain Australia/Australian facts and no US/America origin content.
30. VO_C002 is exactly "Một người Úc."
31. narration global offset is exactly 0 frames.
32. all 35 narration cues fit their frame windows after synthesis/ffprobe.
33. no narration cue is allowed to shift later cues when it overflows.

======================================================================
V. REQUIRED REVIEW OUTPUTS
======================================================================

Before any high-quality master render, produce:

review/hero-frames/
  19 hero stills

review/trajectory/
  start/25/50/75/end for all 19 scenes

review/contact-sheets/
  contact sheets for critical moving layers

review/previews/
  DadJourneyMaster_SYNC_DEBUG_0-30s.mp4
  DadJourneyMaster_540p_v01.mp4

The sync-debug render must be reviewed first.

Also provide:
- rendered frame lookup by prompt ID;
- at minimum frames F0000, F0144, F0336, F0576, F0912, F1752, F1920, F2448, F2664, F2879.

======================================================================
W. IMPLEMENTATION PHASE ORDER
======================================================================

Execute in this order.

PHASE 0 — REPOSITORY AUDIT
- inspect repository/runtime;
- inspect current code;
- verify ffmpeg/ffprobe;
- verify Node version;
- verify no conflicting Remotion implementation.

PHASE 1 — CONTRACT VALIDATION
- run frame prompt generator;
- run frame validator;
- run audio cue validator;
- run fact-lock validator;
- validate project JSON;
- STOP if any validator fails.

PHASE 2 — REMOTION SCAFFOLD
- install/pin exact Remotion packages;
- create composition;
- create theme/tokens/helpers;
- create asset resolver.

PHASE 3 — CORE PAPER COMPONENTS
- implement reusable physical-paper primitives;
- implement stepped cadence;
- implement deterministic jitter.

PHASE 4 — HERO FRAMES
- implement all 19 static hero compositions;
- render all 19;
- fix composition failures.

PHASE 5 — FRAME ACTIONS
- implement exact action ranges scene by scene;
- honor STEP2/STEP3/SMOOTH/MIXED;
- implement exact transition chain.

PHASE 6 — REAL ASSET INTEGRATION
- Dad refs;
- archive refs;
- SVG maps;
- verified name-card fallbacks.

PHASE 7 — GENERATED SUPPORT ASSETS
- if image generation capability is available, generate only the 7 approved assets from exact prompts;
- otherwise use clearly marked development placeholders and keep implementation ready for drop-in replacement.

PHASE 8 — OPTIONAL AI VIDEO
- only S01_SH02/S01_SH03;
- only if provider/credentials are available and billable execution is explicitly enabled;
- otherwise keep still-layer animation fallback.

PHASE 9 — AUDIO
- synthesize/integrate the 35 exact narration cues from production/audio/voiceover-cues.json;
- use one 48kHz PCM WAV per cue;
- trim head/tail silence only;
- ffprobe each cue;
- place each cue at exact start_frame;
- fail any cue that exceeds end_frame_exclusive;
- enforce global_audio_offset_frames = 0;
- integrate music/SFX after narration sync is verified.

PHASE 10 — TESTS
- run unit/integration tests;
- run exact-frame manifest validation.

PHASE 11 — REVIEW RENDERS
- hero frames;
- trajectory sheets;
- 540p full draft.

PHASE 12 — REPORT
- document exact commands;
- list substitutions/fallbacks;
- list only true external blockers;
- do not call project "final rendered" unless real final render exists.

======================================================================
X. DO NOT STOP AT SCAFFOLDING
======================================================================

Do not stop after:
- package.json;
- folders;
- interfaces;
- one sample scene;
- placeholder components.

The task is incomplete until all 19 scenes exist and the full low-resolution 120-second draft renders.

======================================================================
Y. BLOCKER POLICY
======================================================================

Do not ask the owner routine questions already answered by repository docs.

Make reasonable engineering decisions and document them.

Continue using safe fallback when:
- AI clip unavailable;
- historical portrait unverified;
- optional generated asset unavailable.

Only stop for a genuine external blocker such as:
- repository inaccessible;
- required real Dad asset unavailable in production mode;
- dependency install impossible;
- billable provider credential required for a specifically requested live test;
- infrastructure permission denied.

Missing AI output is NOT a blocker because the master must work without AI video.

======================================================================
Z. FINAL DEFINITION OF DONE
======================================================================

You are done only when:

- frame prompt validation reports 2880 frames;
- 19 hero frames are implemented;
- all 19 animated scenes are implemented;
- all documented frame-action ranges are represented;
- physical paper motion visibly uses stepped cadence;
- transition chain is coherent scene-to-scene;
- Dad remains recognizable and unmodified;
- factual archive stays truthful;
- all text is deterministic/editable;
- the complete 120-second Remotion master works without AI video;
- optional generated assets can replace placeholders without timing change;
- tests pass;
- 540p review master renders successfully;
- review stills/contact sheets are exported;
- README/runbook contains exact execution commands.

Do not merely explain what you would do.

Execute it.
```

## Operator note

For the execution agent, the shortest instruction is:

```text
Read and execute projects/hanh-trinh-cua-dad/docs/28-MASTER-EXECUTION-AGENT-PROMPT.md completely. Do not stop at planning or scaffolding. Follow the repository's exact 2880-frame contracts and render a 540p review master when implementation is complete.
```
