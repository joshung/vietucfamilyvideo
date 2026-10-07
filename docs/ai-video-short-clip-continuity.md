# AI Video Short-Clip & Continuity Playbook

> Research baseline: 2026-10-07
> Purpose: production rules for building longer sequences from short AI-video generations.

## 1. Duration is a model constraint, not a story unit

Do not write the story in fixed 10-second chunks.

Current examples:
- Runway Gen-4.5: 2–10 seconds.
- Runway Gen-4: 5 or 10 seconds.
- Google Veo 3.1: 4, 6 or 8 seconds.
- Other models may expose different ranges, extension modes or edit/extend workflows.

The story is designed in beats and shots. The AI Video Director then maps each shot to the selected model's current duration options.

Default planning assumption for broad compatibility:
- one generation = one camera setup;
- one primary dramatic action;
- generated source duration usually <=10 seconds;
- final edited duration may be much shorter.

## 2. Generation duration vs edited duration

Never equate the two.

Example:
- generate 8 seconds;
- first 1.0s is unstable;
- useful performance lasts 4.5s;
- last 0.5s is a clean hold;
- final edit uses 5.0s.

Plan source duration to provide room for:
- motion to settle;
- action to read;
- pre/post handles;
- transition choices.

Do not stretch a shot merely to consume the full generated clip.

## 3. Three classes of joins

### 3.1 True continuation

Goal: make Clip B feel like the same uninterrupted camera take as Clip A.

Preferred methods, in order:
1. native model extension, when verified and reliable;
2. first/last-frame or keyframe workflow;
3. last frame of Clip A used as first frame/reference for Clip B;
4. hidden seam behind occlusion, darkness, whip motion or foreground wipe;
5. redesign into an intentional cut if continuity keeps failing.

Continuity contract:
- subject identity;
- pose;
- gaze;
- action phase;
- screen position;
- subject velocity and direction;
- camera velocity and direction;
- focus/depth state;
- hero-prop state;
- lighting direction;
- time/weather;
- background movement.

In the editor:
- align the shared state;
- remove duplicated shared frame when appropriate;
- inspect at normal speed and frame-by-frame;
- add a tiny blend only if it improves the seam without ghosting.

### 3.2 Motivated editorial cut

Goal: hide no seam. Make the cut feel inevitable.

Strong options:
- match on action;
- eyeline → POV;
- reaction cut;
- cut on sound;
- J-cut;
- L-cut;
- graphic/shape/color match;
- movement-direction match;
- foreground occlusion;
- cut on impact/contact;
- cut at a change of thought or emotional beat.

A visible cut can be smoother than a synthetic morph.

### 3.3 Deliberate transition

Use only when transition itself carries meaning:
- dissolve for elapsed time, memory or emotional blending;
- fade for structural punctuation;
- match dissolve for motif;
- whip/occlusion transition for energy or spatial relocation;
- stylized morph only when transformation is part of the concept.

Do not use transitions to repair broken continuity by default.

## 4. Boundary design

Every must-have AI shot should have a planned boundary state.

### Opening boundary
Define:
- composition;
- subject pose;
- gaze;
- motion already in progress or at rest;
- camera motion already in progress or at rest;
- audio state.

### Closing boundary
Define:
- action phase;
- body pose;
- gaze;
- screen position;
- prop state;
- subject velocity;
- camera velocity;
- environment motion;
- sound tail.

For a normal cut, the boundary needs editability.
For a true continuation, the boundary needs state continuity.

## 5. Handles

Request handles whenever possible.

Practical target:
- a short readable state before core action;
- a short readable state after core action.

The exact number of frames/seconds depends on:
- shot energy;
- model stability;
- frame rate;
- intended transition.

Do not force a universal handle duration.

If the model produces unstable edges:
- trim them;
- regenerate;
- use cutaway/reaction;
- or redesign the boundary.

## 6. Match action

