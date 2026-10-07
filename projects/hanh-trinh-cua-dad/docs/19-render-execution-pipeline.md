# 19 — Render Execution Pipeline — Dad Project

> Project: VUF_DAD_001
> Status: implementation handoff
> Render execution is not implemented in this documentation task.

## 1. Objective

Build an execution worker that can render only the shots that actually need generation, ingest outputs into project-owned storage, and preserve all lineage/QC metadata.

For this film, **do not treat all 19 boards as AI-generation jobs**.

## 2. Routing summary

### No AI-video generation required

Use editor/motion-graphics workflow:
- S01_SH01 — Dad real portrait intro;
- S02_SH01–S05_SH04 factual/history boards except fictional animal moments;
- maps;
- timelines;
- counters;
- typography;
- archive montage;
- end card.

### Primary AI candidates

**S01_SH02 — Kangaroo fictional gag**

Primary:
Runway Gen-4.5 Image to Video

Input:
an approved still composite containing:
- DAD_REF_01 cutout;
- stylized kangaroo;
- sports-poster layout;
- visible fictionalization label if embedded at compositing stage.

Recommended generation source duration:
6 seconds.

**S01_SH03 — Buffalo fictional gag**

Primary:
Runway Gen-4.5 Image to Video

Fallback:
Veo 3.1 or editor-driven animation.

Recommended generation source duration:
6–8 seconds.

### Optional only

S01_SH01 / S05_SH04 Dad photo micro-motion.

Default:
**do not generate**.

Only attempt if static/editor-driven movement feels insufficient and Dad identity remains stable.

## 3. Input-composite rule

Do not ask the video model to invent Dad and the entire composition at once.

Before I2V:
1. create the approved first-frame composition;
2. place the real Dad cutout/reference;
3. create/stylize animal/background;
4. lock framing;
5. send that image to I2V;
6. prompt mostly for motion.

The render worker should accept a `first_frame_asset_id`.

It should not be responsible for creative compositing unless explicitly implemented as a separate stage.

## 4. Exact generation prompt — S01_SH02

### Prompt ID

`PROMPT_S01_SH02_RUNWAY_V01`

### Mode

Image to Video.

### Prompt

```
The layered editorial collage comes subtly to life. Dad remains clearly recognizable and stable as a photo cutout. The kangaroo shifts its weight like an exaggerated boxing contender and gives one small confident bounce. Paper layers move with slight dimensional parallax. The camera makes a very gentle push in. The motion is playful and restrained, like a premium editorial explainer animation. No punch occurs. Dad's face stays stable and natural throughout. The shot ends in a readable settled pose with clean edit handles.
```

### Motion priorities

1. Dad face stability.
2. Kangaroo weight shift.
3. Gentle camera push.
4. Small paper-layer parallax.

### Reject if

- Dad face morphs;
- glasses change/disappear;
- realistic violent hit occurs;
- kangaroo anatomy becomes grotesque;
- composition drifts;
- text is regenerated/mutated by model.

### Implementation note

If text labels are important, add them **after generation in the editor**, not inside the model-generated moving image.

## 5. Exact generation prompt — S01_SH03

### Prompt ID

`PROMPT_S01_SH03_RUNWAY_V01`

### Mode

Image to Video.

### Prompt

```
A stylized retro-game editorial collage animates with minimal controlled motion. Dad remains a stable recognizable photo cutout. The calm buffalo slowly turns its head toward Dad and shifts one step of weight. Dad makes one small theatrical adjustment of his imaginary boxing stance. The camera performs a subtle slow push. Dust and paper textures move lightly. No fight begins. The motion settles into a frozen face-off composition suitable for a hard cut. Keep Dad's facial identity and glasses stable.
```

### Motion priorities

1. Dad identity.
2. Buffalo head/weight motion.
3. Dad one small gesture.
4. End in stable face-off.

### Reject if

- any fight/contact happens;
- Dad is regenerated as another person;
- limbs merge;
- buffalo moves unnaturally;
- shot cannot settle before cut.

## 6. Attempt policy

For S01_SH02:
- target attempts: 2;
- hard maximum without manual override: 4.

For S01_SH03:
- target attempts: 2;
- hard maximum without manual override: 4.

Do not burn all four attempts with identical prompt/input.

Iteration order:
1. same input, small motion-language correction;
2. simplify motion;
3. modify first-frame composition;
4. switch adapter/model only if necessary.

