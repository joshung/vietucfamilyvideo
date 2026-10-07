# Render Execution Pipeline — Repository-Wide Contract

> Version: 1.0
> Research baseline: 2026-10-07
> Owner: Agent 11 — Pipeline & Automation Engineer
> Scope: execution only. Creative intent remains owned by the approved project docs.

## 1. Purpose

This document defines how an approved project becomes rendered media without losing:
- creative intent;
- reproducibility;
- asset lineage;
- cost visibility;
- retry safety;
- QC state;
- storage ownership.

The execution pipeline must be replaceable across vendors.

The canonical project data must not become a Runway-, Veo-, ComfyUI-, or cloud-specific document.

## 2. Non-negotiable architecture

```
approved project docs
        ↓
canonical render plan
        ↓
preflight validation
        ↓
execution jobs
        ↓
provider adapter
        ↓
provider task
        ↓
temporary provider output
        ↓
immediate ingest
        ↓
technical QC
        ↓
canonical media storage
        ↓
creative QC
        ↓
SELECT.json
        ↓
editorial assembly
```

The provider output URL is **temporary acquisition media**.

The project's own storage URI is the canonical source.

## 3. Source-of-truth order

Execution code reads in this order:

1. `AGENTS.md`
2. project `FINAL-DIRECTOR-PACK.md`
3. project `project.json`
4. project `production/production-manifest.json`
5. project `production/animatic/animatic.json`
6. project `docs/*model-routing*.md`
7. per-shot execution JSON
8. provider adapter defaults

A provider adapter must never silently override a creative field.

## 4. Required pipeline stages

### Stage 0 — PRECHECK

Validate:
- project exists;
- schema versions supported;
- required docs exist;
- required reference assets have resolvable URIs;
- provider credentials are present;
- storage credentials are present;
- selected provider supports requested mode/ratio/duration;
- output storage is writable;
- ffmpeg/ffprobe are available if technical QC depends on them;
- no unresolved BLOCKER prohibits this shot.

Output:
`PRECHECK_PASS` or a structured error.

### Stage 1 — PLAN

Convert the project shot plan into explicit render jobs.

The planner may:
- normalize defaults;
- choose execution adapter according to model-routing docs;
- create attempt IDs;
- resolve reference IDs to URIs.

The planner may not:
- rewrite the story;
- change intended action;
- replace Dad with a synthetic person;
- invent historical imagery;
- remove factual disclaimers.

### Stage 2 — MATERIALIZE INPUTS

For each job:
- fetch required reference asset;
- verify hash when known;
- convert to a provider-supported upload/input representation;
- produce signed/public temporary input URL only when necessary;
- never expose private long-lived credentials.

Input materialization must be deterministic and logged.

### Stage 3 — SUBMIT

Submit to provider.

Record:
- provider;
- provider model;
- provider API version when exposed;
- request body after secret redaction;
- provider task ID;
- submission timestamp;
- cost estimate if available.

### Stage 4 — WAIT

Baseline implementation: polling.

Optional later implementation: webhook/event callback.

Polling must:
- use bounded intervals/backoff;
- have overall timeout;
- survive process restart through persisted task IDs;
- not create a new generation merely because status polling failed.

### Stage 5 — ACQUIRE OUTPUT

When provider succeeds:
1. download provider output immediately;
2. verify non-zero bytes;
3. compute SHA-256;
4. run technical media inspection;
5. persist acquisition metadata.

Never leave an accepted result dependent only on a provider CDN URL.

### Stage 6 — TECHNICAL QC

Minimum checks:
- media decodes;
- expected media type;
- duration within tolerance;
- dimensions/aspect ratio acceptable;
- FPS readable;
- no zero-byte output;
- no obviously truncated file;
- optional black/frozen frame detection;
- audio state matches expectation.

Technical QC does **not** decide if Dad looks correct or if the joke is good.

### Stage 7 — CANONICAL STORAGE

Upload the successfully acquired artifact to configured media storage.

Canonical path recommendation:

```
<storage-root>/
  projects/<slug>/
    production/
      shots/<shot-id>/
        attempts/<attempt-id>/
          source.mp4
          poster.jpg
          metadata.json
```

After upload:
- verify remote object exists;
- store canonical URI;
- keep SHA-256;
- only then allow local temp cleanup.

### Stage 8 — CREATIVE QC

Human/agent review decides:
- identity;
- motion;
- camera;
- action;
- continuity;
- artifacts;
- edit handles;
- story fit.

Result:
- `APPROVED`
- `REJECTED`
- `NEEDS_REVIEW`

Do not auto-approve generated video solely from technical checks.

### Stage 9 — SELECT

