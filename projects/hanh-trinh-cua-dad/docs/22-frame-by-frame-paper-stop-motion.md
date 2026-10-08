# 22 — Frame-by-Frame Paper Stop-Motion Blueprint — LEGACY V1

> **SUPERSEDED FOR NEW IMPLEMENTATION.** Use `production/vox-v2/frame-manifest.jsonl` and `docs/31-VOX-V2-story-theme-motion.md`. This V1 document remains only for audit/rollback.


> Version: 1.0  
> Master: 1920×1080 / 24fps / 2880 frames / 120s  
> Rule: every interval below is fully specified. Paper transforms use stepped **on-twos** unless explicitly marked smooth. Camera may move smoothly at 24fps.

## How to read this document

- **F0000** = global master frame.
- A range such as `F0000–F0011` means every frame in that interval is accounted for.
- **STEP2** = update transform only on even frames; odd frame repeats prior pose.
- **STEP3** = update every 3 frames.
- **SMOOTH** = normal 24fps interpolation.
- Coordinates are 1920×1080 composition coordinates.
- Rotation is degrees.
- All text is rendered by Remotion, never baked into AI video.
- All paper objects cast deterministic shadows defined in `production/remotion/style-tokens.json`.

---

# SCENE 01 — S01_SH01 — DAD HERO

**Global frames:** F0000–F0143  
**Duration:** 144f / 6s  
**Component:** `DadHeroIntro`  
**Primary asset:** DAD_REF_01  
**Hero frame:** F0072

### Layer stack

1. warm paper background;
2. faint Australia silhouette;
3. Dad cutout;
4. `DAD STEVENSON`;
5. `AUSTRALIA → VIỆT NAM`;
6. yellow underline/arrow;
7. subtle grain.

### Frame schedule

| Frames | Exact state/action |
|---|---|
| F0000–F0005 | Paper background only. Grain fixed. No text. |
| F0006–F0011 | Australia silhouette HAND_PLACE: x 160→190 STEP2, y 155, rot -1.2→-0.6. Opacity 0→0.22. |
| F0012–F0027 | Dad card enters from x=2050 to x=1170 STEP2. y=110. rot +3.0→-0.8. scale .94→1.00 in 8 poses. |
| F0028–F0041 | Dad settles: x 1170→1165 STEP2, rot -0.8→-0.3. Face itself never deforms. |
| F0042–F0055 | `DAD STEVENSON` appears left at x=150,y=350. Three stepped poses: opacity 0/.65/1; y 372/360/350. |
| F0056–F0069 | Yellow underline HIGHLIGHT_SWIPE width 0→610px STEP2. |
| F0070–F0083 | `AUSTRALIA → VIỆT NAM` enters at x=155,y=470 STEP2; arrow draws left→right. |
| F0084–F0119 | Hero hold. Dad paper micro-jitter at 25% normal strength. Camera SMOOTH scale 1.000→1.018. |
| F0120–F0131 | Music/VO continues. Australia silhouette shifts -8px STEP2 as if the table layer was nudged. |
| F0132–F0137 | Tiny pre-jolt: entire paper stack x 0→-6→+3→0 STEP2. |
| F0138–F0143 | Hold exact hero composition; prepare audio record scratch. Hard cut next frame. |

**Transition out:** hard record-scratch cut.

---

# SCENE 02 — S01_SH02 — KANGAROO POSTER

**Frames:** F0144–F0335  
**Duration:** 192f / 8s  
**Component:** `KangarooPosterScene`  
**Hero frame:** F0256

### Layer stack

1. dark matte paper;
2. torn cream sports-poster block;
3. Dad cutout left;
4. kangaroo cutout right;
5. `VS`;
6. fictionalization label;
7. stat cards;
8. paper grain.

### Frame schedule

