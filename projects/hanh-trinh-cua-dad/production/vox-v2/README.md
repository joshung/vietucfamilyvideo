# VOX V2 Production Package

This directory is the canonical machine-readable pre-render package for VUF_DAD_001.

## Build

```bash
node scripts/build-vox-v2.mjs
```

## Validate in supervised order

```bash
node scripts/validate-vox-v2.mjs A
node scripts/validate-vox-v2.mjs B
node scripts/validate-vox-v2.mjs C
```

All three must pass.

## Files

- `vox-v2-source.json` — canonical authored source for the rewrite.
- `theme.json` — locked humanist-newsprint-v2 visual system.
- `beats.json` — 12 beats / 24 shots / narration.
- `audio-cues.json` — 24 exact shot-window narration cues.
- `shot-prompts.json` — 24 keyframe image prompts + 24 motion prompts.
- `frame-actions.json` — 168 action ranges.
- `frame-manifest.jsonl` — one exact state record per frame, F0000–F2879.
- `frame-index.json` — counts and SHA-256.

## Authority

For new implementation, this package supersedes the older `production/remotion/` creative/frame plan.

Do not mix V1 and V2 timing.
