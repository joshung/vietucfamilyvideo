# Project Storage Contract

> Version: 1.0
> Applies to every video project under `projects/<project-slug>/`.

## 1. Purpose

This contract defines exactly:
- where project documents live;
- where reference assets live;
- where generated/captured media lives;
- where editing work lives;
- where approved final deliverables live;
- what belongs in GitHub;
- what must stay in external media storage;
- how selected takes and final masters are promoted and traced.

The goal is that any human or agent can answer, without guessing:

1. Where is the approved script?
2. Which shot take was selected?
3. Where is the selected media stored?
4. Which edit version is current?
5. Which file is the approved master?
6. Which files are safe to publish?
7. Which artifacts are tracked in Git vs external storage?

## 2. Canonical project tree

```
projects/<project-slug>/
  README.md
  project.json

  docs/
    00-brief.md
    01-research.md
    02-beat-sheet.md
    03-screenplay.md
    04-directors-treatment.md
    05-shot-list.md
    06-shot-cards.md
    07-continuity-bible.md
    08-paper-edit.md
    09-sound-plan.md
    10-ai-generation-plan.md
    11-qc-report.md
    FINAL-DIRECTOR-PACK.md

  assets/
    characters/
    locations/
    props/
    storyboard/
    references/
    audio/
    music/

  production/
    shots/
      <shot-id>/
        shot.json
        references/
        attempts/
        SELECT.json
    audio/
    lipsync/
    generations.json

  edit/
    proxies/
    timeline/
    v01/
    v02/
    review/

  final/
    masters/
    youtube/
    reels/
    tiktok/
    subtitles/
    thumbnails/
```

Create only folders that are actually needed.

## 3. Repository-wide docs vs per-project docs

Repository-wide rules and research live at root:

```
AGENTS.md
agents/
docs/
```

Examples:
- `docs/video-research.md`
- `docs/ai-production-pipeline.md`
- `docs/ai-video-short-clip-continuity.md`

Per-video decisions always live inside:

```
projects/<project-slug>/docs/
```

Never mix one video's screenplay or shot list into the repository-wide `docs/` folder.

## 4. What GitHub stores

GitHub is the source of truth for:
- text;
- decisions;
- metadata;
- schemas;
- prompts;
- workflow definitions;
- selection records;
- QC;
- reproducibility information;
- code.

Push by default:
- Markdown;
- JSON;
- YAML;
- small CSV;
- scripts;
- workflow JSON;
- prompt metadata;
- hashes;
- storage references;
- subtitles when small;
- small reference images only when intentionally approved for Git.

## 5. What normal Git should not store

Do not commit heavy production binaries to normal Git by default:

```
*.mp4
*.mov
*.mkv
*.avi
*.mxf
*.wav
*.aif
*.aiff
*.flac
large image sequences
camera RAW
large PSD/EXR/TIFF sequences
proxy caches
render caches
AI generation batches
delivery masters
```

These belong in approved media storage.

Git LFS may be used only by explicit project decision.

## 6. Media storage

Heavy media may live on:
- local project disk;
- VPS storage;
- NAS;
- S3-compatible object storage;
- cloud bucket;
- another documented media backend.

The project manifest must record the storage root/backend.

Example:

```json
{
  "media_storage": {
    "backend": "s3",
    "root": "s3://vietucfamilyvideo/projects/tet-dau-tien-o-uc/"
  }
}
```

or:

```json
{
  "media_storage": {
    "backend": "filesystem",
    "root": "/srv/media/vietucfamilyvideo/tet-dau-tien-o-uc/"
  }
}
```

Never assume a path is portable across machines. Store backend + root explicitly.

## 7. Shot media

Each shot gets one stable ID:

```
S01_SH01
S01_SH02
S02_SH01
```

Each attempt gets one stable attempt ID:

```
A01
A02
A03
```

An artifact ID should remain globally unambiguous within the project:

```
ART_S01_SH02_A03
```

Recommended external media layout:

```
<media-root>/
  production/
    shots/
      S01_SH02/
        attempts/
          S01_SH02_A01.mp4
          S01_SH02_A02.mp4
          S01_SH02_A03.mp4
```

The Git-tracked project folder stores metadata pointing to these files.

## 8. Do not rename the selected take to SELECT.mp4

Keep original attempt identity.

Wrong:

```
SELECT.mp4
```

Better:

```
S01_SH02_A03.mp4
```

and track selection in:

```
production/shots/S01_SH02/SELECT.json
```

Example:

```json
{
  "shot_id": "S01_SH02",
  "selected_attempt_id": "A03",
  "artifact_id": "ART_S01_SH02_A03",
  "storage_uri": "s3://.../S01_SH02_A03.mp4",
  "qc_status": "APPROVED",
  "selected_for": "editorial",
  "reason": "best face consistency and clean exit handle"
}
```

This prevents losing provenance.

## 9. Production state model

A media artifact moves through states:

