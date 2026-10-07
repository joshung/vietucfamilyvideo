# VOX-like 10s Pilot — Dad Journey

**Branch:** `experiment/vox-10s-pilot-v01`  
**Purpose:** prove the first 10 seconds visually before touching the full 120s master.

This pilot exists because the previous full-video attempts were too generic and drifted from facts/audio.

The pilot follows the strongest principles from the Easy-Peasy guide:

- one focused visual idea per 10-second clip;
- narration kept under 20 words;
- visual anchor first, context second;
- 2–3 visual beats maximum;
- muted editorial palette + one loud yellow accent;
- archival/real photos treated as physical paper objects;
- 12fps-style paper stutter inside a 24fps timeline;
- text appears exactly when spoken;
- image-first consistency rather than fresh text-to-video reinvention.

Reference:
https://easy-peasy.ai/blog/how-to-make-vox-style-videos-with-ai

## Pilot objective

The viewer must understand within 10 seconds:

1. this is Dad Stevenson;
2. he is Australian;
3. Adelaide is the factual geographic anchor;
4. the kangaroo is a playful Australian visual joke;
5. the look is premium editorial paper collage, not AI B-roll.

## Hard fact lock

Dad must never be presented as American.

Allowed origin geography:
- Australia;
- South Australia;
- Adelaide.

Forbidden:
- United States;
- USA;
- America;
- Mỹ;
- Hoa Kỳ;
- US flag/iconography.

## Master

```
Composition: DadJourneyPilot10s
1920x1080
24fps
240 frames
10 seconds
```

## Narration

Exactly:

```
Đây là Dad Stevenson, một người Úc sống ở Adelaide.
Và tất nhiên, phải có một con kangaroo.
```

This is intentionally short enough to breathe.

## Visual strategy

One visual anchor:
**Dad + Australia**

The kangaroo is a late visual payoff, not a second unrelated scene.

The composition should hold Dad/Australia long enough to feel designed rather than frantic.

## Required review

Before any 120s implementation resumes, render:

- `pilot-style-frame.png`
- `pilot-start.png`
- `pilot-mid.png`
- `pilot-end.png`
- `DadJourneyPilot10s_540p_v01.mp4`

Do not port the style to the full film until this 10s pilot is approved.

## Fast copy-paste test

For a one-pass 10-second experiment, use:

`ONE-PASS-10S-EXAMPLE-PROMPT.md`

For the implementation agent, use:

`MASTER-10S-PILOT-AGENT-PROMPT.md`
