# 23 — Remotion Implementation Handoff Prompt — LEGACY V1

> **SUPERSEDED.** Use `docs/34-VOX-V2-MASTER-IMPLEMENTATION-PROMPT.md` for new implementation.

## Copy-paste prompt for the Remotion coding agent

```text
You are the Remotion Motion-Design Engineer for VietUcFamilyVideo.

Your task is to implement the final deterministic editorial animation system for:

projects/hanh-trinh-cua-dad/

This is NOT an AI-B-roll task.
This is NOT a slideshow task.
This is NOT a generic "Vox style" task.

The film is a designed paper-stop-motion editorial documentary.

READ IN THIS ORDER:

1. AGENTS.md
2. docs/editorial-remotion-style-system.md
3. projects/hanh-trinh-cua-dad/README.md
4. projects/hanh-trinh-cua-dad/docs/03-screenplay.md
5. projects/hanh-trinh-cua-dad/docs/07-continuity-bible.md
6. projects/hanh-trinh-cua-dad/docs/08-paper-edit.md
7. projects/hanh-trinh-cua-dad/docs/09-sound-plan.md
8. projects/hanh-trinh-cua-dad/docs/15-archive-shortlist-qc.md
9. projects/hanh-trinh-cua-dad/docs/16-storyboard-animatic-spec.md
10. projects/hanh-trinh-cua-dad/docs/17-voiceover-lock.md
11. projects/hanh-trinh-cua-dad/docs/18-model-routing.md
12. projects/hanh-trinh-cua-dad/docs/21-reference-style-breakdown.md
13. projects/hanh-trinh-cua-dad/docs/22-frame-by-frame-paper-stop-motion.md
14. projects/hanh-trinh-cua-dad/production/remotion/style-tokens.json
15. projects/hanh-trinh-cua-dad/production/remotion/scene-plan.json

MASTER COMPOSITION

Create:

DadJourneyMaster

1920×1080
24fps
2880 frames
exactly 120 seconds

IMPLEMENT ALL 19 SCENES.

Each scene must correspond exactly to the global frame ranges in:

projects/hanh-trinh-cua-dad/docs/22-frame-by-frame-paper-stop-motion.md

FRAME-BY-FRAME RULE

The blueprint is authoritative.

Every animation interval is specified.

Do not replace:
"F0156–F0171 Dad card enters x=-520→270 STEP2"

with a generic CSS animation.

You must implement the actual:
- frame range;
- start/end transform;
- stepped cadence;
- hold;
- transition.

PAPER MOTION

Paper layers default to motion on twos:

const onTwos = (frame: number) => Math.floor(frame / 2) * 2;

Heavy/comedic paper placement may use:

const onThrees = (frame: number) => Math.floor(frame / 3) * 3;

Camera motion may remain smooth at 24fps.

Do not make all paper motion smoothly interpolated.

The intended feel is:
a human moved physical paper pieces,
photographed them,
moved them again,
photographed them again.

It must not feel like:
PowerPoint,
Canva,
generic easing presets,
or floating web UI.

DETERMINISTIC JITTER

Implement a authored repeating jitter pattern from style tokens.

Never use Math.random() in render-time animation.

Dad/real archive use much less jitter.

Dad's face must never warp, morph, rotate independently, or receive facial animation.

MATERIAL SYSTEM

Build reusable components:

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

All paper cards should support:
- x/y
- rotation
- scale
- zIndex
- shadow
- rough-edge mask/asset
- stepped transform cadence

SCENE DESIGN

Do not improvise layout.

Use exact layout and frame choreography from the frame-by-frame blueprint.

Examples:

Scene 02:
- Dad left
- kangaroo right
- VS center
- disclaimer top
- stat cards bottom
- poster slides away to expose map

Scene 03:
- map route Australia→Vietnam
- buffalo final-boss poster
- Dad enters
- freeze before fight
- "CÂU CHUYỆN THẬT HAY HƠN"
- game world leaves physically to reveal Adelaide

Scene 11:
- count 1→8 using stepped card additions
- pause on 8
- strong yellow highlight
- that exact highlight becomes Scene 12 title highlight

TRANSITION CHAIN

The film has one physical transition chain.

Implement it exactly:

01→02 serious composition → poster slam
02→03 poster slides → map underneath
03→04 game poster leaves → Adelaide map
04→05 Adelaide marker → question underline
05→06 underline → timeline baseline
06→07 route endpoint → portrait card
07→08 portrait card → year timeline
08→09 1997 marker → notebook tab
09→10 criteria cards → network nodes
10→11 student nodes → counted cards
11→12 yellow 8 highlight → Stevenson title highlight
12→13 title → network header
13→14 connector → timeline
14→15 timeline → Vietnam map outline
15→16 map darkens → 2006 card
16→17 handoff arrow → Viet–Úc connector
17→18 connector → archive window
18→19 archive card → Dad portrait

Do not use random transitions.

AI VIDEO

AI video is optional.

If S01_SH02 / S01_SH03 generated clips exist:
- place them inside controlled masks/layers;
- use only useful animal/secondary motion;
- keep Remotion typography and layout above;
- preserve the exact scene timing.

If AI clips do not exist:
the complete video must still render using paper-layer animation.

FACTUAL SCENES

Do not synthesize fake archival footage.

Use:
- real Dad photos;
- verified archive;
- maps;
- timeline;
- cards;
- typography;
- diagrams.

HERO STILL GATE

Before animating each scene, render one hero still.

Do not proceed if the still does not explain the VO sentence visually.

For all 19 scenes create a review folder:

review/hero-frames/

Export the hero frame numbers listed in doc 22.

TRAJECTORY PREVIEW GATE

For every scene export:
- start;
- 25%;
- 50%;
- 75%;
- final.

For important moving paper objects, produce trajectory-contact-sheet previews.

This is required before full preview render.

TEXT

All factual text is rendered by Remotion.

Never depend on AI-generated text.

Vietnamese glyphs must render correctly.

Use at most two font families.

Pin exact font files/package versions in implementation.

AUDIO

Support:
- voice-over
- music
- SFX

Sound cues are specified in project sound/blueprint docs.

Use deterministic frame timings.

Do not automatically add whoosh to every movement.

QUALITY TESTS

Write tests asserting:

1. composition duration = 2880;
2. fps = 24;
3. all global frames 0–2879 are covered;
4. 19 scenes exist;
5. no timing gaps;
6. scene component names match scene-plan.json;
7. frame schedule helper can reproduce STEP2/STEP3;
8. Math.random is not used in render code;
9. Dad images are transformed only as whole layers;
10. AI clip assets are optional;
11. factual scenes do not require AI video;
12. all critical text remains editable Remotion text;
13. final frame is F2879 and Scene 19 still visible;
14. production mode fails if required Dad source images are missing;
15. development mode may show clearly labeled placeholders.

REVIEW RENDERS

Before rendering a full high-quality master:

1. export all hero frames;
2. export all 5-state trajectory previews;
3. render 360p or 540p full draft;
4. inspect transitions and narration timing;
5. only then render high quality.

DEFINITION OF DONE

The implementation is NOT done when the project merely runs.

It is done when:
- all 19 scenes are implemented;
- every interval in doc 22 is represented;
- paper motion visibly uses stepped cadence;
- camera motion remains controlled;
- transitions physically connect scenes;
- Dad face is stable;
- archive chronology is honest;
- the film still works with no AI clips;
- preview frames look like designed editorial compositions;
- full 120-second low-res preview renders successfully.

Do not ask routine design questions.
The design decisions already exist in the documentation.
Implement them faithfully and document any technical substitution.
```
