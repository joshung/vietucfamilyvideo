# AI Production Pipeline — Structured Automation Rules

> Research baseline: 2026-10-07
> Scope: converting screenplay/storyboard/shot plans into reliable automated AI-production jobs.

## 1. What was useful from the referenced workflow

The social-media post contains several ideas worth keeping:

1. **Machine-readable shot data** instead of manually copying prompts.
2. **Local/API execution layers** such as ComfyUI for repeatable workflows.
3. **Reference/identity conditioning** for recurring characters.
4. **Structural conditioning** such as edges/depth/pose.
5. **Separate dialogue/lip-sync stage** when picture generation cannot reliably deliver speech.
6. **Task queues** for batch rendering.

Those ideas are directionally strong.

Several claims must be softened or rejected:
- "FaceID locks one face perfectly" — false as a production guarantee.
- "ControlNet prevents malformed hands/limbs" — overclaim.
- "locked camera + lip-sync gives zero delay" — overclaim.
- "local pipeline costs zero" — false; it shifts cost to compute, electricity, storage, operations and licenses.
- "hundreds of jobs overnight → finished episodes in the morning" — possible only after validation, and still requires QC.

## 2. Structured storyboard / shot JSON

Do not put the whole creative process directly into vendor prompts.

Canonical shot data should include:

```json
{
  "schema_version": "1.0",
  "project_id": "P001",
  "scene_id": "S03",
  "shot_id": "S03_SH05",
  "story_function": "Character realizes the chair is empty.",
  "duration": {
    "edited_target_seconds": 4.0,
    "source_generation_seconds": 8
  },
  "camera": {
    "shot_size": "CU",
    "angle": "eye-level",
    "movement": "locked"
  },
  "subject": {
    "character_id": "CHAR_MOTHER_01",
    "action": "eyes shift to the empty chair"
  },
  "continuity": {
    "wardrobe_id": "WARDROBE_03",
    "location_id": "DINING_ROOM_NIGHT",
    "prop_state_ids": []
  },
  "execution": {
    "adapter": "runway|veo|comfyui|other",
    "mode": "i2v",
    "reference_asset_ids": []
  }
}
```

This should be validated before execution.

## 3. ComfyUI as an adapter

ComfyUI can be valuable for:
- graph-based repeatable pipelines;
- image/reference preprocessing;
- diffusion-image generation;
- conditioning/control workflows;
- local batch execution;
- post-processing chains.

Do not make a ComfyUI node graph the only source of creative truth.

Keep:
- canonical shot spec outside;
- adapter code maps canonical fields → workflow inputs;
- workflow JSON/version stored with each accepted generation.

## 4. Structural controls

ControlNet's original research demonstrates conditioning using forms such as:
- edges;
- depth;
- segmentation;
- human pose.

Interpretation:
- **Canny/edge**: useful for silhouette/layout/edge adherence.
- **Depth**: useful for relative spatial structure.
- **Pose/OpenPose-style controls**: useful for body pose/skeleton guidance.

They constrain one aspect of an image. They do not solve:
- identity continuity by themselves;
- hand anatomy guarantees;
- garment topology;
- temporal consistency;
- physics.

Over-conditioning can reduce naturalness or conflict with reference/style conditioning.

## 5. Identity/reference conditioning

Reference adapters can be useful for recurring characters.

A robust character package should contain:
- immutable character ID;
- approved face/appearance references;
- front/3/4/profile where needed;
- full-body proportions;
- wardrobe states;
- hair/accessory states;
- lighting-neutral reference when possible.

Identity acceptance should be checked per shot, especially:
- profile;
- occlusion;
- extreme expression;
- low light;
- wide lens close-up;
- fast motion.

FaceID-style IP-Adapter implementations may require dependencies such as InsightFace and model-specific LoRAs. Treat maintenance status and licensing as production concerns.

## 6. Motion should not be forced into one method

The post's suggestion to avoid complex action can be a useful fallback, but a production system should choose among:

- native video model;
- image-to-video;
- pose-guided animation;
- generated keyframes + interpolation;
- live-action plate;
- motion capture;
- compositing;
- split into simpler shots.

If hand/object interaction or choreography is mission-critical, test early.

## 7. Dialogue and lip-sync

