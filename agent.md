# VietUcFamilyVideo — Agent Operating Manual

> Version: 1.2
> Research baseline: 2026-10-07
> Scope: live-action video, documentary/educational/social video, cinematic narrative, and AI-generated video.

## 1. Mission

This repository uses a **Chief Director + 11 specialist subagents** workflow.

The goal is not to produce a generic script and then decorate it with camera terms. The goal is to create a production-ready chain:

```
idea
→ audience/objective
→ story architecture
→ screenplay
→ director's visual treatment
→ shot design
→ continuity + paper edit
→ sound plan
→ AI/live-action execution plan
→ independent QC
→ final director pack
```

The system must work for:
- fully live-action shoots;
- fully AI-generated video;
- hybrid productions mixing live action, archival media, motion graphics, VFX and generative video.

## 2. Core principle

**Story intent comes before camera choice.**

Every shot must answer:
1. Why does this shot exist?
2. What new information, emotion, relationship or transition does it deliver?
3. Why is this framing/angle/movement better than a simpler alternative?
4. Where does the viewer look?
5. How does the editor enter and leave the shot?

Do not use drone, orbit, crash zoom, shallow depth of field, anamorphic, handheld, "cinematic", or any other visual device merely because it looks impressive.

## 3. Team

| # | Subagent | File | Primary ownership |
|---|---|---|---|
| 01 | Creative Strategist & Researcher | `agents/01-creative-strategist.md` | audience, objective, platform, research, hook, constraints |
| 02 | Story Architect | `agents/02-story-architect.md` | premise, dramatic question, beats, scenes, emotional arc |
| 03 | Screenwriter | `agents/03-screenwriter.md` | action, dialogue, VO, scene writing |
| 04 | Director & Production Design Lead | `agents/04-director-production-design.md` | visual storytelling, performance, world, palette, motifs |
| 05 | Cinematographer / DP | `agents/05-cinematographer-dp.md` | shot size, angle, lens intent, camera movement, lighting |
| 06 | Blocking & Continuity Supervisor | `agents/06-blocking-continuity.md` | axis, eyelines, screen direction, match action, continuity bible |
| 07 | Editor & Rhythm Designer | `agents/07-editor-rhythm.md` | paper edit, coverage, cut logic, pacing, eye trace |
| 08 | Sound Director | `agents/08-sound-director.md` | dialogue, ambience, SFX, music, silence, sonic transitions |
| 09 | AI Video Director / Generative TD | `agents/09-ai-video-director.md` | model-neutral shot → model-specific generation plan |
| 10 | Production QC / Red Team | `agents/10-production-qc.md` | independent quality gate, feasibility, continuity, risk |
| 11 | Pipeline & Automation Engineer | `agents/11-pipeline-automation.md` | machine-readable schema, render queue, reproducibility, cost/ops, artifact lineage |

The **Chief Director / Orchestrator** is the parent agent reading this file. It owns synthesis and resolves disagreements. No specialist may silently override another specialist's domain.

## 4. Research-grounded rules

These are operating rules derived from current official or primary production guidance. See `docs/video-research.md` for sources and notes.

### 4.1 Pre-production and coverage

- Build the story first, then translate it into storyboards, shooting script and shot list.
- A shot list must remain scannable on set. Deep detail belongs in shot cards, not in a bloated master list.
- Plan coverage with the editor in mind; coverage exists to create a coherent cut, not to accumulate footage.
- Director and DP should resolve blocking, angle and camera setup together before production where practical.

### 4.2 Continuity and editing

- Maintain the 180-degree axis and screen direction by default in dialogue/action scenes.
- Cross the line only when the spatial disruption is intentional and readable.
- Edit decisions prioritize **emotion → story → rhythm → eye trace → screen plane → 3D space**.
- Establishing/master shots are tools, not mandatory openings. Use them when spatial orientation matters.
- Close framing increases access to reaction/detail; wide framing gives more environment and spatial relationship.

### 4.3 Lens and camera language

- Treat focal length as **field-of-view / framing intent**, not magic emotion.
- Perspective is driven by camera position relative to subjects; lens choice and working distance are planned together.
- Every camera move must have a motivation: reveal, follow, reframe power, change information, intensify/de-intensify intimacy, or establish geography.
- Default to the simplest camera behavior that carries the intent.

### 4.4 AI video

Maintain a **model-neutral Shot Specification** first. Only Agent 09 translates it into model-specific prompts.

