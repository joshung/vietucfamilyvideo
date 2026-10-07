# MASTER 10S PILOT AGENT PROMPT

## Copy this entire prompt to the implementation agent

```text
You are implementing ONLY a 10-second visual-quality pilot for VietUcFamilyVideo.

Do not touch or render the full 120-second master yet.

Branch target:
experiment/vox-10s-pilot-v01

Goal:
prove the art direction, composition, pacing and audio sync for the first ten seconds before scaling to the whole film.

READ FIRST:

1. AGENTS.md
2. docs/editorial-remotion-style-system.md
3. projects/hanh-trinh-cua-dad/production/facts/fact-lock.json
4. projects/hanh-trinh-cua-dad/production/audio/voiceover-cues.json
5. experiments/vox-10s-pilot/README.md
6. experiments/vox-10s-pilot/10s-frame-plan.md
7. experiments/vox-10s-pilot/style-frame-prompt.md
8. experiments/vox-10s-pilot/image-to-video-prompt.md

REFERENCE PRINCIPLES

The pilot follows the workflow in:
https://easy-peasy.ai/blog/how-to-make-vox-style-videos-with-ai

Apply these principles:

- one visual idea for the 10-second clip;
- one narration thought, under 20 spoken words if possible;
- visual anchor first, then context;
- maximum 2–3 visual beats;
- hold the main visual long enough to read;
- muted editorial palette with one loud yellow accent;
- archival/real photos treated as paper objects;
- paper animation on twos / ~12fps inside 24fps;
- image-first consistency;
- text and graphics answer the narration;
- nothing moves merely to move.

Do NOT copy Vox branding, logo, exact fonts or proprietary package.

FACT LOCK

Dad Stevenson is Australian.

He is NOT American.

The factual origin anchor is:
Adelaide, South Australia.

The pilot must fail if it contains:
America
American
USA
United States
Mỹ
Hoa Kỳ
US flag
Statue of Liberty
United States map

MASTER PILOT

Create a Remotion composition:

DadJourneyPilot10s

1920x1080
24fps
240 frames
exactly 10 seconds

Do not change the main DadJourneyMaster composition.

NARRATION

Use exactly:

Line A:
“Đây là Dad Stevenson, một người Úc sống ở Adelaide.”

Line B:
“Và tất nhiên, phải có một con kangaroo.”

Generate or use two separate 48kHz mono PCM WAV files.

Place:
Line A at F000.
Line B at F136.

Do not concatenate them into one TTS file.

Do not add a global audio offset.

If a line does not fit its frame window, regenerate that line only.

VISUAL ANCHOR

The main visual anchor is:

REAL DAD PHOTO + AUSTRALIA + ADELAIDE

The kangaroo is only the late payoff.

Do not introduce buffalo, scholarships, 1996, 1997, students or any later story content.

STYLE-FRAME GATE

First produce:

experiments/vox-10s-pilot/review/pilot-style-frame.png

Use:
experiments/vox-10s-pilot/style-frame-prompt.md

Do not animate until the still looks like a premium editorial documentary frame.

The still must NOT look like:
PowerPoint
Canva
generic corporate explainer
AI cinematic B-roll
glossy CGI
random scrapbook

REMOTION FRAME IMPLEMENTATION

Implement the exact 240-frame plan from:

experiments/vox-10s-pilot/10s-frame-plan.md

Paper movement:
STEP2 / on twos.

Camera push:
may be smooth at 24fps.

Dad:
whole photo layer only.
Never animate facial features.

Map:
accurate SVG.
Never image-model geography.

Text:
editable Remotion text only.

Kangaroo:
paper cutout.
Can be generated once as an asset or provided as an approved existing asset.

AI VIDEO

Optional.

If image-to-video is used:
use the exact visual-only prompt in:

experiments/vox-10s-pilot/image-to-video-prompt.md

Do NOT let the video model generate narration.

Remotion remains responsible for:
- title;
- Adelaide label;
- yellow accent;
- timing;
- VO placement;
- final frame.

REQUIRED OUTPUTS

Render:

1. pilot-style-frame.png
2. pilot-start.png at F000
3. pilot-anchor.png around F100
4. pilot-kangaroo.png around F190
5. pilot-end.png at F239
6. DadJourneyPilot10s_540p_v01.mp4
7. DadJourneyPilot10s_SYNC_DEBUG_v01.mp4

SYNC DEBUG

The debug render must burn in:
- frame number;
- timecode;
- active VO cue;
- cue start/end;
- scene label.

QUALITY GATES

The pilot fails if:

- Dad is described or shown as American;
- visual geography is not clearly Australia/Adelaide;
- Dad face is altered;
- narration is rushed;
- audio is late/early relative to the designed beats;
- more than one loud accent color is used;
- the kangaroo appears before the Australia/Dad anchor is established;
- the clip feels like a slideshow;
- every element floats smoothly;
- text is AI-generated rather than compositor text;
- the main Dad/Australia composition is held for too little time;
- it introduces story information beyond the first 10 seconds.

DO NOT IMPLEMENT THE FULL FILM.

When the 10-second pilot passes, stop and report:
- exact files created;
- exact render command;
- exact audio durations;
- screenshots;
- any visible mismatch.

Do not proceed to 120 seconds without owner approval.
```
