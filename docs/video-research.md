# Video Production Research Notes

> Baseline research date: 2026-10-07
> Purpose: document the evidence behind the operating rules in `AGENTS.md`.
> This file is not a substitute for checking current model documentation at execution time.

## 1. Pre-production: script → storyboard → shooting script → shot list

### Adobe — Video scripts
https://www.adobe.com/creativecloud/video/discover/video-script.html

Key takeaways:
- a video script is a blueprint for locations, time, action and dialogue;
- the project goal and audience should be identified before writing;
- script development is iterative and collaborative.

Applied here:
- Agent 01 locks audience/objective;
- Agent 02 structures story;
- Agent 03 writes scenes;
- camera micromanagement is delayed until directing/cinematography.

### Adobe — Storyboarding
https://www.adobe.com/creativecloud/video/discover/storyboarding.html

Key takeaway:
- storyboard translates script into visual information and emotion before production.

Applied here:
- Director treatment and shot cards are the textual source of truth before visual storyboards are generated/drawn.

### Adobe — Shooting scripts
https://www.adobe.com/creativecloud/video/discover/shooting-script.html

Key takeaways:
- a shooting script combines narrative material with production-specific details;
- shot planning is developed by director/cinematographer and coordinated with the wider production.

Applied here:
- screenplay and camera plan are separate artifacts until Director/DP stages;
- final director pack merges them only after review.

### Adobe — Shot lists
https://www.adobe.com/creativecloud/video/discover/shot-list.html

Key takeaways:
- shot lists support complete editorial coverage;
- common fields include scene/shot number, location, shot type, camera angle, movement, scene description and audio notes;
- director and cinematographer should plan blocking, angle and equipment;
- a shot list that is too detailed can become unusable on set.

Applied here:
- master shot list stays scannable;
- detailed data lives in shot cards;
- Editor participates before production.

## 2. Continuity and editing

### Adobe — 180-degree rule
https://www.adobe.com/creativecloud/video/discover/what-is-the-180-degree-rule.html

Key takeaways:
- keeping cameras on one side of the axis preserves consistent spatial relationships in dialogue/action;
- crossing the line can be useful when intentional;
- continuity is shared by production and editing.

Applied here:
- Agent 06 tracks axis, screen direction and eyelines;
- intentional axis breaks require a documented reason/bridge.

### Adobe — Editing priorities
https://www.adobe.com/creativecloud/video/discover/edit-a-video.html

The article presents editing considerations in this order:
1. emotion;
2. story;
3. rhythm;
4. eye trace;
5. 2D screen plane;
6. 3D space.

Applied here:
- Agent 07 uses this hierarchy when rules conflict.

### Adobe — Wide shots / A-roll
https://www.adobe.com/creativecloud/video/production/cinematography/camera-shots-and-angles/wide-shot.html
https://www.adobe.com/creativecloud/video/discover/a-roll.html

Key takeaways:
- wide shots can establish space and relationships;
- closer shots expose reaction and emotional detail;
- master shots can provide geography and editorial options.

Applied here:
- shot size is chosen for information/emotion, not by formula;
- a master is used when it solves spatial/editorial needs, not automatically.

## 3. Lens / perspective

### Canon RF Lens World — Perspective
https://files.canon-europe.com/files/webcontent/rf-lens-world/knowledge/perspective/index.html

Key takeaway:
- wide-angle and telephoto choices are associated with different perceived spatial relationships.

Important craft clarification used in this repo:
- geometric perspective fundamentally depends on camera position;
- focal length determines field of view and often changes the working distance chosen for equivalent framing;
- therefore Agent 05 records both lens intent and camera position rather than treating focal length as an emotional preset.

## 4. AI video — Runway

### Runway Gen-4 Video Prompting Guide
https://help.runwayml.com/hc/en-us/articles/39789879462419-Gen-4-Video-Prompting-Guide

Key takeaways:
- start simple and iterate;
- add subject motion, camera motion, scene motion and style as needed;
- use direct, concrete physical descriptions;
- positive phrasing is recommended;
- image-to-video prompts should focus on motion because the image already carries visual information;
- overly complex prompts with many scene changes can be unreliable.

### Runway Image-to-Video Prompting Guide
https://help.runwayml.com/hc/en-us/articles/48324313115155-Image-to-Video-Prompting-Guide

Key takeaways:
- image defines initial composition, subjects, lighting and style;
- prompt should describe subject action, environmental motion, camera motion, timing, direction and speed;
- start with critical motion, then add detail;
- conflicting implied motion in the input image can fight the prompt.