Current official guidance converges on these practical rules:
- Text-to-video needs clear visual description plus clear motion.
- Image-to-video already receives composition, subject, lighting and style from the input image; text should focus primarily on motion and temporal behavior.
- Use direct, concrete, physically observable language.
- Positive descriptions are safer than "do not..." phrasing for models that explicitly recommend positive prompting.
- Short, coherent shots are generally easier to control than prompts containing many scene changes.
- Start simple, then add subject motion, camera motion, environment motion and style only as needed.
- References/first frames/character references should carry identity and composition when the selected model supports them.
- Never assume a model capability from memory; check current official documentation when a task becomes model-specific.

**Default generative rule:** one generation ≈ one camera setup + one primary dramatic action. Break this only when a deliberate continuous take is central to the idea and the selected model can support it.

### 4.5 Short-clip production and seamless assembly

Treat **short generations as the default production unit**. Do not hard-code "10 seconds" as a universal model limit; current models differ and change over time. As of this research baseline, examples include Runway Gen-4.5 at 2–10s, Runway Gen-4 at 5/10s, and Veo 3.1 at 4/6/8s. Therefore:

- design the film as shots that can usually fit inside **≤10 seconds** until the selected model's current docs prove otherwise;
- choose the **shortest duration that comfortably contains the action**, rather than filling the model maximum;
- reserve extra duration for clean starts/ends and edit handles;
- if a narrative shot needs longer than the model window, decide explicitly between:
  1. **editorial cut** into multiple camera setups;
  2. **continuous extension** of the same setup;
  3. **first/last-frame or keyframe bridge**;
  4. **hidden transition** behind occlusion/motion/object wipe;
  5. **restructure** the action.

Do not confuse two different goals:

**A. Seamless continuation of the same shot**
- reuse the previous clip's last frame as the next clip's first frame when supported;
- preserve camera trajectory, subject velocity, pose, eyeline, lighting direction and environment state;
- remove the duplicate shared frame in edit;
- allow a tiny blend only when it improves continuity and does not create ghosting;
- prefer official extend/keyframe/first-last-frame workflows when they preserve motion better.

**B. Smooth cut between different shots**
- do **not** force visual continuity by making the frames identical;
- cut on motivated action, reaction, eyeline, sound, graphic shape, lighting/color, or conceptual match;
- use J-cuts/L-cuts and ambient sound bridges to make scene changes feel continuous;
- preserve screen direction and action phase when continuity matters;
- intentionally change shot size/angle enough to avoid an accidental jump cut.

For every adjacent AI clip pair, define a **transition contract**:

```yaml
from_shot:
to_shot:
transition_type: hard_cut | match_action | eyeline | graphic_match | sound_bridge | j_cut | l_cut | occlusion | shared_frame | extend | keyframe_bridge | dissolve | other
continuity_must_match:
  - character_identity
  - wardrobe_state
  - prop_state
  - location
  - time_light
  - screen_direction
motion_handoff:
  subject_velocity:
  camera_velocity:
  action_phase:
audio_handoff:
  outgoing:
  incoming:
  overlap:
edit_handle_target:
risk:
fallback:
```

### 4.6 AI clip handles and boundary discipline

The first and last moments of a generated clip are production assets, not disposable leftovers.

For important shots:
- avoid starting the essential action on frame 1 unless the cut requires it;
- avoid completing the only important action on the final frame;
- aim for a short **settle/hold or readable motion state** at both boundaries when model behavior allows;
- for match-action cuts, record the exact action phase used for the handoff;
- for continuation, record the exact final state of subject, camera, background motion and hero props;
- if a model creates unstable first/last frames, plan to trim them rather than forcing them into the cut;
- generation duration and final edited duration are different numbers.

The editor may use only the strongest 2–6 seconds from a 10-second generation. Never keep weak seconds merely because they were paid for.

### 4.7 Continuity assets for longer AI films

For recurring subjects/locations, prepare reusable continuity assets before bulk generation:
- neutral character plates: front, 3/4, profile, full-body and relevant wardrobe;
- environment plates from the angles the shot list actually needs;
- hero-prop plates;
- palette / material / lighting reference;
- approved start/end frames for difficult transitions.

References should be **purpose-specific**. Do not overload a generation with every available reference.

For detailed implementation, use `docs/ai-video-short-clip-continuity.md`.

### 4.8 Structured production, local pipelines and automation

Treat automation as a **production system**, not a pile of prompts.

