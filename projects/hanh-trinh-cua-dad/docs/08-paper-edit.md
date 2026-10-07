# 08 — Paper Edit v04

> Supersedes v03.
> Audio timing is no longer paragraph-based. Exact narration starts are locked in `production/audio/voiceover-cues.json`.

```
00:00-00:06  S01_SH01  Dad / Australia
FACT: Dad = Australian / người Úc
VO cues: C001-C003
MUSIC: mock-serious documentary

00:06-00:14  S01_SH02  kangaroo interruption
VO cues: C004-C006
SFX: record scratch / small bell
VISUAL: Australian kangaroo joke; no US imagery

00:14-00:24  S01_SH03  Australia→Vietnam / buffalo final boss
VO cues: C007-C010
SFX: retro boss sting / bell
C010 bridges slightly into Adelaide reveal

00:24-00:31  S02_SH01  Adelaide factual pivot
VO cues: C011-C012
REMOVE: all game UI

00:31-00:38  S02_SH02  Sơ Nien / student problem
VO cues: C013-C014

00:38-00:45  S02_SH03  1996 Northeast route
VO cue: C015

00:45-00:51  S02_SH04  Dad meets Đoàn Minh Nam
VO cue: C016

00:51-00:58  S03_SH01  1997 Dad returns
VO cues: C017-C018

00:58-01:05  S03_SH02  SunWay criteria
VO cues: C019-C020

01:05-01:13  S03_SH03  connection network
VO cues: C021-C022

01:13-01:20  S03_SH04  first 8
VO cues: C023-C024
PAUSE / HOLD on 8

01:20-01:26  S04_SH01  Stevenson Scholarship Programme
VO cue: C025

01:26-01:31  S04_SH02  Australia ↔ Vietnam operating network
VO cues: C026-C027

01:31-01:37  S04_SH03  growth 1997–2006
VO cue: C028
ARCHIVE: continuation/impact only

01:37-01:42  S04_SH04  community
VO cue: C029

01:42-01:47  S05_SH01  2006 handoff
VO cue: C030

01:47-01:51  S05_SH02  Viet Uc Family
VO cue: C031

01:51-01:58  S05_SH03  principles + impact
VO cues: C032-C034
MUSIC ducks for “Không phải trả nợ”

01:58-02:00  S05_SH04  Dad + website + motto
VO cue: C035
```

## Audio editorial rule

Narration has intentional gaps.

Do not fill every gap.

The gaps are reserved for:
- visual comprehension;
- comic beats;
- timeline transitions;
- number 8 hold;
- emotional archive.

## Sync implementation

Every VO cue is an independent PCM WAV.

Place each cue at its exact `start_frame`.

Never:
- use one concatenated narration file;
- add a global narration delay;
- shift the rest of the film because one cue is too long.

If one cue does not fit, fail and regenerate that cue only.

## First-10-second regression

Mandatory before review:
- Australia / Adelaide visible;
- no US map/flag/labels;
- cue C002 says `Một người Úc.`;
- no narration contains Mỹ / Hoa Kỳ / USA / America / American / United States.