### Runway Text-to-Video Prompting Guide
https://help.runwayml.com/hc/en-us/articles/47313737321107-Text-to-Video-Prompting-Guide

Key takeaways:
- T2V needs visual description plus motion description;
- visual components include subject, environment, lighting, framing and style;
- motion components include subject/environment/camera motion plus timing/direction/speed.

### Runway Camera Terms
https://help.runwayml.com/hc/en-us/articles/47313504791059-Camera-Terms-Prompts-Examples

Applied here:
- AI prompts inherit camera language from the DP but are simplified for model control;
- model-specific vocabulary is an adapter layer, never the master creative spec.

## 5. AI video — Google Veo

### Google DeepMind — Veo prompt guide
https://deepmind.google/models/veo/prompt-guide/

Key takeaways:
- explicit control dimensions include shot framing/motion, style, lighting, character, location, action and dialogue;
- sound can be described alongside visuals;
- detailed action descriptions can help when complex motion is essential.

### Google DeepMind — Veo
https://deepmind.google/models/veo/

Current capability page highlights:
- reference images for scenes/characters/objects;
- style references;
- character consistency;
- extension;
- camera controls;
- first/last-frame workflows.

Applied here:
- Agent 09 must verify the actual selected model/version at execution time before using these capabilities.

## 6. AI video — OpenAI historical reference

### OpenAI — Sora 2 Prompting Guide (archived)
https://developers.openai.com/cookbook/examples/sora/sora2_prompting_guide

This guide is explicitly marked archived/outdated. Do **not** treat it as a current availability statement.

Durable prompt-design ideas worth retaining:
- brief the model like a cinematographer;
- define framing, action beats, light/palette and depth of field when they matter;
- concise shots are generally easier to control;
- keep individual shot blocks distinct.

The current availability of any OpenAI video product must be checked separately before use.

## 7. Blackmagic Design — editorial continuity

### DaVinci Resolve Editor's Guide
https://documents.blackmagicdesign.com/UserManuals/DaVinci-Resolve-18-Editors-Guide.pdf

Key takeaway:
- single-camera scenes are commonly built from multiple takes/angles and depend on continuity for seamless editing;
- master and reverse angles serve different editorial functions.

Applied here:
- Agent 06 and Agent 07 jointly review action continuity and coverage.

## 8. Short-clip duration and long-form assembly

### Runway Gen-4.5
https://help.runwayml.com/hc/en-us/articles/46974685288467-Creating-with-Gen-4-5

Checked 2026-10-07:
- supported duration is 2–10 seconds;
- both text-to-video and image-to-video are documented;
- longer/more sequential actions may benefit from longer duration.

### Runway Gen-4
https://help.runwayml.com/hc/en-us/articles/37327109429011-Creating-with-Gen-4-Video

Checked 2026-10-07:
- supported durations are 5 or 10 seconds;
- the input image establishes the first frame;
- image-to-video prompt should focus heavily on motion.

### Runway — longer videos and films
https://help.runwayml.com/hc/en-us/articles/26871350018835-How-to-create-longer-videos-and-films

Key takeaways:
- longer narratives are built from multiple shorter generated clips;
- storyboard frames can map to generations commonly around 5–10 seconds;
- character plates and environment plates help reduce consistency drift.

### Runway — Last Frame workflow
https://help.runwayml.com/hc/en-us/articles/47184761711379-Using-Utility-Nodes-in-Workflows

Key takeaway:
- the last frame of one generation can be extracted and used as the first-frame input of the next generation for longer continuity.

### Runway — image-to-video longer sequences
https://help.runwayml.com/hc/en-us/articles/48324313115155-Image-to-Video-Prompting-Guide

Key takeaways:
- longer sequences can be created by using a completed generation's last frame as a new image input;
- after assembly, the duplicate shared frame can be removed;
- sequential action timing should fit the selected generation duration.

### Google Vertex AI — Veo 3.1
https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models/veo/3-1-generate-preview

Checked 2026-10-07:
- documented duration choices for Veo 3.1 variants include 4, 6 and 8 seconds;
- exact feature support differs by specific model/version and deployment state.

### Google Vertex AI — first and last frames
https://docs.cloud.google.com/vertex-ai/generative-ai/docs/video/generate-videos-from-first-and-last-frames

Key takeaway:
- first/last-frame generation is documented and can constrain the endpoints of a shot;
- duration rules remain model-specific.

### Adobe — match cuts
https://www.adobe.com/in/creativecloud/video/discover/match-cut.html

Key takeaways:
- action match cuts can preserve flow across a cut;
- graphic and audio matching can create continuity;
- J/L cuts overlap audio across picture changes.