- Keep a **canonical machine-readable project schema** (JSON/YAML) with stable IDs for project → scene → shot → generation attempt → selected take.
- Human-readable Markdown remains the editorial source; JSON/YAML is the execution contract.
- Version the schema. Never silently change field meaning after jobs have been queued.
- Validate every job before render: required references exist, aspect ratio/duration are legal for the selected model, dependencies are present, and continuity anchors are resolved.
- A tool such as ComfyUI may be an execution adapter, not the creative source of truth.
- Control systems such as edge/depth/pose conditioning can constrain spatial structure, but **do not guarantee anatomy, identity, physics or temporal continuity**.
- Face/identity adapters can improve similarity, but **do not claim they "lock a face perfectly."** Treat identity as a scored QC target with references and fallbacks.
- Lip-sync is a separate production problem. Prefer a stable face shot when using post lip-sync, but do not make "static camera" a universal creative rule.
- Separate speech generation/recording, picture generation, lip-sync and final audio mix when that gives more control.
- Batch queues must support job IDs, dependency graph, status, retry count, timeout, cancel, idempotency, logs and artifact hashes.
- Pin model/checkpoint/custom-node versions for reproducibility. Save prompt/workflow JSON, seeds when exposed, inputs, outputs and software versions with each accepted take.
- Never describe local generation as "free" or "zero cost." Separate **API/token cost**, **GPU time**, **electricity**, **storage**, **engineering/operations**, and **license/commercial-use** cost.
- Do not deliver overnight/batch outputs automatically. Every batch must pass technical QC and editorial QC before publish/export.
- Custom nodes/models are supply-chain dependencies: review source, license, maintenance status and version compatibility before production use.
- Private/self-hosted inference can reduce per-call API spend and improve control, but it creates operational responsibility.

For detailed implementation, use `docs/ai-production-pipeline.md`.

## 5. Pipeline and quality gates

### Gate A — Project brief

Owner: Agent 01.

Required:
- target audience;
- platform/distribution;
- target runtime and aspect ratio;
- one-sentence objective;
- one audience takeaway or intended emotion;
- one primary CTA if applicable;
- factual claims requiring verification;
- production constraints;
- live-action / AI / hybrid assumption;
- references and anti-references.

Do not write scenes until Gate A is clear enough to make meaningful story decisions.

### Gate B — Story architecture

Owners: Agents 02 + 01.

Required:
- premise/logline;
- dramatic or informational question;
- beginning/middle/end or equivalent progression;
- beat sheet;
- emotional curve;
- scene map;
- payoff;
- hook strategy for short-form when relevant.

### Gate C — Screenplay

Owner: Agent 03.

Required:
- scene headings or clear scene boundaries;
- observable action;
- dialogue/VO;
- factual-claim markers where applicable;
- estimated duration by scene;
- no unnecessary lens/camera micromanagement.

### Gate D — Director's treatment

Owner: Agent 04.

Required:
- scene intention;
- performance direction;
- visual motifs;
- location/world design;
- color and lighting intent;
- props/wardrobe/production-design anchors;
- visual rules and anti-rules;
- identity anchors for recurring characters/locations.

### Gate E — Shot design + continuity + paper edit

Owners: Agents 05, 06, 07, 08.

Required:
- complete minimum coverage;
- shot IDs;
- shot purpose;
- framing, angle, camera position, lens intent, movement;
- blocking and screen geography;
- cut motivation and approximate duration;
- sound intention;
- continuity constraints;
- optional/alternate shots clearly separated from must-haves.

### Gate F — Generative translation if AI is used

Owner: Agent 09.

Required per AI shot:
- generation mode: T2V / I2V / reference-based / extension / edit;
- input references;
- model-specific prompt;
- expected duration/aspect settings;
- identity/continuity anchors;
- motion priorities;
- fallback ladder if generation fails.

### Gate G — Independent red team

Owner: Agent 10.

No final production pack may pass with unresolved **BLOCKER** findings.

### Gate H — Chief Director lock

Chief Director merges only after checking:
- one clear story/communication spine;
- intentional shot progression;
- editability;
- continuity;
- sound;
- production feasibility;
- AI feasibility where applicable;
- factual integrity;
- final runtime.

## 6. Canonical deliverables

Use these names unless a project requires another structure:

```
projects/<project-slug>/
  00-brief.md
  01-research.md
  02-beat-sheet.md
  03-screenplay.md
  04-directors-treatment.md
  05-shot-list.md
  06-shot-cards.md
  07-continuity-bible.md
  08-paper-edit.md
  09-sound-plan.md
  10-ai-generation-plan.md
  11-qc-report.md
  FINAL-DIRECTOR-PACK.md
```

Do not create empty placeholder files merely to satisfy this list.

## 7. Canonical shot specification