| Frames | Exact state/action |
|---|---|
| F0144–F0147 | 4-frame white/cream poster flash synced to record scratch. |
| F0148–F0155 | Dark paper slams in from y=-1080→0 STEP2. rot +1.4→0. |
| F0156–F0171 | Dad card CUTOUT_SLIDE from x=-520→270 STEP2, y=185, rot -6→-1.4. |
| F0172–F0187 | Kangaroo CUTOUT_SLIDE x=2050→1140 STEP2, y=150, rot +7→+1.6. |
| F0188–F0199 | `VS` PAPER_POP center x=960,y=455: scale .75→1.10→1.00 STEP2. |
| F0200–F0215 | Yellow disclaimer card enters from top: x=120,y=-120→70 STEP2, rot -2.0→-0.5. Text: `TÁI HIỆN HOÀN TOÀN KHÔNG ĐÁNG TIN`. |
| F0216–F0235 | Dad stat card enters bottom-left. `KINH NGHIỆM: KHÔNG RÕ`. |
| F0236–F0255 | Kangaroo stat card enters bottom-right. `HAI CHÂN: RẤT ĐÁNG NGẠI`. |
| F0256–F0287 | Paper stop-motion face-off. Dad holds nearly stable; kangaroo performs 4-pose weight shift: x 1140→1130→1144→1140; y 150→145→153→150; rot 1.6→1.1→2.0→1.6, each pose held 8f. |
| F0288–F0303 | Camera SMOOTH push 1.00→1.035 while paper objects remain stepped. |
| F0304–F0315 | Punchline hold. Crowd SFX drops. Everything freezes except grain. |
| F0316–F0327 | Poster paper begins sliding left x 0→-180 STEP2, exposing map edge on right. |
| F0328–F0335 | Poster exits x -180→-1920 STEP2. Australia/Vietnam map underneath becomes full frame. |

**No actual punch.**  
**If AI animal motion exists:** crop/mask it inside kangaroo paper layer only; Remotion typography and composition remain unchanged.

---

# SCENE 03 — S01_SH03 — BUFFALO FINAL BOSS → TRUTH PIVOT

**Frames:** F0336–F0575  
**Duration:** 240f / 10s  
**Component:** `BuffaloPivotScene`  
**Hero frames:** F0396 map / F0488 boss / F0556 truth card

| Frames | Exact state/action |
|---|---|
| F0336–F0351 | Editorial world map holds. Australia cut-paper continent highlighted yellow at x≈1380,y≈620. Vietnam marker dark. |
| F0352–F0391 | Route AU→VN draws over 40f. Route line may be SMOOTH; airplane paper icon updates STEP2 along same path. |
| F0392–F0407 | Vietnam paper cutout PAPER_POP: scale .92→1.03→1.00 STEP2. Label `VIỆT NAM` enters. |
| F0408–F0423 | World map slides upward STEP2; Vietnamese textured landscape/poster rises from bottom. |
| F0424–F0439 | `NEXT BOSS` enters top-left in two paper strips. |
| F0440–F0455 | Yellow `CON TRÂU` strip slaps beneath headline. rot -2.2→-0.8. |
| F0456–F0475 | Buffalo card enters x=2030→1110 STEP2, y=225. rot +5→+1. |
| F0476–F0495 | Dad cutout enters x=-500→250 STEP2, y=220. rot -5→-1. |
| F0496–F0519 | Dad stance: 3 poses, each 8f. Pose A rot -1/x250; B rot -2/x258/y218; C rot -1.3/x252/y222. Buffalo head layer turns only 3–4° across 3 poses. |
| F0520–F0531 | Fight bell. FREEZE_HIT: composition scale 1.00→1.035 in 3f then locked. |
| F0532–F0543 | Hold frozen face-off. Desaturate poster to 65% SMOOTH. |
| F0544–F0555 | Cream paper strip enters center: `May mắn là...` HAND_PLACE. |
| F0556–F0567 | Larger text replaces it: `CÂU CHUYỆN THẬT HAY HƠN.` Yellow highlight only behind `THẬT`. |
| F0568–F0575 | Entire game poster peels/slides down 8 frames STEP2; clean Adelaide map already underneath. |

**Transition:** the joke world physically leaves the table.

---

# SCENE 04 — S02_SH01 — ADELAIDE