Applied here:
- **10 seconds is treated as a common planning ceiling, not a universal truth**;
- generated duration is separated from final edited duration;
- the system distinguishes true same-shot continuation from a motivated editorial cut;
- every important adjacent AI clip pair gets a transition/continuity contract;
- handles, action phase, camera velocity, subject velocity, sound bridge and shared-frame trimming are planned explicitly;
- detailed implementation lives in `docs/ai-video-short-clip-continuity.md`.

## 9. Structured local pipelines, ControlNet, identity adapters and lip-sync

### ControlNet paper
https://arxiv.org/abs/2302.05543

Primary-paper takeaway:
- ControlNet adds spatial conditioning to diffusion models using controls such as edges, depth, segmentation and human pose.

Applied here:
- structural controls are treated as constraints on spatial structure, not as guarantees of anatomy, identity, temporal consistency or physics;
- multiple controls are used only when their benefit outweighs conflict/rigidity.

### ComfyUI official repository API example
https://github.com/comfyanonymous/ComfyUI/blob/master/script_examples/websockets_api_example.py

Key implementation takeaways:
- a workflow can be submitted as structured JSON;
- prompt execution is queued through the server API;
- WebSocket progress can be tracked;
- history/output can be fetched after completion.

Applied here:
- ComfyUI can be an execution adapter behind a canonical project/shot schema;
- production queues add their own stable IDs, idempotency, retries, artifact lineage and QC states rather than relying only on raw queue position.

### ComfyUI IPAdapter Plus
https://github.com/cubiq/ComfyUI_IPAdapter_plus

Key takeaways:
- IP-Adapter can transfer subject/style information from reference images;
- FaceID workflows require InsightFace and, for many variants, model-specific LoRA support;
- the repository reports maintenance-only status as of 2025.

Applied here:
- identity adapters are useful tools but never described as perfect face locks;
- production must record compatibility, maintenance and license risk.

### Wav2Lip reference implementation
https://github.com/Rudrabha/Wav2Lip

Key takeaways:
- lip-sync can be performed as a separate stage using target video plus audio;
- output quality depends on face detection/crop and source characteristics;
- the original open-source/pretrained ecosystem has commercial-use restrictions that must be checked before client/monetized use.

Applied here:
- lip-sync is treated as an independent technical stage;
- static/locked camera is only a simplifying fallback;
- actual sync offset and facial artifacts require QC;
- licensing is a delivery gate.

### Claim audit from the social-media workflow

**Keep / strengthen**
- structured storyboard/shot JSON;
- API/local workflow execution;
- reference-based identity conditioning;
- structural conditioning;
- separate lip-sync when useful;
- queued/batch rendering.

**Reject as blanket rules**
- "FaceID locks one face perfectly";
- "ControlNet prevents malformed hands/limbs";
- "locked camera + lip-sync has zero delay";
- "local pipeline costs zero";
- "overnight batch equals finished client-ready episodes."

The stronger production rule is:
> automate deterministic execution, not creative acceptance.

Detailed implementation lives in `docs/ai-production-pipeline.md`.

## 10. Research conclusions encoded in the system

1. Keep **screenplay**, **director intent**, **shot design** and **model prompt** as separate layers.
2. Keep the master shot list short enough to use; store detail in shot cards.
3. Make Editor and Continuity agents pre-production participants.
4. Use one model-neutral shot specification across live action and AI.
5. Treat AI generation as production, not as authorship of the story.
6. Use short, modular AI shots by default for recoverability.
7. Treat ≤10 seconds as a broad compatibility planning assumption, never as a universal model limit.
8. Separate **source generation duration** from **edited screen duration**.
9. For same-shot continuation, preserve boundary state and use extension / shared last-first frame / keyframes when currently supported.
10. For different shots, prefer motivated editing (action, eyeline, sound, graphic or conceptual match) over synthetic morphing.
11. Use reference assets, character plates and environment plates for continuity when supported.
12. Plan usable in/out handles and trim unstable boundary frames.
13. Use versioned machine-readable execution data for automation, while keeping creative intent vendor-neutral.
14. Treat ControlNet/pose/depth/edge controls as structural constraints, not quality guarantees.
15. Treat identity adapters as aids that require angle-by-angle QC, compatibility checks and license review.
16. Separate picture, voice, lip-sync and mix when decomposition improves control.
17. Scale batch rendering only after representative shots pass; unattended output still requires QC.
18. Optimize cost per **accepted shot/second**, not cost per raw generation.
19. Judge every shot by story function and editability before visual spectacle.