An approved attempt can be selected for editorial.

Write:

`production/shots/<shot-id>/SELECT.json`

Selection must preserve original attempt identity.

### Stage 10 — EDIT HANDOFF

Editor reads only approved/selected sources by default.

Rejected attempts remain available for traceability but are not normal editorial inputs.

## 5. Job state machine

Required states:

```
PLANNED
PRECHECK_FAILED
VALIDATED
MATERIALIZING
QUEUED
SUBMITTED
RUNNING
SUCCEEDED_PROVIDER
ACQUIRING
TECH_QC_PENDING
TECH_QC_FAILED
STORED
CREATIVE_QC_PENDING
APPROVED
REJECTED
FAILED_RETRYABLE
FAILED_FINAL
CANCELLED
```

State transitions must be persisted.

Never infer state only from whether a file exists.

## 6. Canonical render job schema

Minimum:

```json
{
  "schema_version": "1.0",
  "job_id": "JOB_S01_SH02_A01",
  "project_id": "VUF_DAD_001",
  "shot_id": "S01_SH02",
  "attempt_id": "A01",
  "status": "PLANNED",
  "execution": {
    "adapter": "runway",
    "mode": "image_to_video",
    "model": "gen4.5",
    "duration_seconds": 6,
    "ratio": "1280:720",
    "fps_target": 24
  },
  "inputs": {
    "reference_asset_ids": ["DAD_REF_01", "COMP_S01_SH02_START"],
    "prompt": "...",
    "first_frame_asset_id": "COMP_S01_SH02_START"
  },
  "dependencies": [],
  "policy": {
    "max_attempts_for_shot": 4,
    "timeout_seconds": 1800,
    "auto_select": false
  }
}
```

## 7. Attempt identity

Use:

```
A01
A02
A03
...
```

Job:

```
JOB_<shot-id>_<attempt-id>
```

Artifact:

```
ART_<shot-id>_<attempt-id>_SOURCE
```

Provider task IDs are metadata, not internal primary keys.

## 8. Idempotency

Compute an execution fingerprint from normalized:
- project ID;
- shot ID;
- attempt ID;
- provider;
- model;
- mode;
- duration;
- ratio;
- prompt;
- input asset hashes/IDs;
- critical generation settings.

If the exact same job is submitted twice:
- return/reuse the persisted task/result when safe;
- do not silently spend credits twice.

A deliberate new generation requires a new attempt ID or explicit `--force-new-attempt`.

## 9. Retry policy

### Automatically retryable

Examples:
- network timeout;
- 429 / rate limit;
- provider temporary 5xx;
- temporary storage failure;
- transient download failure.

Use bounded exponential backoff with jitter.

### Retry after adaptation

Examples:
- unsupported duration;
- bad input format;
- prompt length/validation error;
- provider-specific parameter error.

Fix configuration before retry.

### Never blind-retry

Examples:
- Dad identity drift;
- wrong composition;
- incorrect motion;
- distorted body;
- ugly morph;
- bad comedy timing.

These require a changed creative/execution variable and a new attempt.

## 10. Concurrency

Default safe starting concurrency:

```
RENDER_CONCURRENCY=2
```

Allow override.

Limit separately:
- generation submissions;
- provider polling;
- downloads;
- storage uploads.

A single global promise pool is acceptable for v1, but architecture should permit provider-specific limits later.

## 11. Cost controls

Before submit, estimate cost when the provider exposes enough information.

Record:
- estimated generation cost;
- actual provider usage if returned;
- attempts per shot;
- accepted cost per shot;
- accepted cost per final second.

Hard controls:
- maximum attempts per shot;
- optional project cost ceiling;
- no infinite retry loops.

If cost ceiling would be crossed:
`FAILED_FINAL: COST_BUDGET_EXCEEDED`
unless explicitly overridden.

## 12. Storage adapters

Required v1:

### S3-compatible / Cloudflare R2

Interface:
- `put`
- `get`
- `head`
- `delete`
- optional `signedUrl`

Configuration comes from environment.

### Google Drive mirror

Optional mirror, intended for:
- selected shots;
- review cuts;
- final outputs.

Do not make Drive the render worker's only canonical storage implementation if object storage is configured.

## 13. AI provider adapters

Adapter interface:

```ts
interface VideoProvider {
  validate(job): Promise<ValidationResult>
  submit(job, materializedInputs): Promise<ProviderTask>
  getStatus(providerTaskId): Promise<ProviderTaskStatus>
  getOutput(providerTaskId): Promise<ProviderOutput>
  cancel?(providerTaskId): Promise<void>
}
```

Required v1:
- `RunwayProvider`

Recommended v1.1/fallback:
- `VeoProvider`

