# Hành Trình Của Dad

**Project ID:** VUF_DAD_001
**Format:** 2-minute editorial mini-documentary / paper-collage explainer
**Language:** Vietnamese
**Master:** 1920×1080 / 24fps / 2880 frames / 16:9
**Current stage:** VOX_V2_PREPRODUCTION_LOCKED_RENDER_DEFERRED
**Approved master:** none

## Active creative system: VOX Director V2

The active pre-render package was rebuilt from the installed repository skill:

`.agents/skills/vox-director/SKILL.md`

The V2 package supersedes the previous 19-scene creative/frame plan for **new implementation**.

Old V1 docs remain in Git for audit/rollback only.

### V2 design

```
origin story
→ 12 narrative beats
→ 2 shots per beat
→ 24 shots
→ 5 seconds / 120 frames per shot
→ 168 exact action ranges
→ 2880 deterministic frame records
```

Theme:

`humanist-newsprint-v2`

Visual language:
- premium newsprint/editorial paper collage;
- Swiss information hierarchy;
- real people as photographic stickers;
- strong negative space;
- one highlighter-yellow accent;
- paper motion on twos;
- one flat-safe camera move per shot;
- deterministic compositor typography.

## Canonical V2 source of truth

Read in this order:

1. `docs/31-VOX-V2-story-theme-motion.md`
2. `docs/32-VOX-V2-supervision-report.md`
3. `production/vox-v2/theme.json`
4. `production/vox-v2/beats.json`
5. `production/vox-v2/audio-cues.json`
6. `docs/33-VOX-V2-24-shot-prompts.md`
7. `production/vox-v2/shot-prompts.json`
8. `production/vox-v2/frame-actions.json`
9. `production/vox-v2/frame-index.json`
10. `production/vox-v2/frame-manifest.jsonl`
11. `docs/34-VOX-V2-MASTER-IMPLEMENTATION-PROMPT.md`

The machine-readable frame manifest contains exactly one record for every frame:

`VOXV2_F0000 → VOXV2_F2879`

## A → B → C validation

The rewrite is gated in three supervised passes:

### A — Story / beats

```bash
node scripts/validate-vox-v2.mjs A
```

Checks:
- facts;
- 12-beat story;
- 24-shot timing;
- narration density;
- hook;
- camera anti-monotony.

### B — Prompts / theme

```bash
node scripts/validate-vox-v2.mjs B
```

Checks:
- one locked style block;
- 24 image prompts;
- 24 motion prompts;
- C-roll face locks;
- transition handoffs;
- prompt structure.

### C — Every frame

```bash
node scripts/validate-vox-v2.mjs C
```

Checks:
- 168 action ranges;
- 2880 unique frames;
- exact frame coverage;
- exact camera state;
- deterministic paper pose;
- prompt references;
- opening fact lock;
- final motto.

Regenerate all V2 machine files with:

```bash
node scripts/build-vox-v2.mjs
```

## New story spine

```
Dad / Australia / Adelaide
→ “the story is not about kangaroos”
→ Dad + Sơ Nien / the student-finance question
→ 1996 Dad meets Đoàn Minh Nam
→ 1997 return / SunWay planning
→ first connection network
→ first 8 students
→ what support actually covers
→ Stevenson Scholarship Programme
→ Australia ↔ Vietnam operating bridge
→ growth 1997–2006
→ 2006 handoff + Viet Uc Family
→ unconditional / no repayment / no discrimination
→ help-forward principle
→ Dream. Believe. Do.
```

The old buffalo detour has been removed from V2 because it consumed hook time without advancing the factual spine.

## Fact lock

Dad Stevenson:
- Australian / người Úc;
- scholarship-origin context: Adelaide, South Australia.

Never establish Dad as:
- American;
- from America / USA / United States;
- Mỹ / Hoa Kỳ.

The website's future-dated 2027 / 1000+ statement is still held and must not be narrated as a current 2026 fact.

## Dad references

`assets/dad/reference-manifest.json`

- DAD_REF_02 = primary facial identity
- DAD_REF_01 = primary upper-body/editorial cutout

V2 rule:

**Dad is a photographic sticker, not an AI-painted character.**

## Archive

Full catalog:
- `assets/catalog/image_urls_descriptions.csv`
- `assets/catalog/image_catalog.json`

Approved/QC shortlist:
- `assets/catalog/selected_for_animatic.json`
- `docs/15-archive-shortlist-qc.md`

Recent archive may illustrate continuation/impact but must not be represented as period photography from 1996, 1997 or 2006.

## Audio

V2 audio contract:

`production/vox-v2/audio-cues.json`

- 24 independent narration cues;
- one cue per 5-second shot window;
- 48kHz mono PCM WAV target;
- global offset = 0;
- overflow fails only that cue;
- later cues never shift to compensate.

## Render status

The user asked to finish pre-render creative planning first.

Prepared:
- story;
- beat map;
- theme;
- motion grammar;
- 24 exact keyframe prompts;
- 24 exact motion prompts;
- transition grammar;
- 24 narration cues;
- 168 frame-action ranges;
- 2880 exact frame records;
- specialist supervision report;
- implementation master prompt.

Deferred:
- image generation;
- Remotion implementation;
- TTS synthesis;
- provider API calls;
- video rendering;
- final assembly.

## Legacy V1

Docs 00–30 and `production/remotion/` remain for provenance.

When V1 and V2 conflict, **V2 wins for all new implementation**.

The factual research/catalog material from V1 remains valid unless explicitly superseded.
