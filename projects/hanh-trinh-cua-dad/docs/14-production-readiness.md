# 14 — Production Readiness v02

## Current state

**PREPRODUCTION_LOCKED_RENDER_DEFERRED**

The owner explicitly deferred render-flow implementation.

Everything that should be decided before render execution has been prepared.

## Complete

### Story / fact
- factual scholarship-history spine;
- comedy/fact separation;
- 2027 claim hold;
- 2-minute structure;
- locked VO.

### Visual
- Dad identity refs;
- 728-image source catalog;
- 12-image visually QC'd animatic shortlist;
- archive chronology rules;
- asset-to-shot map;
- storyboard/animatic spec;
- shot plan;
- continuity plan.

### Editorial / sound
- 120s paper edit;
- 1920×1080 / 24fps animatic timeline;
- transition logic;
- sound arc;
- narration performance direction.

### AI
- primary routing: Runway Gen-4.5 I2V;
- fallback routing: Veo 3.1;
- model-neutral prompts;
- factual-history no-fake-archive rule.

### Infrastructure contract
- `.gitignore`;
- `.env.example`;
- production manifest;
- heavy-media external-storage rule.

## Deferred by owner

The following are execution, not creative-preproduction tasks:
- implement render worker;
- make provider API calls;
- upload/download automation;
- create final edit;
- export final master.

These are intentionally **not blockers to preproduction lock**.

## Remaining factual/person holds

These remain explicit rather than prompting the owner again:
- 2027 / 1000+ claim remains unused;
- Nguyễn Hoàng Cung image label should be owner-confirmed before on-screen name;
- Đoàn Minh Nam portrait should be explicitly confirmed before face/name caption;
- Sơ Nien portrait should be explicitly confirmed before face/name caption.

If confirmation never arrives, the edit already has safe fallbacks:
**text/name cards + graphics, no unverified portrait.**

## Website

The biography page still times out from the current retrieval environment.

Safe plan is already locked:
- use real website capture at execution time;
- if inaccessible during edit, use clean domain text `vietucfamily.org`, not AI-generated UI.

## Release logic

Preproduction: **PASS**

Render execution: **DEFERRED**

Final master: **NOT RENDERED**

No further creative clarification is required to proceed when the render pipeline is implemented.