Provider code must be isolated from canonical schemas.

## 14. Runway implementation notes

Current official Runway API quickstart supports Gen-4.5 image-to-video using:
- model `gen4.5`;
- `promptImage`;
- `promptText`;
- ratio such as `1280:720`;
- duration;
- asynchronous task output.

Official docs:
https://docs.dev.runwayml.com/guides/using-the-api/
https://dev.runwayml.com/endpoints/image_to_video

As of the research baseline, Gen-4.5 supports 2–10 second durations and 16:9 1280×720 for Image to Video.

Do not hard-code this forever. Provider validation should be versioned/configurable.

Credential:
prefer the official SDK's expected environment variable/config mechanism.

Never log the API secret.

## 15. Veo implementation notes

Veo is fallback/endpoint-control for this project.

Before implementing, the execution agent must re-check the current official Vertex AI / Google model documentation for:
- model ID;
- auth method;
- region;
- supported duration;
- image/reference inputs;
- output polling;
- GCS/storage requirements.

Do not copy a stale endpoint from an old blog post.

## 16. Technical media QC implementation

Use ffprobe where available.

Capture:
- codec;
- duration;
- width;
- height;
- avg/r frame rate;
- audio streams;
- pixel format when useful.

Suggested tolerances:
- duration: requested duration ± provider/documented tolerance;
- ratio: exact or within known provider dimensions;
- FPS: accept provider-native FPS, then normalize during edit if necessary.

Do not transcode source immediately unless required.

Preserve original provider output.

## 17. Logging

Structured JSON logs.

Every log line should contain where applicable:
- timestamp;
- level;
- project_id;
- shot_id;
- attempt_id;
- job_id;
- provider;
- provider_task_id;
- event;
- error_class.

Never log:
- secret keys;
- bearer tokens;
- service-account JSON;
- signed URLs with long-lived sensitive query data.

## 18. Checkpointing / restart safety

All state required to resume must persist outside process memory.

After a crash, command:

```
render resume
```

should be able to:
- find SUBMITTED/RUNNING jobs;
- poll existing provider task IDs;
- continue acquisition/storage;
- not create duplicate generations.

## 19. Required CLI surface

Exact command names may vary, but v1 must expose equivalent functions:

```
render preflight <project>
render plan <project>
render status <project>
render shot <project> <shot-id>
render pending <project>
render resume <project>
render ingest <job-id>
render qc-tech <job-id>
render select <project> <shot-id> <attempt-id>
render retry <job-id>
render cancel <job-id>
```

All mutating commands support `--dry-run` where meaningful.

## 20. Dry-run rule

Default first execution in a new environment should be dry-run.

Dry-run:
- loads env presence without printing secret values;
- validates provider/storage config;
- validates jobs;
- resolves inputs;
- prints planned cost/operations;
- makes no billable generation call;
- uploads nothing unless explicitly testing storage with a tiny fixture.

## 21. Tests

Required:

### Unit
- schema validation;
- ID generation;
- fingerprint/idempotency;
- retry classification;
- storage-path construction;
- secret redaction;
- provider request mapping.

### Integration with mocks
- submit → poll → succeed → download → hash → store;
- transient failure → retry;
- restart/resume;
- duplicate invocation → no duplicate spend;
- technical QC failure;
- storage failure after provider success.

### Optional live smoke
Only with explicit environment flag:
`ALLOW_BILLABLE_SMOKE_TEST=true`

Use one short/cheap disposable test.

Never make billable tests part of default CI.

## 22. Security

- real `.env` never committed;
- credentials not embedded in JSON;
- signed URLs expire;
- temp files have bounded lifetime;
- provider input upload access is minimum necessary;
- logs redact auth;
- service account permissions are least privilege;
- auto-publish remains false.

## 23. Definition of done

The render execution implementation is done when it can:

1. load this repository's Dad project;
2. build valid jobs from the locked animatic/model routing;
3. dry-run without billable calls;
4. submit a Runway I2V job when credentials are available;
5. resume/poll without duplicate generation;
6. download provider output;
7. run ffprobe technical QC;
8. hash and upload to canonical S3/R2 storage;
9. persist provider + artifact lineage;
10. queue the result for creative QC;
11. write/select `SELECT.json` only through explicit approval;
12. survive a process restart;
13. never expose secrets;
14. never auto-publish.

## 24. Anti-goals

Do not:
- rewrite screenplay;
- generate every shot simply because an API exists;
- fake historical archive;
- auto-select based only on provider success;
- auto-publish;
- store large binaries in normal Git;
- retry creative failures endlessly;
- use provider CDN URLs as permanent storage;
- silently overwrite approved attempts.
