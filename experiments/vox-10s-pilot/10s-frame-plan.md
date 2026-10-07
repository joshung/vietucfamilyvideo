# 10s Frame Plan — DadJourneyPilot10s

> 24fps / 240 frames.

## One-idea rule

The whole 10 seconds is one idea:

**“This is Dad. He is Australian. Here is Adelaide. Kangaroo joke.”**

No buffalo.
No scholarship history.
No timeline.
No fake historical footage.

## Frame-by-frame ranges

### F000–F011 — paper establishes

- warm cream paper background;
- very subtle paper grain;
- no text yet;
- no map yet;
- music bed begins quietly.

### F012–F027 — Dad enters

- DAD_REF_01 enters as a physical photo cutout from below-right;
- motion on twos;
- x: 1180 → 1120;
- y: 1120 → 150;
- rotation: -2.2° → -0.7°;
- scale: 0.94 → 1.00;
- face remains completely unchanged.

### F024–F047 — title stamps in

Editable Remotion text, left side:

`DAD STEVENSON`

- 2-line maximum if needed;
- condensed bold sans;
- black ink;
- no white outlined meme text;
- first line appears F024–F035;
- yellow underline sweeps F036–F047.

### F048–F071 — Australia map appears

- accurate SVG map of Australia enters behind Dad;
- map opacity 0 → 0.20;
- smooth camera push is allowed;
- paper map itself moves on twos;
- no US map;
- no globe;
- no flag.

### F060–F083 — Adelaide marker

- yellow dot lands on Adelaide;
- editable location strip: `ADELAIDE`;
- smaller line: `SOUTH AUSTRALIA`;
- one accent only: yellow.

### F084–F143 — hold the anchor

- hold Dad + Australia + Adelaide for ~2.5 seconds;
- camera smoothly pushes 1.00 → 1.025;
- Dad photo/card stays stable;
- only tiny deterministic paper jitter;
- no new graphic element.

This hold is intentional.

### F144–F159 — setup for joke

Small editable caption appears:

`ÚC.`

or, if visually redundant, keep only existing map/location labels.

Do not add another headline.

### F160–F183 — kangaroo enters

- paper kangaroo cutout slides from screen-right;
- x: 2060 → 1420;
- y: 520 → 500;
- rotation: +5° → +1°;
- STEP2;
- no punch;
- no fight;
- no boxing ring;
- playful confident stance only.

### F184–F207 — disclaimer

Small yellow paper label at upper-right:

`TÁI HIỆN HÀI HƯỚC`

Keep it short.

Do not add stat cards in this pilot.

### F208–F239 — final hold

- Dad on left/center-right anchor remains readable;
- Australia map still visible;
- kangaroo sits at right edge;
- subtle 12fps paper jitter;
- camera push stops;
- hold for end readability.

## Narration timing

### F000–F104

`Đây là Dad Stevenson, một người Úc sống ở Adelaide.`

### F136–F232

`Và tất nhiên, phải có một con kangaroo.`

Leave silence between lines.

Do not shift the second line earlier.

## Audio

Use separate narration WAVs.

Do not rely on model-native narration for the approved pilot.

Cue A:
- start F000;
- max end F104.

Cue B:
- start F136;
- max end F232.

The picture must not move to catch up with late TTS.

If narration is too long, regenerate/shorten the cue.