```
CREATED
QC_PENDING
APPROVED
REJECTED
SELECTED_FOR_EDIT
USED_IN_EDIT
MASTER_APPROVED
DELIVERED
PURGED
```

Not every artifact visits every state.

A folder name does not replace state metadata.

## 10. Production folder

`production/` contains source material, never authoritative final delivery.

Examples:
- AI video attempts;
- still generations;
- live camera takes;
- voice renders;
- lip-sync passes;
- motion tests;
- temporary generated source clips.

A production artifact may be excellent and still not be approved.

## 11. Edit folder

`edit/` is always work in progress.

Use version folders:

```
edit/v01/
edit/v02/
edit/v03/
```

Each version should contain or reference:
- parent version;
- timeline/project file;
- review export;
- edit decision summary;
- reviewer status.

Recommended metadata:

```json
{
  "edit_version": "v03",
  "parent": "v02",
  "status": "REVIEW",
  "change_summary": [
    "shortened opening by 3.2s",
    "replaced S03_SH05 with attempt A04",
    "new music transition into scene 4"
  ]
}
```

## 12. Final folder

Only approved deliverables go into `final/`.

Authoritative master:

```
final/masters/<slug>_MASTER_vNN.mp4
```

Platform derivatives:

```
final/youtube/
final/reels/
final/tiktok/
final/subtitles/
final/thumbnails/
```

A platform version may differ editorially only if that difference is explicitly approved.

## 13. Never use ambiguous final filenames

Forbidden naming:

```
final.mp4
final2.mp4
final_final.mp4
latest.mp4
newfinal.mp4
```

Required pattern:

```
<project-slug>_<purpose>_vNN.<ext>
```

Examples:

```
tet-dau-tien-o-uc_MASTER_v03.mp4
tet-dau-tien-o-uc_YOUTUBE_16x9_v03.mp4
tet-dau-tien-o-uc_REELS_9x16_v02.mp4
```

## 14. Project README

Every active project should have:

```
projects/<slug>/README.md
```

Minimum content:

```
Title:
Project ID:
Current stage:
Approved script:
Approved director pack:
Current selected edit:
Approved master:
Media storage root:
Primary aspect ratio:
Target runtime:
Last major decision:
```

The README is the human entry point.

## 15. project.json

`project.json` is the machine entry point.

Minimum recommended shape:

```json
{
  "schema_version": "1.0",
  "project_id": "P001",
  "slug": "tet-dau-tien-o-uc",
  "title": "Tet dau tien o Uc",
  "stage": "EDIT",
  "approved_docs": {
    "screenplay": "docs/03-screenplay.md",
    "director_pack": "docs/FINAL-DIRECTOR-PACK.md"
  },
  "media_storage": {
    "backend": "filesystem",
    "root": "/srv/media/vietucfamilyvideo/tet-dau-tien-o-uc/"
  },
  "active_edit_version": "v03",
  "approved_master_artifact_id": null
}
```

## 16. Artifact metadata

Important external media should be represented by metadata including:

```
artifact_id
project_id
scene_id
shot_id
attempt_id
kind
storage_uri
filename
sha256
bytes
duration_seconds
fps
width
height
created_at
source_workflow_version
qc_status
```

Use null for unknown values. Do not invent them.

## 17. Source of truth

Order of authority:

1. `AGENTS.md`
2. `projects/<slug>/docs/FINAL-DIRECTOR-PACK.md`
3. other approved project docs
4. `project.json`
5. `shot.json` / `SELECT.json`
6. workflow/prompt metadata
7. raw renders

A render cannot override an approved creative decision by accident.

## 18. External storage failure

If a referenced media file is missing:
- do not silently regenerate;
- mark the artifact missing;
- inspect metadata and lineage;
- recover from backup if possible;
- regenerate only after confirming the exact source spec and version.

## 19. Backup policy

At minimum, protect:
- approved docs;
- project manifest;
- selected takes;
- edit timeline/project;
- approved master;
- artifact metadata.

Raw rejected attempts may have a lower retention tier.

## 20. Cleanup

Safe to clean more aggressively:
- caches;
- proxies that can be rebuilt;
- temp renders;
- rejected low-value attempts after retention period.

Protect:
- selected attempts;
- approved source recordings;
- approved voice assets;
- accepted workflows;
- project manifests;
- final masters.

When deleting tracked external media, mark it `PURGED` in metadata when useful.

## 21. Operational summary

```
repository docs/
    = shared rules/research

projects/<slug>/docs/
    = project decisions

projects/<slug>/assets/
    = approved inputs

projects/<slug>/production/
    = source material metadata + generation/take lineage

external media storage
    = heavy production binaries

projects/<slug>/edit/
    = active assemblies/reviews

projects/<slug>/final/
    = approved deliverables
```

If there is any ambiguity about where something belongs, decide based on its role:

- instruction/decision → `docs/`
- reusable input → `assets/`
- generated/captured source → `production/`
- work in progress assembly → `edit/`
- approved delivery → `final/`