**Frames:** F0576–F0743  
**Duration:** 168f / 7s  
**Component:** `AdelaideMapScene`  
**Hero frame:** F0660

| Frames | Exact state/action |
|---|---|
| F0576–F0587 | Clean cream map of Australia already visible. No comedy UI. |
| F0588–F0607 | Camera SMOOTH map zoom toward South Australia 1.00→1.18. |
| F0608–F0619 | Yellow dot for Adelaide PAPER_POP. One pulse only. |
| F0620–F0635 | `ADELAIDE` yellow location strip slides x=-280→190 STEP2. |
| F0636–F0647 | `SOUTH AUSTRALIA` small label enters below. |
| F0648–F0667 | DAD_REF_02 photo card enters lower-right x=2000→1330 STEP2, rot +3→+0.8. |
| F0668–F0719 | Hero hold. Camera SMOOTH drift 1.18→1.205. Dad card micro-jitter at 10% only. |
| F0720–F0731 | Yellow Adelaide marker grows into horizontal yellow line. |
| F0732–F0743 | That line stretches across frame and becomes underline for the next scene's question. |

---

# SCENE 05 — S02_SH02 — THE SCHOLARSHIP QUESTION

**Frames:** F0744–F0911  
**Duration:** 168f / 7s  
**Component:** `ScholarshipQuestionScene`  
**Hero frame:** F0834

| Frames | Exact state/action |
|---|---|
| F0744–F0755 | Yellow line from prior scene remains at y=610 on cream paper. |
| F0756–F0771 | Small Dad card HAND_PLACE at x=120,y=150. |
| F0772–F0787 | `SƠ NIEN` name card enters x=1420,y=160. Small `University of Adelaide` below. If no portrait, use type only. |
| F0788–F0803 | Main question line 1 appears: `LÀM SAO ĐỂ MỘT SINH VIÊN GIỎI`. |
| F0804–F0819 | Line 2: `KHÔNG PHẢI BỎ HỌC`. |
| F0820–F0835 | Line 3: `CHỈ VÌ THIẾU TIỀN?`; yellow HIGHLIGHT_SWIPE under this line. |
| F0836–F0855 | Bottom icon/card 1: `NĂNG LỰC`. |
| F0856–F0875 | Card 2: `KHÓ KHĂN TÀI CHÍNH`; connector line draws. |
| F0876–F0895 | Card 3: `NGUY CƠ DỪNG HỌC`; connector completes. |
| F0896–F0903 | Hold full diagram. |
| F0904–F0911 | Yellow underline from question shrinks to a short dash, then slides right and becomes timeline baseline next scene. |

---

# SCENE 06 — S02_SH03 — 1996 ROUTE

**Frames:** F0912–F1079  
**Duration:** 168f / 7s  
**Component:** `Route1996Scene`  
**Hero frame:** F1004

| Frames | Exact state/action |
|---|---|
| F0912–F0927 | Dark northern-Vietnam map fades in under cream paper edge. Timeline baseline from prior scene remains. |
| F0928–F0943 | Huge `1996` card HAND_PLACE top-left. Yellow strip under year. |
| F0944–F0967 | Route segment to `CAO BẰNG` draws. Marker enters at end. |
| F0968–F0987 | Route → `BẮC CẠN`. Marker enters. |
| F0988–F1007 | Route → `LẠNG SƠN`. Marker enters. |
| F1008–F1027 | Route → `HẠ LONG`. Marker enters. |
| F1028–F1047 | All 4 labels hold. Dad tiny photo card travels in 3 STEP2 placements only, never smoothly floating. |
| F1048–F1063 | Final Hạ Long marker expands into cream photo-card frame. |
| F1064–F1079 | Map dims; photo-card frame moves center-left ready for Nam introduction. |

---

# SCENE 07 — S02_SH04 — MEET ĐOÀN MINH NAM

**Frames:** F1080–F1223  
**Duration:** 144f / 6s  
**Component:** `MeetNamScene`  
**Hero frame:** F1158

