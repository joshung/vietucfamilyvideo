# 20 — Render Execution Agent Handoff Prompt

## Purpose

Copy the prompt below into the coding agent that will implement render execution.

The prompt is intentionally explicit so the agent can work without re-asking architectural questions.

---

## COPY-PASTE PROMPT

```text
You are the Render Execution / Pipeline Engineer for the repository VietUcFamilyVideo.

Your task is to IMPLEMENT the render execution pipeline for the existing project:

projects/hanh-trinh-cua-dad/

Do not redesign the story. Do not rewrite the screenplay. Do not change the approved creative direction unless an execution requirement makes the current spec technically impossible; in that case record the issue and choose the documented fallback.

FIRST, read these files in order:

1. AGENTS.md
2. agents/11-pipeline-automation.md
3. docs/render-execution-pipeline.md
4. docs/ai-production-pipeline.md
5. docs/ai-video-short-clip-continuity.md
6. projects/hanh-trinh-cua-dad/README.md
7. projects/hanh-trinh-cua-dad/project.json
8. projects/hanh-trinh-cua-dad/docs/10-ai-generation-plan.md
9. projects/hanh-trinh-cua-dad/docs/11-qc-report.md
10. projects/hanh-trinh-cua-dad/docs/15-archive-shortlist-qc.md
11. projects/hanh-trinh-cua-dad/docs/16-storyboard-animatic-spec.md
12. projects/hanh-trinh-cua-dad/docs/17-voiceover-lock.md
13. projects/hanh-trinh-cua-dad/docs/18-model-routing.md
14. projects/hanh-trinh-cua-dad/docs/19-render-execution-pipeline.md
15. projects/hanh-trinh-cua-dad/production/animatic/animatic.json
16. projects/hanh-trinh-cua-dad/production/production-manifest.json
17. .env.example

PROJECT INTENT

This is a 2-minute hybrid editorial mini-documentary.

Most shots are real archive + maps + typography and MUST NOT be sent to an AI video model.

The primary AI generation targets are:
- S01_SH02: fictional Dad vs kangaroo editorial collage.
- S01_SH03: fictional Dad vs buffalo editorial collage.

Optional Dad portrait motion is disabled by default.

The factual history must never be turned into fake photoreal archival footage.

IMPLEMENTATION LANGUAGE

Use TypeScript on Node.js 20+ unless the repository already contains a clearly established runtime by the time you begin.

Prefer:
- TypeScript strict mode;
- explicit schemas;
- small provider/storage interfaces;
- structured JSON logs;
- Vitest or equivalent for unit/integration tests.

Do not introduce a heavy framework unless it materially reduces complexity.

REQUIRED ARCHITECTURE

Create these conceptual layers:

1. domain/
   Canonical project/render-job/artifact/QC types and schemas.

2. planning/
   Load project files and create render jobs.

3. providers/
   VideoProvider interface.
   Implement RunwayProvider v1.
   Define VeoProvider boundary; implement it if credentials/docs make it straightforward without destabilizing v1.

4. storage/
   MediaStorage interface.
   Implement S3-compatible/R2 storage v1.
   Optional Google Drive mirror adapter can be implemented after canonical storage works.

5. queue/
   Persisted job state, retries, idempotency and resume.

6. ingest/
   Provider output download, hashing, metadata extraction.

7. qc/
   Automated technical QC using ffprobe/ffmpeg where available.
   Creative QC remains explicit/manual/agent-approved.

8. cli/
   Commands for preflight, plan, status, shot render, pending render, resume, retry, cancel, technical QC and select.

9. tests/
   Unit + mock integration tests.

DO NOT couple provider-specific fields into the creative screenplay/animatic schema.

RUNWAY V1

Use current official Runway API/SDK documentation at implementation time.

At the current project research baseline, the official API supports Gen-4.5 Image to Video with fields conceptually equivalent to:
- model: gen4.5
- prompt image
- prompt text
- ratio: 1280:720
- duration

Do not blindly copy stale endpoint/version strings from project docs. Re-check official docs before coding the adapter.

Credential must come from environment.
Never print it.

RUNWAY SHOTS

Implement exact prompt IDs from:
projects/hanh-trinh-cua-dad/docs/19-render-execution-pipeline.md

S01_SH02:
PROMPT_S01_SH02_RUNWAY_V01
recommended source duration: 6s

S01_SH03:
PROMPT_S01_SH03_RUNWAY_V01
recommended source duration: 8s

The execution layer should reference prompts by ID and store the exact prompt used in attempt metadata.

INPUT COMPOSITES

Do not ask the provider to invent Dad from text.

Both AI shots expect approved first-frame composites.

Support a required first_frame_asset_id.

If the composite is missing:
- fail preflight for that job;
- do not substitute an invented image.

IDENTITY

DAD_REF_02 is primary face identity reference.
DAD_REF_01 is primary cutout reference.

Dad identity drift is a creative QC blocker.

Do not auto-approve based on technical success.

JOB MODEL

Persist at least:
- schema_version
- project_id
- shot_id
- attempt_id
- job_id
- status
- adapter
- model
- mode
- prompt ID + exact prompt
- input asset IDs/hashes/URIs
- duration
- ratio
- created/submitted/started/completed timestamps
- provider task ID
- retry_count
- timeout
- error class
- output artifact IDs
- estimated/actual cost fields where available

JOB STATES

Support:
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

IDEMPOTENCY

Compute an execution fingerprint from the normalized job + input hashes.

Running the same command twice must not silently submit a second billable generation.

A deliberate new attempt requires a new attempt ID or explicit force flag.

RESUME

Provider task IDs and state must persist.

After process restart, resume must poll the existing task rather than resubmit.

STORAGE

Use .env.example as the configuration contract.

Canonical storage v1:
S3-compatible / Cloudflare R2.

Required env concepts:
MEDIA_STORAGE_PROVIDER
MEDIA_STORAGE_ROOT
S3_ENDPOINT
S3_BUCKET
S3_REGION
S3_ACCESS_KEY_ID
S3_SECRET_ACCESS_KEY

Google Drive is optional review/final mirror.

Do not commit the real .env.

Provider outputs are temporary acquisition sources.

On success:
1. download immediately;
2. compute SHA-256;
3. ffprobe;
4. upload to canonical media storage;
5. verify upload;
6. persist canonical URI;
7. only then cleanup temp file.

CANONICAL STORAGE PATH

Use this shape:

projects/<slug>/production/shots/<shot-id>/attempts/<attempt-id>/

Store:
source.mp4
poster.jpg when generated
metadata.json

The repo itself stores lightweight manifests/SELECT.json, not heavy source media.

TECHNICAL QC

Automate:
- decode/readability
- nonzero bytes
- duration
- dimensions
- FPS
- streams
- hash
- obvious truncation

Do not try to algorithmically decide Dad identity in v1.

CREATIVE QC

Result remains:
NEEDS_REVIEW / APPROVED / REJECTED

Only explicit approval can create/update SELECT.json.

Never auto-select.

RETRY

Auto-retry only transient failures:
- network
- 429
- temporary 5xx
- transient storage problem

Bound attempts and backoff.

Do not blindly retry identity drift or bad motion.

DEFAULT MAX ATTEMPTS PER AI SHOT

4

DEFAULT RENDER CONCURRENCY

2

DRY RUN

Implement dry-run and use it as the default first test.

Dry-run must:
- load project
- validate configuration presence without exposing values
- build exact job plan
- show which shots will be generated
- show which boards are NOT AI jobs
- resolve required asset IDs
- estimate operations/cost when possible
- make no billable call

CLI

Provide equivalent commands:

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

Exact executable/package name may differ.

TESTS

Write tests before live provider calls.

Required mock integration scenarios:
1. submit -> running -> success -> download -> hash -> ffprobe -> store -> creative QC pending
2. transient provider error -> retry
3. process restart -> resume existing task
4. duplicate invocation -> no duplicate billable submission
5. provider success but download transient failure -> reacquire same output
6. provider success + technical QC failure
7. canonical storage temporary failure
8. selection writes SELECT.json and preserves original attempt identity
9. secret values never appear in structured logs

No billable provider test runs by default.

Require explicit:
ALLOW_BILLABLE_SMOKE_TEST=true

SECURITY

Never:
- log API keys
- commit .env
- embed secrets in workflow JSON
- auto-publish
- expose raw storage credentials
- use permanent public URLs when signed/private access is sufficient

DOCUMENTATION

When finished:
- update project README with exact commands
- add an operations runbook
- document local setup
- document dry-run output
- document live smoke-test procedure
- document recovery/resume
- document common failure classes
- document how to add another provider adapter

Do not mark final video as rendered unless a real render has occurred.

DEFINITION OF DONE

Do not stop at scaffolding.

The implementation is done only when:
- tests pass
- dry-run works against this Dad project
- it plans only intended AI shots
- Runway adapter is functional when credentials are supplied
- resume/idempotency are functional
- provider output ingestion is implemented
- technical QC is implemented
- R2/S3 storage is implemented
- artifact lineage is persisted
- explicit selection is implemented
- no secret leakage exists
- docs/runbook are complete

If a detail is not specified, choose the simplest reliable implementation consistent with AGENTS.md and document the decision.

Do not ask the project owner routine implementation questions. Make reasonable engineering choices, document them, and proceed. Only stop for a true external blocker such as unavailable credentials required for a live billable test.
```

---

## Expected first response from the implementation agent

A good agent should first:
1. summarize the architecture it found;
2. inspect the repo/runtime;
3. propose a small implementation plan;
4. start coding;
5. run non-billable tests/dry-run;
6. report actual blockers only.

It should not spend a full turn re-asking decisions already captured above.