## 7. Expected job definitions

### Kangaroo

```json
{
  "job_id": "JOB_S01_SH02_A01",
  "shot_id": "S01_SH02",
  "attempt_id": "A01",
  "adapter": "runway",
  "model": "gen4.5",
  "mode": "image_to_video",
  "duration_seconds": 6,
  "ratio": "1280:720",
  "first_frame_asset_id": "COMP_S01_SH02_START",
  "prompt_id": "PROMPT_S01_SH02_RUNWAY_V01"
}
```

### Buffalo

```json
{
  "job_id": "JOB_S01_SH03_A01",
  "shot_id": "S01_SH03",
  "attempt_id": "A01",
  "adapter": "runway",
  "model": "gen4.5",
  "mode": "image_to_video",
  "duration_seconds": 8,
  "ratio": "1280:720",
  "first_frame_asset_id": "COMP_S01_SH03_START",
  "prompt_id": "PROMPT_S01_SH03_RUNWAY_V01"
}
```

## 8. Output storage

Canonical object layout:

```
projects/hanh-trinh-cua-dad/
  production/
    shots/
      S01_SH02/
        attempts/
          A01/
            source.mp4
            poster.jpg
            metadata.json
      S01_SH03/
        attempts/
          A01/
            source.mp4
            poster.jpg
            metadata.json
```

Repo stores manifests/metadata.

Heavy binaries remain in configured external storage.

## 9. Technical QC expectations

Runway source:
- expected 16:9;
- expected 720p dimensions according to current Gen-4.5 support;
- duration should match requested source duration within provider tolerance;
- video must decode.

Master editing timeline remains:
1920×1080 / 24fps.

Do not upscale until an attempt is selected.

## 10. Creative QC — Kangaroo

Score 0–2 each:
- Dad identity;
- clear fictional tone;
- animal motion;
- composition;
- editability;
- clean opening/closing handles.

Minimum recommendation:
- no category = 0;
- total ≥ 9/12.

Identity failure always rejects regardless of score.

## 11. Creative QC — Buffalo

Score 0–2 each:
- Dad identity;
- buffalo naturalness;
- no accidental fight;
- readable face-off;
- end settle;
- editability.

Same minimum:
≥9/12 and no identity blocker.

## 12. Selection

Selection metadata example:

```json
{
  "shot_id": "S01_SH02",
  "selected_attempt_id": "A02",
  "artifact_id": "ART_S01_SH02_A02_SOURCE",
  "qc_status": "APPROVED",
  "selected_for": "editorial",
  "reason": "Dad identity stable; kangaroo motion readable; clean end handle."
}
```

## 13. Archive/media acquisition

The worker may optionally implement an `assets fetch` command.

For selected archive URLs:
- download;
- verify existing recorded hash if available;
- upload to canonical storage;
- preserve original URL as source/acquisition URI;
- write durable storage URI.

Never regenerate missing archive with AI.

## 14. Dad reference acquisition

Current manifest has conversation file IDs and hashes but null durable URIs.

Execution system should allow a one-time registration/import:

```
assets import DAD_REF_01 <path-or-source>
assets import DAD_REF_02 <path-or-source>
```

After upload, update artifact registry/storage metadata without changing the semantic reference IDs.

## 15. Website

Website screenshot/capture is not a generative job.

Pipeline can expose:
`assets capture-web`

but if automated browser capture is not implemented, accept a manually supplied screenshot.

Never synthesize website text/logo.

## 16. Voice

Rendering video must not block on Dad's real motto recording.

Fallback is already defined:
narrator says `Dream. Believe. Do.`

Audio generation/provider integration is outside v1 unless the implementation agent chooses to add a clean adapter without delaying video execution.

## 17. Final assembly boundary

Render execution worker v1 stops after:
- selected generated clips exist;
- selected real assets exist in canonical storage;
- technical metadata/QC exist.

It does **not** need to implement the final NLE/edit unless separately requested.

## 18. Definition of done for this project

Implementation is successful when:
- dry-run plans exactly the intended AI shots and does not queue the factual boards;
- S01_SH02 and S01_SH03 can be generated independently;
- outputs survive provider URL expiry because they are ingested;
- duplicate command invocation does not duplicate spend;
- attempts are traceable;
- technical QC is automated;
- creative QC/selection is explicit;
- selected attempt can be handed to editor via `SELECT.json`.