| Frames | Exact state/action |
|---|---|
| F1080–F1095 | Empty cream portrait card from previous scene settles center-left. |
| F1096–F1115 | If verified Nam photo exists, photo appears inside card via paper-mask reveal STEP2. Else use neutral tour-guide icon. |
| F1116–F1131 | Hand-drawn yellow circle around subject draws over 16f. |
| F1132–F1147 | `ĐOÀN MINH NAM` label enters at x=980,y=360. |
| F1148–F1163 | Subtitle card: `HƯỚNG DẪN VIÊN DU LỊCH`. |
| F1164–F1187 | Comedy footnote paper enters slightly crooked: `...SẮP NHẬN THÊM VIỆC.` STEP3 for heavier comedic placement. |
| F1188–F1207 | Hold. Tiny paper jitter only on footnote, not portrait. |
| F1208–F1223 | Portrait card slides left; `1996` card slides off; a blank timeline opens to the right. |

---

# SCENE 08 — S03_SH01 — 1997 DAD RETURNS

**Frames:** F1224–F1391  
**Duration:** 168f / 7s  
**Component:** `Year1997ReturnScene`  
**Hero frame:** F1300

| Frames | Exact state/action |
|---|---|
| F1224–F1239 | Horizontal timeline enters. `1996` visible left in muted ink. |
| F1240–F1255 | Timeline shifts left STEP2. New marker approaches center. |
| F1256–F1271 | `1997` PAPER_POP at center, yellow highlight behind. |
| F1272–F1287 | Small Australia card appears left-bottom; Vietnam card right-bottom. |
| F1288–F1319 | Route/arrow AU→VN draws. Tiny Dad card moves in 4 discrete positions STEP2. |
| F1320–F1343 | Headline enters: `DAD QUAY LẠI VIỆT NAM`. |
| F1344–F1375 | Hold hero composition; camera SMOOTH push 1.00→1.02. |
| F1376–F1391 | 1997 yellow marker transforms into a paper notebook tab; next scene notebook slides up. |

---

# SCENE 09 — S03_SH02 — SUNWAY: IDEA → SYSTEM

**Frames:** F1392–F1559  
**Duration:** 168f / 7s  
**Component:** `SunwayCriteriaScene`  
**Hero frame:** F1490

| Frames | Exact state/action |
|---|---|
| F1392–F1407 | Notebook paper fills frame. Top tab still says `1997`. |
| F1408–F1423 | `SUNWAY HOTEL — HÀ NỘI` typed label appears top-left. |
| F1424–F1443 | Card 1 HAND_PLACE at x=180,y=330: `AI CẦN GIÚP?`. |
| F1444–F1463 | Card 2 at x=700,y=330: `HỖ TRỢ BAO NHIÊU?`. |
| F1464–F1483 | Card 3 at x=1220,y=330: `CHỌN THẾ NÀO?`. |
| F1484–F1503 | Under card 3, small tag `CẦN CÙ` enters. |
| F1504–F1519 | Tag `HỌC LỰC` enters. |
| F1520–F1535 | Tag `TƯ CÁCH` enters. |
| F1536–F1547 | Yellow underline moves card1→card2→card3 in 3 STEP3 poses. |
| F1548–F1559 | Three big cards shrink into 3 network nodes that retain their spatial order. |

---

# SCENE 10 — S03_SH03 — THE CONNECTION NETWORK

**Frames:** F1560–F1751  
**Duration:** 192f / 8s  
**Component:** `FirstStudentsNetworkScene`  
**Hero frame:** F1668

| Frames | Exact state/action |
|---|---|
| F1560–F1575 | Three tiny nodes from previous scene hold center. Background changes to clean paper network board. |
| F1576–F1591 | `SƠ NIEN` node HAND_PLACE upper-left. |
| F1592–F1607 | `CHA NGUYỄN VĂN TUYẾN` node enters center. |
| F1608–F1623 | Edge Sơ Nien→Cha draws. |
| F1624–F1639 | Student-group node enters lower-center. |
| F1640–F1655 | Edge Cha→Students draws. |
| F1656–F1671 | `ANH NAM` node enters right. |
| F1672–F1687 | Two small tags appear from Nam: `PHIÊN DỊCH`, `GHI CHÉP`. |
| F1688–F1703 | Note card `HỌC TẬP` attaches to student node. |
| F1704–F1719 | `GIA ĐÌNH` attaches. |
| F1720–F1735 | `QUÊ QUÁN` attaches. |
| F1736–F1743 | `DỰ ĐỊNH` attaches. |
| F1744–F1751 | All student-related mini cards slide toward center and stack into one deck for count scene. |

