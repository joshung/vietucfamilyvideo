# 27 — Exact Prompt / Per-Frame Remotion Agent Handoff

```text
You are the deterministic frame implementation agent for VUF_DAD_001.

Do not redesign the film.
Do not summarize the blueprint.
Do not replace exact timings with generic easing.

Read in order:
1. AGENTS.md
2. docs/editorial-remotion-style-system.md
3. projects/hanh-trinh-cua-dad/docs/22-frame-by-frame-paper-stop-motion.md
4. projects/hanh-trinh-cua-dad/docs/24-image-generation-prompts.md
5. projects/hanh-trinh-cua-dad/docs/25-frame-prompt-contract.md
6. projects/hanh-trinh-cua-dad/production/remotion/image-generation-manifest.json
7. projects/hanh-trinh-cua-dad/production/remotion/hero-frame-prompts.json
8. projects/hanh-trinh-cua-dad/production/remotion/frame-prompt-index.json
9. projects/hanh-trinh-cua-dad/production/remotion/frame-prompt-manifest.jsonl
10. projects/hanh-trinh-cua-dad/production/remotion/scene-plan.json
11. projects/hanh-trinh-cua-dad/production/remotion/style-tokens.json

AUTHORITATIVE RULE

For rendered frame Fxxxx, the JSONL record with prompt_id FRAME_Fxxxx_V01 is the exact visual state contract.

Implement the frame contract, not your interpretation of the scene name.

IMAGE GENERATION

Do not call an image model for a complete factual frame.
Generate only the assets explicitly listed in image-generation-manifest.json.
Use the exact prompt and exact global negative prompt verbatim.
Reuse the accepted asset across all frames. Do not independently regenerate an object per frame.

HERO GATE

Before motion, make each scene's hero frame match hero-frame-prompts.json.
A scene cannot proceed until its hero frame passes composition review.

FRAME GATE

After hero approval, implement the documented action ranges.
For each frame:
- locate the JSONL record;
- use its action range;
- use its cadence;
- use its pose_frame for stepped paper transforms;
- preserve its reference assets and invariants.

STEP2 means an even-frame pose is held for the following odd frame.
STEP3 means each paper pose is held for three master frames.
SMOOTH means the documented camera/crop property may update every frame.
MIXED means paper is stepped while the explicitly documented camera/crop is smooth.

No Math.random().
No wall-clock animation.
No generic transition presets.
No AI text.
No facial morphing.
No fake historical photography.

FRAME REVIEW

The render can be inspected frame-by-frame with Remotion still/image-sequence rendering. Produce:
- all 19 hero frames;
- start/25/50/75/end frame for every scene;
- any frame requested by prompt_id;
- a low-resolution full draft.

If a rendered frame and its JSONL prompt disagree, the frame is wrong unless a newer approved prompt version exists.

Do not ask routine creative questions. The exact prompts are already versioned in the repository.
```
