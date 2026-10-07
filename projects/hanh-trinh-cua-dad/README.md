# Hành Trình Của Dad

**Project ID:** VUF_DAD_001  
**Working title:** *Dad Stevenson: định chinh phục Việt Nam, rồi Việt Nam chinh phục lại Dad*  
**Format:** 2-minute editorial mini-documentary / visual essay  
**Language:** Vietnamese  
**Target runtime:** 120 seconds  
**Master timeline:** 1920×1080 / 24fps / 16:9  
**Current stage:** PREPRODUCTION_LOCKED_RENDER_DEFERRED  
**Approved master:** none

## What is locked

The entire non-render production package is now defined:

- factual story spine;
- 2-minute screenplay;
- locked narration;
- directing treatment;
- shot list and critical shot cards;
- 19-board animatic specification;
- 120-second machine-readable animatic timeline;
- Dad identity references;
- 728-image archive catalog;
- 12-image visually QC'd shortlist;
- archive-to-shot mapping;
- sound plan;
- continuity rules;
- model routing;
- storage/env template;
- production manifest;
- QC and truth holds.

The render/upload worker is intentionally deferred by the project owner.

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

## Animatic

Human-readable:
- `docs/16-storyboard-animatic-spec.md`

Machine-readable:
- `production/animatic/animatic.json`

## Voice

Locked narration:
- `docs/17-voiceover-lock.md`

Preferred final 2 seconds:
Dad's real voice saying **“Dream. Believe. Do.”**

## Model routing

`docs/18-model-routing.md`

Primary AI video:
**Runway Gen-4.5 Image to Video**

Fallback:
**Google Veo 3.1**

Most factual shots use no AI video.

## Storage / secrets

Use:
`.env.example`

Never commit the real `.env`.

Heavy media remains outside normal Git.

## Truth hold

Do not present **“by 2027 over 1000 students”** as a current 2026 fact until clarified.

## Render status

Everything before execution/rendering is prepared.

Deferred:
- render worker;
- provider API calls;
- canonical media upload;
- final assembly/master export.

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
- `docs/FINAL-DIRECTOR-PACK.md`