---

# SCENE 11 — S03_SH04 — THE FIRST 8

**Frames:** F1752–F1919  
**Duration:** 168f / 7s  
**Component:** `FirstEightScene`  
**Hero frame:** F1872

| Frames | Exact state/action |
|---|---|
| F1752–F1767 | Student-card deck lands center. Large number `1` appears. |
| F1768–F1781 | Count `2`; second card slides out. |
| F1782–F1795 | `3`; third card. |
| F1796–F1809 | `4`; fourth card. |
| F1810–F1823 | `5`; fifth card. |
| F1824–F1837 | `6`; sixth card. |
| F1838–F1851 | `7`; seventh card. |
| F1852–F1865 | `8`; eighth card. Strong paper hit SFX. |
| F1866–F1887 | Hold `8` completely still except grain. This is the VO pause. |
| F1888–F1903 | Caption enters: `8 SINH VIÊN ĐẦU TIÊN`; yellow strip expands behind 8. |
| F1904–F1911 | PUNCH_IN number 8 scale 1.00→1.055 SMOOTH, paper cards remain stepped/still. |
| F1912–F1919 | Yellow rectangle behind 8 expands horizontally to become the title highlight of Scene 12. |

---

# SCENE 12 — S04_SH01 — STEVENSON SCHOLARSHIP PROGRAMME

**Frames:** F1920–F2063  
**Duration:** 144f / 6s  
**Component:** `StevensonProgrammeTitle`  
**Hero frame:** F2000

| Frames | Exact state/action |
|---|---|
| F1920–F1935 | Expanded yellow strip settles center. |
| F1936–F1951 | `STEVENSON` appears over yellow strip. |
| F1952–F1967 | `SCHOLARSHIP` paper word strip enters below. |
| F1968–F1983 | `PROGRAMME` enters below. |
| F1984–F1999 | Small label `TÊN GỌI BAN ĐẦU` appears top-left. |
| F2000–F2031 | Full title hero hold. Slight paper-edge jitter on word strips only. |
| F2032–F2047 | Title stack scales 1.00→0.62 STEP2 and moves to upper-left as a header. |
| F2048–F2063 | Empty lower canvas opens; Dad/Nam/student nodes begin peeking in from edges. |

---

# SCENE 13 — S04_SH02 — HOW THE PROGRAMME WORKED

**Frames:** F2064–F2183  
**Duration:** 120f / 5s  
**Component:** `ProgrammeNetworkScene`  
**Hero frame:** F2136

| Frames | Exact state/action |
|---|---|
| F2064–F2079 | Dad/Australia card enters left. |
| F2080–F2095 | Nam/Vietnam card enters center. |
| F2096–F2111 | First student cluster enters right. |
| F2112–F2127 | Dad↔Nam connector draws. |
| F2128–F2143 | Nam↔students connector draws. |
| F2144–F2159 | Small yellow `8` node reappears as first cluster seed. |
| F2160–F2175 | Two additional neutral student clusters PAPER_POP outward. |
| F2176–F2183 | Main connector line stretches right until it becomes Scene 14 timeline baseline. |

---

# SCENE 14 — S04_SH03 — GROWTH 1997 → 2006

**Frames:** F2184–F2327  
**Duration:** 144f / 6s  
**Component:** `GrowthTimelineScene`  
**Hero frame:** F2270

