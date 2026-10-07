# 10 — AI Generation Plan v03

## Production principle

The archive is now rich enough that **AI should not carry the factual history**.

AI is used where it adds controlled visual value:
- fictional comedy;
- motion support;
- transitions;
- subtle animation of approved Dad photos.

## Available asset layers

### Dad references

`assets/dad/reference-manifest.json`

- DAD_REF_02 = primary face identity reference.
- DAD_REF_01 = primary cutout/upper-body reference.

### Archive catalog

728 image URLs:
- `assets/catalog/image_urls_descriptions.csv`
- `assets/catalog/image_catalog.json`

### Archive-to-shot plan

`docs/13-asset-to-shot-map.md`

## Render routing by shot

### S01_SH01 — Dad hero

Preferred:
- real still + motion graphics.

Optional:
- very subtle I2V breathing/head micro-motion only if face remains stable.

Do not synthesize speech.

### S01_SH02 — kangaroo

Preferred:
- build one approved still composition first;
- Dad as real cutout;
- kangaroo stylized;
- animate layers in editor or I2V.

Source duration: 5–8s.

Avoid:
- realistic punching;
- complex hand interaction;
- photoreal violence.

### S01_SH03 — buffalo

Same strategy:
- stylized still first;
- motion minimal;
- fight never happens.

Source duration: 5–10s.

### S02–S05 factual history

Primary tools:
- real archive;
- maps;
- typography;
- timeline;
- diagrams;
- 2.5D parallax.

AI-generated photoreal reenactment is **not needed**.

## Dad likeness acceptance

Reject if:
- glasses disappear/change shape substantially;
- face becomes narrower/wider;
- eyes become inconsistent;
- age shifts;
- teeth/mouth artifacts become prominent;
- skin becomes plastic;
- identity changes between frames.

If I2V fails:
1. use static photo;
2. add editor-driven parallax;
3. animate background/text only;
4. do not keep regenerating just to force face motion.

## Prompt package — fictional kangaroo

Model-neutral intent:

```
A deliberately stylized editorial collage. Use the supplied Dad reference as a clean recognizable photo cutout on the left, wearing his formal suit. On the right, a kangaroo posed like an exaggerated boxing contender. Flat paper layers, bold sports-poster composition, playful but respectful, clearly fictional. Minimal motion only: slight paper bounce, kangaroo shifts weight, small camera push. No punches, no injury, no face transformation.
```

## Prompt package — fictional buffalo

```
A playful retro-game editorial collage set in a stylized Vietnam-inspired graphic landscape, not a documentary reconstruction. Use the supplied Dad photo cutout, recognizable face and glasses, facing a calm buffalo introduced like a humorous final boss. Dad adjusts imaginary boxing gloves. The buffalo slowly turns its head. Freeze before any fight. Minimal camera motion, strong readable composition, clearly fictional.
```

## Image-to-video rule

If the input image already contains Dad/composition:
- prompt motion, not appearance;
- keep camera simple;
- one primary action;
- do not restate Dad's face in ways that compete with the reference.

## Generation metadata

Every attempt records:
- shot_id;
- attempt_id;
- model/version;
- mode;
- source reference IDs;
- prompt;
- duration;
- aspect;
- seed if exposed;
- output URI;
- QC result.

## Archive download

The catalog URLs are acquisition sources.

Before final edit:
- download selected archive images into canonical project media storage;
- hash them;
- store durable artifact URIs;
- do not depend on website API URLs forever.

## Website

Capture the real website.

Never generate fake UI/text with an image model.

## Status

**AI concept generation can begin.**

**Final video rendering should wait until:**
- durable media storage is configured;
- selected archive images are fetched/QC'd;
- Dad refs are uploaded to durable storage;
- exact target AI/video model is chosen.
