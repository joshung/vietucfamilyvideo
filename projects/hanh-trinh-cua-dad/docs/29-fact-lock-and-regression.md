# 29 — Fact Lock & Regression Gates v01

## Why this exists

A rendered draft incorrectly described Dad as coming from America/USA even though the approved project source and script identify him with Australia/Adelaide.

That is not a minor wording issue. It means the execution layer deviated from source-of-truth.

This document creates hard regression gates.

## Critical identity lock

Dad Stevenson:

- **Nationality:** Australian / người Úc.
- **Country:** Australia / Úc.
- **Context in the scholarship origin story:** living and working in **Adelaide, South Australia**.
- **Never establish Dad as American, from America, from the USA, from the United States, or from Mỹ/Hoa Kỳ.**

## First 10 seconds — mandatory

### Visual

0:00–0:06:
- real Dad;
- Australia geography;
- editable text may say `AUSTRALIA → VIỆT NAM`;
- no United States map, flag, Statue of Liberty, stars-and-stripes treatment, USA label, America label.

0:06–0:10:
- kangaroo comedy remains clearly Australian;
- no US iconography.

### Audio

The opening cues are locked to:

- `Đây là Dad Stevenson.`
- `Một người Úc.`
- `Sống và làm việc tại Adelaide.`

The word `Mỹ`, `Hoa Kỳ`, `USA`, `America`, `American`, or `United States` must never occur in Dad-origin narration.

## Full timeline facts

Locked:
- Adelaide scholarship discussion with Sơ Nien;
- 1996 Dad meets Đoàn Minh Nam;
- 1997 return / SunWay scholarship planning;
- first group = 8 students;
- first name = Stevenson Scholarship Programme;
- 1997–2006 growth;
- 2006 handover to Nguyễn Hoàng Cung and Viet Uc Family naming;
- support unconditional / no repayment;
- Dream – Believe – Do.

Held:
- future-dated 2027 / 1000+ claim.

## Fictional material

Only these beats are intentionally fictional:
- kangaroo fight/action-movie setup;
- buffalo “final boss” setup.

They must be visually labeled as fiction/comedy and never treated as biographical evidence.

## Render failure conditions

A review/master automatically fails if:
1. Dad is called American or shown as originating in the United States.
2. first 10 seconds use US geography/iconography.
3. a factual date/name/number contradicts the fact lock.
4. recent archive is implied to be period photography from 1996/1997/2006.
5. fictional animal gags are presented as factual biography.
6. the 2027/1000+ statement is narrated as a current 2026 fact.

## Validation

Run before every preview/master:

```bash
node scripts/validate-fact-lock.mjs
```

The validator checks:
- fact manifest;
- opening VO cues;
- opening hero prompt;
- generated frame prompts for the opening;
- implementation source when `src/` exists.

A failed fact-lock validator blocks render.
