# 30 — Audio Sync & Cue Sheet v02 — LEGACY V1

> V2 uses `production/vox-v2/audio-cues.json` with 24 shot-window cues. The 35-cue system below remains as V1 history.


## Root cause addressed

The earlier narration document assigned long paragraphs to short scene windows. Several sections required roughly 200–280 whitespace-words/minute, which made drift, rushed TTS and picture/audio mismatch likely.

The new system does not use one long TTS file.

It uses **35 independent narration cues**, each pinned to exact master frames.

Canonical manifest:

`production/audio/voiceover-cues.json`

## Audio master

- timeline: 24fps;
- master audio sample rate: 48kHz;
- internal VO format: PCM WAV, mono;
- final delivery codec can be decided at export;
- internal MP3 is prohibited because encoder delay/priming can create avoidable sync uncertainty.

## Placement rule

Every cue has:

`start_frame`

and

`end_frame_exclusive`.

Example:

```json
{
  "id": "VO_C002",
  "start_frame": 48,
  "end_frame_exclusive": 84,
  "text": "Một người Úc."
}
```

Remotion places that WAV at exactly frame 48.

No global offset.

No concatenated 120-second TTS track.

No “play the whole narration and hope it lines up”.

## TTS acquisition workflow

For each cue:

1. synthesize only that cue;
2. acquire provider audio;
3. decode immediately to 48kHz PCM WAV;
4. remove only head/tail silence/encoder padding;
5. preserve internal intentional pauses;
6. measure exact duration with ffprobe;
7. compare to the cue window;
8. if it does not fit, fail that cue;
9. do not move later cues;
10. regenerate the cue or use an approved shorter V02 text.

Never solve overflow by shifting the entire remainder of the movie.

## Sync tolerance

Preferred:
- cue begins exactly on `start_frame`;
- measured spoken audio finishes before `end_frame_exclusive`;
- remaining window is silence/room for picture.

Hard failure:
- cue audio extends beyond its allowed end by more than 1 frame;
- a later cue is shifted to compensate;
- one global audio offset is introduced;
- opening country phrase no longer coincides with Australian imagery.

## Critical opening sync

### VO_C001 — F0000–F0041
`Đây là Dad Stevenson.`

### VO_C002 — F0048–F0083
`Một người Úc.`

### VO_C003 — F0084–F0137
`Sống và làm việc tại Adelaide.`

The opening visual must remain Australia-based throughout.

### VO_C004 — F0164–F0215
`Kangaroo. Người Úc khó tránh.`

This begins as the kangaroo card enters.

## Picture/audio beat strategy

The narration deliberately leaves silence inside scenes.

That silence is useful:
- visual punchline;
- map comprehension;
- number 8 hold;
- transition;
- emotional archive.

Do not fill every gap with speech.

## Loudness

Narration stem target:
approximately -16 LUFS integrated before final mix.

Do not hard-limit individual cue files aggressively.

Final mix loudness is a finishing decision.

## Debug render

Before full preview, create:

`review/previews/DadJourneyMaster_SYNC_DEBUG_0-30s.mp4`

It must display:
- global frame;
- timecode;
- current scene ID;
- current VO cue ID;
- cue start/end frames.

This 30-second debug render is mandatory before the 120-second review master.

## Audio validation

Run:

```bash
node scripts/validate-audio-cues.mjs
```

It validates:
- cue ordering;
- no overlaps;
- frame bounds;
- estimated speech-rate ceiling;
- WAV naming;
- 48k master policy;
- zero global offset;
- opening Australia fact lock.

When actual WAVs exist, implementation must additionally ffprobe measured durations and fail any overflow.
