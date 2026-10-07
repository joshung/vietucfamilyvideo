# Video Production Research Notes

> Baseline research date: 2026-10-07
> Purpose: document the evidence behind the operating rules in `agent.md`.
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

## 8. Research conclusions encoded in the system

1. Keep **screenplay**, **director intent**, **shot design** and **model prompt** as separate layers.
2. Keep the master shot list short enough to use; store detail in shot cards.
3. Make Editor and Continuity agents pre-production participants.
4. Use one model-neutral shot specification across live action and AI.
5. Treat AI generation as production, not as authorship of the story.
6. Use short, modular AI shots by default for recoverability.
7. Use reference assets for continuity when the current model supports them.
8. Judge every shot by story function and editability before visual spectacle.