For a cut on action:
1. identify one discrete physical action;
2. choose the handoff phase;
3. ensure both shots show compatible direction and speed;
4. preserve body/prop state;
5. cut during movement rather than after both shots stop, when appropriate.

Record:
- action name;
- start phase;
- cut phase;
- landing phase;
- screen direction;
- prop hand.

AI-specific risk:
different generations may interpret the same action with different biomechanics. If this happens, use a larger framing change, cutaway, or sound bridge rather than forcing a frame-perfect match.

## 7. Camera-motion continuity

When continuing a moving camera, match:
- move type;
- direction;
- speed character;
- acceleration/deceleration;
- camera height;
- distance to subject;
- parallax pattern.

A dolly-in that restarts from zero speed at every generated clip will reveal the seam.

If velocity continuity cannot be maintained:
- end Clip A on a settle;
- start Clip B from a settle;
- cut intentionally;
- or hide the handoff during an occlusion.

## 8. Character consistency

Before a sequence with recurring people:
- create approved character plates;
- include front, 3/4, profile and full-body views as needed by the shot list;
- lock wardrobe, hair, accessories and age/state;
- create expression references only when materially useful.

Do not depend on one flattering portrait to define a character from all angles.

For each scene, preserve:
- wardrobe state;
- hair state;
- accessories;
- injuries/dirt/wetness;
- handed props;
- emotional/physical state.

## 9. Environment consistency

Create environment plates when the same location recurs.

Record:
- room geometry;
- entrances/exits;
- hero furniture/objects;
- window positions;
- light direction;
- time of day;
- weather;
- palette/materials;
- screen geography.

Do not regenerate the entire location description from memory on every shot.

## 10. Motion hierarchy

Prompt motion in priority order:
1. primary subject action;
2. camera action;
3. story-relevant environment motion;
4. secondary atmospheric motion.

Too many independent moving systems can reduce controllability.

For image-to-video, the image already provides much of the static visual information. Focus prompt budget on temporal behavior.

## 11. One-shot complexity budget

A shot becomes fragile when it asks for many of these simultaneously:
- multiple characters with independent actions;
- hand/object interaction;
- precise lip sync/dialogue;
- complex camera choreography;
- transformation;
- readable text;
- fast object motion;
- reflection/mirror behavior;
- fluid physics;
- crowd choreography;
- continuity-critical prop changes.

When several occur together:
- simplify;
- split the shot;
- use compositing;
- use live action;
- or choose another model/workflow.

## 12. Dialogue and audio

Do not assume one-pass generated dialogue is the best solution.

Options:
- generate picture, add voice separately;
- performance/lip-sync workflow;
- native audio generation if current model supports it and quality is acceptable;
- live recorded dialogue for hybrid productions.

For joins:
- use room tone/ambience across cuts;
- carry dialogue or sound with J/L cuts;
- avoid obvious ambience resets every clip;
- maintain acoustic perspective unless POV/location changes.

## 13. Text and signage

Readable text remains a risk in generative video.

For story-critical text:
- prefer compositing in post;
- use a stable image/reference containing approved typography;
- keep camera/motion simple;
- QC every frame where the text must remain legible.

Never trust a generated sign, phone UI, subtitle or legal/brand text without inspection.

## 14. Aspect ratio, resolution and FPS

Lock delivery format early enough to avoid re-framing every generation.

Before production, verify current model support for:
- aspect ratio;
- resolution;
- frame rate;
- crop behavior for input images;
- upscale/export options.

Avoid mixing frame rates or aspect ratios casually inside one sequence.

If models output different resolutions:
- decide the master timeline resolution;
- upscale/downscale consistently;
- match sharpness/noise/grain in finishing.

## 15. Visual texture matching

Even when identity is correct, adjacent AI clips may differ in:
- contrast;
- saturation;
- black level;
- sharpness;
- noise;
- motion blur;
- depth of field;
- highlight rolloff.