| Frames | Exact state/action |
|---|---|
| F2184–F2199 | Timeline baseline locks. `1997` left; `2006` right, 2006 dim. |
| F2200–F2215 | Yellow active marker travels 1997→2000 in 4 STEP2 poses. |
| F2216–F2231 | ARCH_0411 photo card HAND_PLACE upper-right. Label `HÀNH TRÌNH TIẾP TỤC`. |
| F2232–F2247 | Marker progresses 2000→2003. ARCH_0471 card enters lower-left. |
| F2248–F2263 | Marker progresses 2003→2006. ARCH_0527 card enters center-right. |
| F2264–F2287 | 2006 becomes yellow. Three archive cards each receive one 8f hero emphasis via 3% camera crop, not card scale. |
| F2288–F2303 | Timeline and photo cards hold together. |
| F2304–F2319 | Timeline baseline bends/reshapes into outline of Vietnam map. |
| F2320–F2327 | Photo cards rearrange around emerging map positions. |

**Chronology label remains explicit:** recent archive is impact evidence, not 1997 photography.

---

# SCENE 15 — S04_SH04 — COMMUNITY MAP

**Frames:** F2328–F2447  
**Duration:** 120f / 5s  
**Component:** `CommunityMapScene`  
**Hero frame:** F2396

| Frames | Exact state/action |
|---|---|
| F2328–F2343 | Vietnam map fully formed center. |
| F2344–F2359 | `HÀ NỘI` pin enters north; ARCH_0521 card HAND_PLACE near it. |
| F2360–F2375 | `TP.HCM` pin enters south; ARCH_0529 card enters. |
| F2376–F2391 | `KON TUM` pin enters central highlands. |
| F2392–F2407 | ARCH_0426 card enters lower-right as cross-language/community bridge. Do not assert exact geography if metadata does not prove it. |
| F2408–F2423 | Thin connector lines pulse once from map pins toward cards. |
| F2424–F2439 | All three cards hold; camera SMOOTH scale 1.00→1.02. |
| F2440–F2447 | Map darkens. Cards slide outward. Large cream `2006` card rises from bottom. |

---

# SCENE 16 — S05_SH01 — 2006 HANDOFF

**Frames:** F2448–F2567  
**Duration:** 120f / 5s  
**Component:** `Handoff2006Scene`  
**Hero frame:** F2520

| Frames | Exact state/action |
|---|---|
| F2448–F2463 | Large `2006` settles top-center. |
| F2464–F2479 | Left name card `ĐOÀN MINH NAM` HAND_PLACE. Portrait only if verified. |
| F2480–F2495 | Right name card `NGUYỄN HOÀNG CUNG` HAND_PLACE. Use ARCH_0476/0479 only after identity confirmation. |
| F2496–F2511 | Yellow handoff arrow begins drawing left→right. |
| F2512–F2527 | Arrow completes and gives one PAPER_POP at tip. |
| F2528–F2543 | Small label `CHUYỂN GIAO` enters over arrow. |
| F2544–F2559 | Both name cards hold. No joke. |
| F2560–F2567 | Handoff arrow thickens and stretches edge-to-edge, becoming Viet–Úc connector in next scene. |

---

# SCENE 17 — S05_SH02 — VIET UC FAMILY REVEAL

**Frames:** F2568–F2663  
**Duration:** 96f / 4s  
**Component:** `VietUcNameRevealScene`  
**Hero frame:** F2628

| Frames | Exact state/action |
|---|---|
| F2568–F2583 | Full-width yellow connector line remains. Old title `STEVENSON SCHOLARSHIP PROGRAMME` sits above. |
| F2584–F2599 | Old title shrinks STEP2 to 60% and slides upper-left. No morph. |
| F2600–F2615 | Australia paper shape enters left; Vietnam paper shape enters right. |
| F2616–F2631 | `VIET UC FAMILY` PAPER_POP center. Yellow line connects the two country shapes behind it. |
| F2632–F2647 | Subtitle `2006 →` or `TÊN GỌI MỚI` enters small, depending final copy. |
| F2648–F2655 | Hold hero identity. |
| F2656–F2663 | Country shapes and connector expand outward; center opens into photo-collage window. |

---

# SCENE 18 — S05_SH03 — WHAT DAD BUILT