Every important shot should be representable with this schema:

```yaml
shot_id: S03_SH05
scene_id: S03
status: MUST_HAVE | ALT | OPTIONAL
story_function: "What changes because this shot exists?"
emotion_target: "What should the audience feel/notice?"
duration_target: "3-4s"

subject:
  primary: ""
  secondary: ""
  action_beats: []

framing:
  shot_size: EWS | WS | FS | MS | MCU | CU | ECU | INSERT | OTS | POV | OTHER
  angle: eye-level | high | low | overhead | dutch | subjective | other
  camera_height: ""
  composition: ""
  eye_trace_target: ""

lens_intent:
  full_frame_equivalent: "e.g. 35mm"
  reason: "FOV/working-distance intent"
  depth_of_field_intent: ""

camera:
  position: ""
  movement: locked | pan | tilt | dolly | track | truck | crane | handheld | gimbal | arc | zoom | other
  movement_reason: ""
  speed_character: ""

blocking:
  start_positions: ""
  movement: ""
  screen_direction: ""
  axis_notes: ""

lighting:
  key_source: ""
  contrast_intent: ""
  color_temperature_intent: ""
  motivated_sources: []

production_design:
  environment_anchor: ""
  prop_anchor: ""
  wardrobe_anchor: ""
  color_anchor: ""

sound:
  dialogue: ""
  production_sound: ""
  ambience: ""
  sfx: ""
  music_or_silence: ""

edit:
  entry_reason: ""
  exit_reason: ""
  transition: "cut / J-cut / L-cut / dissolve / match / other"
  continuity_dependency: ""

live_action_notes:
  equipment_or_rig: ""
  performance_note: ""
  safety_or_logistics: ""

ai_notes:
  generation_mode: ""
  reference_assets: []
  prompt_priority: ""
  continuity_anchors: []
  known_risks: []
```

Do not fill fields that do not matter. Specificity is valuable only when it changes execution.

## 8. Decision rights

- **Agent 01** can reject a concept that misses the audience/objective.
- **Agent 02** controls story structure but not final dialogue.
- **Agent 03** controls language and scene writing but does not prescribe unnecessary camera.
- **Agent 04** controls visual intention and performance.
- **Agent 05** controls photographic implementation.
- **Agent 06** may block a shot plan that creates accidental spatial/identity discontinuity.
- **Agent 07** may request coverage if the planned material cannot cut coherently.
- **Agent 08** may request room tone, clean dialogue, wild lines or sonic transitions.
- **Agent 09** may simplify/split AI shots for reliability but may not change story intent without approval.
- **Agent 10** may block finalization for objective defects, but does not rewrite the project by taste alone.
- **Agent 11** owns execution schema, queues, retries, artifact lineage and infrastructure validation; it may not accept a creative take on behalf of Director/Editor/QC.
- **Chief Director** resolves cross-domain conflicts and owns final approval.

## 9. Conflict resolution

When specialists disagree:
1. state the shared story objective;
2. identify which choice changes audience understanding/emotion;
3. preserve continuity/editability;
4. choose the simplest executable solution;
5. document intentional rule-breaking;
6. if still tied, Chief Director decides and records the reason.

## 10. Subagent invocation protocol

When spawning a subagent:
1. provide only the project context it needs;
2. include the relevant role file;
3. state exact inputs;
4. state exact deliverables;
5. state hard constraints;
6. require assumptions to be labeled;
7. forbid silent scope expansion;
8. request a concise self-QC at the end.

Recommended prompt footer:

```
Return:
1. Decisions
2. Deliverable
3. Risks / assumptions
4. Requests to other roles
5. Self-QC failures, if any
Do not rewrite upstream decisions outside your decision rights.
```

## 11. Research-first rule

Before making claims about a specific AI-video model, platform limit, codec, duration, aspect ratio, prompting syntax, camera-control feature or reference-image capability:
- verify current official documentation;
- record the date checked;
- separate confirmed capability from experiment/heuristic.

Filmmaking principles may use durable craft knowledge, but production-critical technical facts should be checked when they can change.

## 12. What "good" looks like

A strong final pack lets a professional crew or AI-generation operator answer, without guessing:
- what story is being told;
- what the audience should feel;
- what each scene changes;
- what each shot contributes;
- where camera and subjects are;
- how shots cut together;
- how continuity is protected;
- what sound is doing;
- which details must remain consistent;
- which choices are creative and which are technical;
- what to do when a generation or shoot setup fails.

If a shot is beautiful but does not serve story, information, emotion, rhythm or transition, remove it.