Plan a finishing pass:
- color match;
- exposure balance;
- texture/grain;
- sharpening/softening;
- motion-blur consistency.

Do not try to solve every finishing mismatch inside prompts.

## 16. Iteration economics

Generation is probabilistic. Plan multiple attempts.

Efficient ladder:
1. validate composition with still image;
2. test shorter/cheaper video mode where available;
3. validate core motion;
4. lock references;
5. generate higher-quality/final version;
6. only regenerate failed units.

Do not spend premium generations debugging a bad shot concept.

## 17. Seeds and reproducibility

A seed may help similarity on models that expose it, but:
- seed behavior is model-specific;
- same seed does not guarantee exact continuity;
- model updates can change results.

Record seeds only as implementation metadata, never as the sole continuity strategy.

## 18. First/last-frame workflows

When supported, first/last-frame control is valuable for:
- landing at a specific composition;
- bridging two approved keyframes;
- matching a known next shot;
- controlling transformation endpoints.

Do not over-constrain impossible motion between two incompatible frames.

The path between endpoints must remain physically and temporally plausible.

## 19. Hidden seams

Useful hiding points:
- foreground object fills frame;
- actor crosses lens;
- door/wall wipe;
- whip pan;
- motion blur;
- flare/darkness;
- camera enters a texture;
- cut on flash/impact.

Use hidden seams as a designed transition, not as a universal crutch.

## 20. QC for every two-shot pair

Review A → B at normal speed, then frame-by-frame.

Check:
- identity;
- pose/action phase;
- eye trace;
- screen direction;
- prop state;
- light/time/weather;
- camera motion;
- environment geometry;
- audio bed;
- temporal logic;
- unintended morph;
- duplicate/shared frames;
- unstable edge frames.

If the viewer notices the generation boundary before the story beat, the join has failed.

## 21. Current official references

### Runway Gen-4.5
https://help.runwayml.com/hc/en-us/articles/46974685288467-Creating-with-Gen-4-5

Baseline checked 2026-10-07:
- 2–10 second duration selection;
- T2V and I2V.

### Runway Gen-4
https://help.runwayml.com/hc/en-us/articles/37327109429011-Creating-with-Gen-4-Video

Baseline checked 2026-10-07:
- 5 or 10 second generations;
- input image establishes first frame;
- longer duration can help multiple motions.

### Runway — longer videos and films
https://help.runwayml.com/hc/en-us/articles/26871350018835-How-to-create-longer-videos-and-films

Baseline checked 2026-10-07:
- longer narratives are assembled from short generated clips;
- storyboard frames can correspond to 5–10 second generations;
- character and environment plates improve consistency.

### Runway — utility Last Frame workflow
https://help.runwayml.com/hc/en-us/articles/47184761711379-Using-Utility-Nodes-in-Workflows

Baseline checked 2026-10-07:
- final frame can be extracted and used as first-frame input for the next generation to build longer continuity.

### Runway — image-to-video prompting
https://help.runwayml.com/hc/en-us/articles/48324313115155-Image-to-Video-Prompting-Guide

Baseline checked 2026-10-07:
- longer sequences can be built by reusing the last frame as a new input;
- shared frame can be removed during editing;
- sequential prompting/timestamps should respect available duration.

### Google Vertex AI — Veo 3.1
https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models/veo/3-1-generate-preview

Baseline checked 2026-10-07:
- documented durations include 4, 6 or 8 seconds for Veo 3.1 variants;
- capabilities differ by exact model/version.

### Google Vertex AI — first and last frames
https://docs.cloud.google.com/vertex-ai/generative-ai/docs/video/generate-videos-from-first-and-last-frames

Baseline checked 2026-10-07:
- first/last-frame workflows are documented;
- accepted duration depends on model generation.

### Adobe — match cuts
https://www.adobe.com/in/creativecloud/video/discover/match-cut.html

Key editorial principle:
- action, graphic and audio matches can create continuity across cuts;
- J/L audio overlap can smooth transitions.
