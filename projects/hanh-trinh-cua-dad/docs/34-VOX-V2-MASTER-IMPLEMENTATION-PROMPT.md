# 34 — VOX Director V2 Master Implementation Prompt

```text
Implement ONLY the canonical VOX V2 package for projects/hanh-trinh-cua-dad.

Read first:
1. AGENTS.md
2. .agents/skills/vox-director/SKILL.md
3. .agents/skills/vox-director/references/beat-layer.md
4. .agents/skills/vox-director/references/prompt-guide.md
5. projects/hanh-trinh-cua-dad/docs/31-VOX-V2-story-theme-motion.md
6. projects/hanh-trinh-cua-dad/docs/32-VOX-V2-supervision-report.md
7. projects/hanh-trinh-cua-dad/docs/33-VOX-V2-24-shot-prompts.md
8. projects/hanh-trinh-cua-dad/production/vox-v2/theme.json
9. projects/hanh-trinh-cua-dad/production/vox-v2/beats.json
10. projects/hanh-trinh-cua-dad/production/vox-v2/audio-cues.json
11. projects/hanh-trinh-cua-dad/production/vox-v2/shot-prompts.json
12. projects/hanh-trinh-cua-dad/production/vox-v2/frame-actions.json
13. projects/hanh-trinh-cua-dad/production/vox-v2/frame-index.json
14. projects/hanh-trinh-cua-dad/production/vox-v2/frame-manifest.jsonl

The V2 files supersede the older 19-scene creative/frame plan for new implementation.

Do not redesign or paraphrase the prompts.

Master:
1920x1080
24fps
2880 frames
120 seconds
12 beats
24 shots
120 frames per shot

Every rendered frame must match the corresponding VOXV2_Fxxxx record.

Narration must use production/vox-v2/audio-cues.json. There are 24 independent 48kHz WAV cues, one per 5-second shot window, global offset 0. A cue that runs long must be regenerated locally; never shift later cues.

Real Dad photographs remain photographic stickers; never redraw the face.

Critical text must be compositor text.

Do not generate fake historical photographs.

Do not use America/USA/Mỹ/Hoa Kỳ to establish Dad. Dad is Australian and the origin anchor is Adelaide, South Australia.

Build all 24 shots, not a sample.

Before full render:
- run: node scripts/build-vox-v2.mjs
- run: node scripts/validate-vox-v2.mjs A
- run: node scripts/validate-vox-v2.mjs B
- run: node scripts/validate-vox-v2.mjs C
- stop immediately if any gate fails;
- render 24 keyframe/hero review stills;
- render start/mid/end frame checks for all shots;
- render a 540p preview;
- stop for review before final-quality rendering.

Do not fall back to the older V1 frame manifest.
```
