# 12 — Image Asset Catalog

## Canonical source

The complete image URL + description dataset supplied by the project owner is preserved verbatim at:

`assets/catalog/image_urls_descriptions.csv`

It contains **728 image records**.

A normalized machine-readable copy is stored at:

`assets/catalog/image_catalog.json`

Each normalized record receives a stable project-local ID such as `ARCH_0001`.

## Important metadata rule

The description field tells us **what the image is described as showing**. It does not automatically prove:
- the date the image was taken;
- that the image belongs to 1996/1997/2006;
- the exact identity of every person pictured;
- that a modern event photo can illustrate an early historical moment literally.

Therefore:
- use catalog descriptions for discovery;
- visually inspect shortlisted images before edit;
- use contemporary images as **impact/outcome/community** visuals unless chronology is independently verified;
- never place a later image under a 1997 caption in a way that implies it was shot in 1997.

## Catalog signals

- **Dad:** 47 descriptions
- **sinh viên:** 14 descriptions
- **Viet Uc:** 27 descriptions
- **Hà Nội:** 149 descriptions
- **HCMC:** 94 descriptions
- **Kon Tum/Kontum:** 109 descriptions
- **trao bằng khen:** 99 descriptions
- **tốt nghiệp:** 9 descriptions
- **gia đình:** 174 descriptions
- **phát biểu:** 13 descriptions

These counts are lexical signals only; they are not unique-person or unique-event counts.

## Dad reference

The project owner has also supplied dedicated Dad portrait references in this conversation. Those portraits are the authoritative face references for Dad. They are separate from the 728-row archive URL catalog.

Before final generation, copy approved Dad reference files into the configured media storage and register durable artifact URIs in project metadata.

## Archive usage hierarchy

1. **Dad identity / historical people:** real approved photo first.
2. **Specific real program events:** real archive photo first.
3. **Maps, years, names, counts:** motion graphics.
4. **Kangaroo/buffalo comedy:** stylized fictional AI/collage.
5. **Missing historical footage:** diagram/map/typography before fake photoreal reenactment.

## Shortlist for this 2-minute cut

### ARCH_0407 — Dad phát biểu tại lễ trao bằng khen Việt Úc Hà Nội

- **Suggested shot(s):** S01_SH01 / S05_SH04
- **Use:** Dad authority / closing or impact montage
- **URL:** https://api.vietucfamily.org/storage/v1/object/public/VUF/images/2026-53-4Z9A4359.jpg

### ARCH_0426 — Khanh Tam dịch cho Dad tại lễ  phát bằng khen Viet Uc HCM

- **Suggested shot(s):** S03_SH03 / S05_SH03
- **Use:** Dad with community; support network
- **URL:** https://api.vietucfamily.org/storage/v1/object/public/VUF/images/2026-75-T4N_0321.jpg

### ARCH_0328 — Các con gái thả tym chụp hình cùng Dad và anh Cung

- **Suggested shot(s):** S05_SH01 / S05_SH02
- **Use:** Dad + anh Cung continuity / later-era bridge
- **URL:** https://api.vietucfamily.org/storage/v1/render/image/public/VUF/images/DSC_7692.JPG

### ARCH_0329 — Đại gia đình Kim, Phú, Ân, Mai và Tuấn chụp hình lưu niệm cùng Dad o TPHCM

- **Suggested shot(s):** S05_SH03
- **Use:** family/community outcome
- **URL:** https://api.vietucfamily.org/storage/v1/render/image/public/VUF/images/DSC_8030.JPG

### ARCH_0099 — O.Ri dịch cho Dad phát biểu tại buổi lễ ở Kontum

- **Suggested shot(s):** S03_SH03
- **Use:** Dad speaking / translation / geographic breadth
- **URL:** https://api.vietucfamily.org/storage/v1/render/image/public/VUF/images/File 111.JPG

### ARCH_0103 — Dad tham dự buổi lễ ở Kon Tum

- **Suggested shot(s):** S03_SH03
- **Use:** Dad with program activity
- **URL:** https://api.vietucfamily.org/storage/v1/render/image/public/VUF/images/File 115.JPG

### ARCH_0084 — Thành viên Viet Uc Family ở Hà Nội

- **Suggested shot(s):** S04_SH03 / S05_SH03
- **Use:** community scale
- **URL:** https://api.vietucfamily.org/storage/v1/render/image/public/VUF/images/File 94.jpg

### ARCH_0334 — Các em sinh viên Viet Uc ở TPHCM

- **Suggested shot(s):** S05_SH03
- **Use:** student community
- **URL:** https://api.vietucfamily.org/storage/v1/render/image/public/VUF/images/LOV_0834.JPG

### ARCH_0348 — Gia đình Viet Uc Nối vòng tay lớn

- **Suggested shot(s):** S05_SH03
- **Use:** belonging / family visual
- **URL:** https://api.vietucfamily.org/storage/v1/render/image/public/VUF/images/LOV_1336.JPG

### ARCH_0576 — Kết nối và gắn kết Viet Uc family

- **Suggested shot(s):** S05_SH03
- **Use:** closing impact montage
- **URL:** https://api.vietucfamily.org/storage/v1/object/public/VUF/images/2026-237-T4N_0814.jpg

### ARCH_0411 — Toàn đại diện cho sinh viên Việt Úc tốt nghiệp phát biểu tại Hà Nội

- **Suggested shot(s):** S05_SH03
- **Use:** student voice / outcome
- **URL:** https://api.vietucfamily.org/storage/v1/object/public/VUF/images/2026-58-4Z9A4287.jpg

### ARCH_0121 — Chúc mừng các sinh viên đã tốt nghiệp ở Kontum

- **Suggested shot(s):** S05_SH03
- **Use:** graduation outcome
- **URL:** https://api.vietucfamily.org/storage/v1/render/image/public/VUF/images/File 138.JPG

### ARCH_0169 — Trao giấy khen cho sinh viên tốt nghiệp ở thành phố Hồ Chí Minh

- **Suggested shot(s):** S05_SH03
- **Use:** graduation / recognition
- **URL:** https://api.vietucfamily.org/storage/v1/render/image/public/VUF/images/File192.JPG


## Search strategy for editor

The full CSV is deliberately retained so future agents/editors can search phrases such as:
- `Dad`
- `phát biểu`
- `tốt nghiệp`
- `trao bằng khen`
- `Viet Uc`
- `Hà Nội`
- `HCMC`
- `Kon Tum`
- `gia đình`
- individual member names

Do not manually duplicate all 728 rows into screenplay documents. The catalog is the discovery layer; shot documents should reference stable asset IDs.
