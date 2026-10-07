# Hành Trình Của Dad

**Project ID:** VUF_DAD_001  
**Working title:** *Dad Stevenson: định chinh phục Việt Nam, rồi Việt Nam chinh phục lại Dad*  
**Format:** 2-minute editorial mini-documentary / paper-stop-motion visual essay  
**Language:** Vietnamese  
**Target runtime:** 120 seconds  
**Master timeline:** 1920×1080 / 24fps / 2880 frames / 16:9  
**Current stage:** PREPRODUCTION_LOCKED_RENDER_DEFERRED  
**Approved master:** none

## Visual production model

This project is now locked as:

**Remotion editorial documentary + deterministic paper stop-motion.**

The rule is:

```
design the still
→ define paper layers
→ define exact poses/keyframes
→ animate stepped paper motion
→ compose in Remotion
→ insert optional AI motion only where useful
```

AI does not control the timeline.

## What is locked

- factual story spine;
- 2-minute screenplay;
- locked narration;
- directing treatment;
- 19-scene animatic;
- exact 2880-frame master timeline;
- frame-by-frame paper-motion blueprint;
- transition chain between every adjacent scene;
- Remotion style tokens;
- Dad identity references;
- 728-image archive catalog;
- 12-image visually QC'd shortlist;
- sound plan;
- model routing;
- render execution architecture;
- Remotion implementation handoff prompt;
- storage/env contract;
- QC and truth holds.

## Primary frame-by-frame spec

Read this before implementing motion:

`docs/22-frame-by-frame-paper-stop-motion.md`

It accounts for the complete frame range:

`F0000 → F2879`

and specifies:
- exact layer actions;
- coordinates;
- frame ranges;
- stepped cadence;
- holds;
- transitions;
- hero frames.

## Paper stop-motion system

Repository-wide rule:

`/docs/editorial-remotion-style-system.md`

Reference breakdown:

`docs/21-reference-style-breakdown.md`

Machine-readable tokens:

`production/remotion/style-tokens.json`

Scene timeline:

`production/remotion/scene-plan.json`

Implementation-agent prompt:

`docs/23-remotion-implementation-handoff-prompt.md`

## Story lock

```
Dad / Australia
→ fictional kangaroo
→ fictional buffalo
→ Adelaide scholarship idea
→ 1996 meet Đoàn Minh Nam
→ 1997 return / scholarship planning
→ first 8 students
→ Stevenson Scholarship Programme
→ growth 1997–2006
→ 2006 Viet Uc Family
→ support / belief / hope / no repayment
→ Dream – Believe – Do
```

## Dad references

`assets/dad/reference-manifest.json`

- DAD_REF_02 = primary facial identity
- DAD_REF_01 = upper-body/editorial cutout

## Archive

Complete owner-supplied catalog:
- `assets/catalog/image_urls_descriptions.csv`
- `assets/catalog/image_catalog.json`

Visual-QC shortlist:
- `assets/catalog/selected_for_animatic.json`
- `docs/15-archive-shortlist-qc.md`

## Render execution

General:
- `/docs/render-execution-pipeline.md`

AI-shot execution:
- `docs/19-render-execution-pipeline.md`
- `docs/20-render-agent-handoff-prompt.md`

Remotion master assembly:
- `docs/23-remotion-implementation-handoff-prompt.md`

Only S01_SH02 and S01_SH03 may use optional AI-video source layers.

The master must render without AI video.

## Truth hold

Do not present **“by 2027 over 1000 students”** as a current 2026 fact until clarified.

## Render status

Creative and deterministic motion specifications are prepared.

Deferred:
- Remotion implementation code;
- provider API execution;
- final media assembly/export.

## Core docs

- `docs/00-brief.md`
- `docs/01-research.md`
- `docs/02-beat-sheet.md`
- `docs/03-screenplay.md`
- `docs/04-directors-treatment.md`
- `docs/05-shot-list.md`
- `docs/06-shot-cards.md`
- `docs/07-continuity-bible.md`
- `docs/08-paper-edit.md`
- `docs/09-sound-plan.md`
- `docs/10-ai-generation-plan.md`
- `docs/11-qc-report.md`
- `docs/12-image-asset-catalog.md`
- `docs/13-asset-to-shot-map.md`
- `docs/14-production-readiness.md`
- `docs/15-archive-shortlist-qc.md`
- `docs/16-storyboard-animatic-spec.md`
- `docs/17-voiceover-lock.md`
- `docs/18-model-routing.md`
- `docs/19-render-execution-pipeline.md`
- `docs/20-render-agent-handoff-prompt.md`
- `docs/21-reference-style-breakdown.md`
- `docs/22-frame-by-frame-paper-stop-motion.md`
- `docs/23-remotion-implementation-handoff-prompt.md`
- `docs/FINAL-DIRECTOR-PACK.md`