**Frames:** F2664–F2831  
**Duration:** 168f / 7s  
**Component:** `ValuesImpactScene`  
**Hero frame:** F2788

| Frames | Exact state/action |
|---|---|
| F2664–F2679 | ARCH_0407 fills 70% width as paper photo card. Text `TÀI CHÍNH` HAND_PLACE left. |
| F2680–F2695 | ARCH_0407 shifts left STEP2; ARCH_0448 card enters right. Text changes to `NIỀM TIN`. |
| F2696–F2711 | ARCH_0448 becomes hero via SMOOTH crop. `NIỀM TIN` yellow underline draws. |
| F2712–F2727 | ARCH_0460 enters center as group card. Text `HI VỌNG`. |
| F2728–F2743 | Three-card stack briefly visible. No more than 3 hero cards compete at once. |
| F2744–F2759 | Prior cards slide outward. ARCH_0428 (Dad celebrating) enters center and becomes full hero. |
| F2760–F2775 | Large phrase enters: `KHÔNG PHẢI TRẢ NỢ`. |
| F2776–F2791 | Yellow HIGHLIGHT_SWIPE behind full phrase. Music ducks. |
| F2792–F2815 | ARCH_0428 holds with subtle SMOOTH photo drift 1.00→1.025. No paper jitter on Dad face. |
| F2816–F2823 | All text except phrase fades; phrase reduces to smaller lower label. |
| F2824–F2831 | Archive photo card scales to a small centered rectangle, then flips via paper-mask replacement into DAD_REF_02 start card. No 3D flip. |

---

# SCENE 19 — S05_SH04 — DREAM. BELIEVE. DO.

**Frames:** F2832–F2879  
**Duration:** 48f / 2s  
**Component:** `DadEndCard`  
**Hero frame:** F2864

| Frames | Exact state/action |
|---|---|
| F2832–F2839 | DAD_REF_02 already centered, clean close portrait. Background cream or dark depending contrast test. |
| F2840–F2847 | `vietucfamily.org` SNAP_IN below face. |
| F2848–F2855 | `DREAM` appears. |
| F2856–F2863 | `BELIEVE` appears. |
| F2864–F2871 | `DO` appears, completing one line: `DREAM — BELIEVE — DO`. |
| F2872–F2879 | Absolute hold. No jitter. No extra transition. Audio resolves. |

---

# Cross-scene physical transition chain

The transitions are not independent presets. One physical element carries into the next scene:

```
Scene 01 → 02
serious paper composition
→ record-scratch poster slam

02 → 03
sports poster slides away
→ map underneath

03 → 04
game poster physically leaves
→ Adelaide map already below

04 → 05
Adelaide marker
→ yellow question underline

05 → 06
question underline
→ timeline baseline

06 → 07
route endpoint
→ portrait card

07 → 08
portrait card leaves
→ year timeline

08 → 09
1997 marker
→ notebook tab

09 → 10
criteria cards
→ network nodes

10 → 11
student nodes/cards
→ stack counted to 8

11 → 12
yellow highlight behind 8
→ Stevenson title highlight

12 → 13
title shrinks
→ network header

13 → 14
network connector
→ time axis

14 → 15
time axis
→ Vietnam-map outline

15 → 16
map darkens
→ 2006 card

16 → 17
handoff arrow
→ Viet–Úc connector

17 → 18
connector opens
→ archive photo window

18 → 19
archive card
→ single Dad portrait
```

## Remotion validation rules

Automated tests must assert:

1. first global frame = 0;
2. last global frame = 2879;
3. every frame 0–2879 belongs to exactly one scene;
4. every scene's documented intervals cover its full range without gap;
5. paper layers default to STEP2;
6. `Math.random()` is not used;
7. Dad face layers have no warp/deform filters;
8. factual names/years are Remotion text;
9. no AI-generated text is rendered;
10. scene 19 holds through frame 2879.

## Preview exports required before full render

For each scene export:
- start frame;
- 25%;
- 50%;
- 75%;
- final frame.

Also export the hero frames listed above.

If the five-frame trajectory preview does not make the scene understandable, revise the scene before rendering motion.
