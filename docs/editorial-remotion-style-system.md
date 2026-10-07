# Editorial Remotion + Paper Stop-Motion Style System

> Version: 1.0
> Research baseline: 2026-10-07
> Purpose: deterministic editorial-documentary motion language for VietUcFamilyVideo.

## 1. Core production rule

**Build the frame first. Then move it.**

Do not start by prompting a video model to "make a Vox-style scene".

For every scene:

1. design one strong hero still;
2. define the physical paper layers;
3. define which layers are allowed to move;
4. define exact pose/keyframe states;
5. define the paper-motion cadence;
6. define camera motion separately;
7. define transition in/out;
8. only then implement Remotion or optional AI motion.

This follows the useful YouMind workflow idea that a reusable Skill should preserve a tested visual method, and the YouMind B-roll guidance to build the shot before it moves.

Primary owner reference:
https://youmind.com/skills/paper-stop-motion-animation-generator-YD5b9Nk3s4of7w

Related owner references:
- https://www.behance.net/gallery/221556905/VOX-Style-Animated-Documentary-The-History-of-Porsche
- https://www.youtube.com/watch?v=E7mSfihvjCQ
- https://www.youtube.com/shorts/Wvxf1GfCLS0

## 2. Master timing

Master composition:
- 1920×1080;
- 24fps;
- exactly 2880 frames;
- exactly 120 seconds.

### Paper cadence

Paper layers animate primarily **on twos**:

```
pose_frame = floor(frame / 2) * 2
```

This gives a tactile 12-pose-per-second cadence while the master remains 24fps.

Use **on threes** selectively for:
- comic hesitation;
- a heavy paper card landing;
- freeze/hold before a punchline.

Do not animate paper cutouts with continuously smooth 24fps Bézier motion by default.

### Camera cadence

Camera/push/zoom may remain continuous at 24fps.

This contrast is intentional:
- paper = stepped;
- camera = controlled/smooth;
- typography = mostly stepped or short ease;
- grain/shadow = stable, not noisy random flicker.

## 3. Physical paper model

Every paper scene should feel assembled from actual layers.

For each layer define:
- material;
- cut edge;
- z-order;
- cast shadow;
- anchor point;
- translation;
- rotation;
- scale;
- entrance direction.

Default material families:
- warm construction paper;
- archival cream paper;
- matte black card;
- yellow highlighter paper strip;
- photo print;
- photocopy/newspaper fragment.

### Edge language

Allowed:
- slightly rough cut edge;
- 1–3px fiber irregularity at 1080p;
- small misalignment between paper pieces;
- tiny print-registration offset in comedy scenes.

Avoid:
- perfectly smooth vector-looking silhouettes everywhere;
- giant fake torn edges;
- uniform procedural noise that makes faces dirty.

### Shadow language

Default light:
top-left / slightly frontal.

Paper-card shadow:
- Y offset: 8–14px;
- X offset: 3–8px;
- blur: 8–16px;
- opacity: 0.18–0.28.

The shadow should move with the paper layer.

## 4. Stop-motion jitter

Jitter is **authored**, not random.

Use a deterministic repeating micro-pattern, for example:

```
pose 0: x 0,   y 0,  rot 0
pose 1: x +2,  y -1, rot +0.25deg
pose 2: x +1,  y +1, rot -0.20deg
pose 3: x -1,  y 0,  rot +0.15deg
pose 4: x 0,   y -1, rot 0
```

Maximum normal jitter:
- position ±3px;
- rotation ±0.35°;
- scale ±0.003.

Use less on Dad's face and factual archive.

Never use `Math.random()` during render.

## 5. Motion vocabulary

### CUTOUT_SLIDE
Paper card slides into frame in 4–8 stepped poses.

### HAND_PLACE
Looks like a paper element has been placed by hand:
small translate + rotation correction + settle.

### PAPER_POP
2–4 stepped poses:
0.92 → 1.03 → 1.00.

### HIGHLIGHT_SWIPE
Yellow strip grows left→right over 10–14 frames.
May be smooth or stepped every 2 frames.

### ROUTE_DRAW
SVG route draws continuously or in short 2-frame increments.
Map itself remains stable.

### PHOTO_DRIFT
Camera crop moves 1.00→1.03 scale smoothly.
The photo/card itself stays physically stable.

### CUTOUT_NOD
Character/photo cutout tilts 1–2° over 2–3 poses.
Never deform the face.

### CARD_FLIP_REPLACE
Do not use 3D flip.
Old card slides out; new card enters from the opposite side.

### FREEZE_HIT
2–4 frame accent, then 8–20 frame hold.

## 6. Editorial visual families

### A — Hero Cutout
Dad/person + large label + one geographic/support shape.

### B — Editorial Map
Map + route + one active location + optional 1–3 image cards.

### C — Year Card
Huge year + timeline + one evidence card.

### D — Portrait Card
Real photo + name + small annotation/highlight.

### E — Evidence/Document
Document crop + one highlighted phrase.

### F — Counter/Network
One number or one network logic at a time.

### G — Archive Impact
Real photo cards, 2–4 visible maximum.

### H — End Card
One face + domain + motto.

## 7. Yellow highlighter semantics

Yellow is reserved for:
- active year;
- active location;
- current number;
- one key phrase;
- current subject/connector.

If everything is yellow, nothing is highlighted.

## 8. Frame-by-frame documentation rule

Every scene must have a frame table.

A row like:

```
F024–F035: Dad card holds x=1180,y=120,rot=-1.0; headline enters in 3 stepped poses
```

means **every frame in that range is accounted for**.

If a property interpolates, the row must state:
- start value;
- end value;
- whether interpolation is smooth or stepped;
- cadence.

No scene may contain an undocumented animation interval.

## 9. Hero-frame rule

Before motion implementation, export one hero still for every scene.

The scene fails if the hero still does not communicate the current VO sentence without motion.

Motion cannot rescue a weak frame design.

## 10. Trajectory-preview rule

Before final render, export:
- start pose;
- 25% pose;
- 50% pose;
- 75% pose;
- end pose.

For scenes with moving cutouts, overlay a numbered path preview:
`1 → 2 → 3 → 4 → 5`.

This follows the useful YouMind concept of previewing motion direction before committing to generation/animation.

## 11. Remotion implementation

Required primitives:
- `<Composition>`;
- `<Sequence>`;
- `<AbsoluteFill>`;
- `useCurrentFrame()`;
- `useVideoConfig()`;
- `interpolate()`;
- `spring()` where a physically settling card is useful.

Implement helpers:

```ts
const onTwos = (frame: number) => Math.floor(frame / 2) * 2;
const onThrees = (frame: number) => Math.floor(frame / 3) * 3;
```

Paper layers use stepped frame by default.

Camera transforms may use raw frame.

## 12. Anti-rules

Do not:
- smooth-ease every element;
- morph unrelated paper objects;
- add parallax to every layer;
- spin paper cards 360°;
- use AI-generated text;
- animate Dad's facial features;
- put fake film scratches over every factual photo;
- use a random transition between scenes;
- make a factual sequence look like a game after the 0:24 pivot;
- turn a scene into background + centered text + slow zoom.

## 13. Scene pass criteria

A scene passes only when:
- hero still works;
- all frames are accounted for;
- one visual idea dominates;
- paper cadence is visible but not annoying;
- faces remain stable;
- text is readable;
- transition has a narrative reason;
- the next scene grows logically from the previous scene.
