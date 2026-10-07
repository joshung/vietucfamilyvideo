# 18 — AI / Motion Model Routing v01

> Checked: 2026-10-07

## Decision

This project does **not** need an AI-video model for most of its runtime.

Primary production stack:

```
real Dad/archive
+ editorial motion graphics
+ maps/timeline
+ two controlled fictional AI/collage shots
```

## Primary AI-video model

**Runway Gen-4.5 — Image to Video**

Use for:
- optional kangaroo motion;
- optional buffalo motion;
- optional subtle Dad-photo motion only if identity survives.

Why selected:
- official docs currently support Image to Video;
- duration is selectable from 2–10 seconds;
- 16:9 output is 1280×720;
- Image-to-Video prompting is intended to focus on motion;
- fits this project's short modular shot design.

Official reference:
https://help.runwayml.com/hc/en-us/articles/46974685288467-Creating-with-Gen-4-5

## Fallback / endpoint-control model

**Google Veo 3.1**

Use when:
- first/last-frame control is materially useful;
- an 8-second reference-image shot benefits from endpoint anchoring;
- Runway motion repeatedly drifts.

Current official docs indicate:
- 4, 6, or 8 second generations depending workflow;
- reference-image-to-video uses 8 seconds in documented enterprise model behavior;
- 16:9 and 9:16 are supported;
- 24 FPS;
- first/last-frame capability exists in Veo 3.1 family documentation.

Official references:
- https://deepmind.google/models/veo/
- https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-1-generate

## Model routing by shot

| Shot | Method | Primary | Fallback |
|---|---|---|---|
| S01_SH01 Dad intro | still + editor motion | no AI | Runway subtle I2V |
| S01_SH02 kangaroo | layered collage animation | Runway Gen-4.5 I2V | static/editor animation |
| S01_SH03 buffalo | layered collage animation | Runway Gen-4.5 I2V | Veo 3.1 / static animation |
| S02–S05 factual history | maps/type/archive | no AI video | none needed |
| End Dad portrait | still + editor motion | no AI | subtle I2V only if needed |

## Generation duration

Do not automatically generate 10 seconds.

Recommended:
- kangaroo: 5–7s source;
- buffalo: 6–8s source;
- subtle Dad motion: 3–5s source.

Edited duration remains independent.

## Output strategy

AI source may be 720p.

Master timeline:
**1920×1080 / 24fps**

For AI shots:
- upscale only after selecting the winning generation;
- normalize sharpness/noise/grain in finishing;
- do not upscale failed attempts.

## Dad identity policy

For real Dad:
editor-driven motion is preferred over AI if AI changes the face.

No requirement exists to animate every portrait.

## Prompting

Image-to-video prompts describe:
- motion;
- camera;
- timing.

They should not re-invent Dad's appearance already present in the input image.

## Render flow

Execution/API/upload automation is intentionally deferred by project owner.

This document locks **routing decisions**, not the render worker implementation.