Do not require the image/video model to solve:
- acting;
- exact dialogue;
- identity;
- mouth articulation;
- camera choreography

all at once unless proven reliable for that shot.

A controllable route is:

```
script
→ approved voice
→ picture/performance
→ lip-sync
→ facial QC
→ editorial sync
→ audio mix
```

Check:
- audio/video duration;
- FPS;
- face detection/crop;
- mouth/teeth/chin artifacts;
- phoneme timing;
- head rotation;
- occlusion;
- shot boundaries.

Locked camera can make this easier but should not destroy the visual language of the film.

## 8. Render queue

A production queue needs more than "throw hundreds of jobs at the server."

Minimum job model:

```json
{
  "job_id": "JOB_000341",
  "shot_id": "S03_SH05",
  "attempt": 4,
  "depends_on": ["ASSET_CHAR_01", "FRAME_S03_SH04_END"],
  "status": "QUEUED",
  "engine": "comfyui",
  "workflow_version": "wf_character_i2v_v7",
  "priority": 80,
  "timeout_seconds": 900,
  "max_retries": 2
}
```

Queue requirements:
- priority;
- dependency graph;
- retry ceiling;
- cancellation;
- timeout;
- logs;
- worker health;
- disk-space protection;
- output hashing;
- QC state.

## 9. Render-farm rule

Scale only after a representative sample passes.

Recommended:
1. generate 3–5 shots representing easy/medium/hard cases;
2. validate quality;
3. profile VRAM/time/storage;
4. lock versions;
5. estimate batch cost;
6. then increase concurrency.

Do not discover a broken custom node after 400 failed jobs.

## 10. Reproducibility bundle

For every approved take save:

```
shot_id
attempt_id
canonical shot JSON
adapter/workflow version
exact workflow JSON
model/checkpoint hashes or identifiers
LoRA/adapters
reference assets
prompt
seed (if exposed)
dimensions
duration/frame count/FPS
sampler/scheduler when relevant
generation timestamp
output hash
post-processing chain
QC status
```

## 11. Cost truth

Use this equation conceptually:

```
production_cost =
  API/credits
+ GPU compute
+ electricity
+ storage/egress
+ engineering
+ operator/QC time
+ licenses
+ failed generations
```

Automation should optimize **cost per accepted shot**, not cost per generation.

A cheap generation with a 5% acceptance rate may be more expensive than a premium model with a 70% acceptance rate.

Track:
- attempts per accepted shot;
- GPU/API cost per accepted second;
- human review minutes;
- failure category distribution.

## 12. Human QC gate

Nothing from an unattended queue goes directly to delivery.

Minimum automated checks may include:
- file exists and decodes;
- duration;
- dimensions/FPS;
- black/frozen frame detection;
- audio presence when expected;
- output hash.

Human/editorial checks include:
- identity;
- anatomy/artifacts;
- story action;
- camera;
- continuity;
- lip sync;
- text/logo correctness;
- audio quality;
- transition compatibility.

## 13. Licensing and commercial-use gate

Before monetized/client work, record the license for:
- base model;
- checkpoint;
- LoRA;
- identity adapter;
- face-recognition dependency;
- custom node;
- voice model;
- music/assets.

Do not infer commercial rights from "open source" or "runs locally."

## 14. Security

A local render stack may contain:
- arbitrary custom-node Python code;
- downloaded model files;
- API secrets;
- access to project media.

Rules:
- do not expose raw render endpoints publicly without authentication/reverse-proxy controls;
- do not store secrets in workflow JSON;
- pin vetted custom-node versions;
- sandbox unknown dependencies;
- back up accepted workflows before upgrades;
- upgrade between production batches, not mid-batch.

## 15. Strong production philosophy

The strongest insight from the post is not "ComfyUI" or "FaceID."

It is:

> **Turn creative intent into structured production data, then automate only the deterministic parts.**

Keep humans/agents responsible for:
- story;
- directing;
- shot selection;
- acceptance.

Automate:
- validation;
- reference lookup;
- workflow parameterization;
- queueing;
- rendering;
- metadata capture;
- technical checks;
- assembly helpers.

That separation produces a pipeline that can scale without converting model errors into hundreds of finished mistakes.
