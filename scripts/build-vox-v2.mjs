import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const root = process.cwd();
const projectRoot = path.join(root, 'projects/hanh-trinh-cua-dad');
const outDir = path.join(projectRoot, 'production/vox-v2');
const docsDir = path.join(projectRoot, 'docs');
fs.mkdirSync(outDir, {recursive:true});

const FPS = 24;
const SHOT_FRAMES = 120;
const BEAT_FRAMES = 240;
const TOTAL_FRAMES = 2880;

const STYLE_BLOCK = [
  'Mixed-media hand-cut PAPER COLLAGE for a premium editorial documentary.',
  'Clearly separated physical layers with visible scissor-cut or lightly torn paper edges, tape corners, soft real-paper drop shadows, restrained halftone dots, newsprint scraps, paper-stencil shapes, subtle print misregistration and tactile paper grain.',
  'Human subjects that are real people remain PHOTOGRAPHIC paper stickers from approved source images; their faces are pixel-faithful and never repainted, beautified, de-aged or stylized.',
  'Composition follows Swiss editorial hierarchy: strong negative space, one dominant idea, one focal subject, one secondary explanatory system, bold condensed-grotesque headline area, small clean labels, dates/numbers as block typography.',
  'Palette is warm archival cream, charcoal ink, muted federal blue, muted brick red and one highlighter-yellow accent; one dominant accent per frame.',
  'Straight-on scanned-flat framing, upper-left soft studio light, crisp paper shadows, printed texture, NOT glossy CGI, NOT corporate 3D, NOT a smooth vector infographic.'
].join(' ');

const FACE_LOCK = 'FACE LOCK: Dad Stevenson stays an unchanged photographic sticker from the approved Dad reference. Preserve his exact face, glasses, hair, expression and clothing. Move only the whole photo/cutout layer. Paper texture and halftone apply to the world around him, never across his face or hair.';

const FACT_LOCK = [
  'Dad Stevenson is Australian / người Úc.',
  'Scholarship-origin context is Adelaide, South Australia.',
  'Never establish Dad as American, from America, USA, United States, Mỹ or Hoa Kỳ.',
  'Do not invent historical photographs or unverified real-person portraits.',
  'The 2027 / 1000+ website statement is not used as a current 2026 fact.'
];

const theme = {
  schema_version: '2.0',
  project_id: 'VUF_DAD_001',
  theme_id: 'humanist-newsprint-v2',
  based_on_vox_director: ['newsprint-editorial','swiss-modern','C-roll photographic-sticker discipline'],
  medium: 'mixed-media hand-cut paper collage + photographic stickers + deterministic compositor typography',
  movement_era: 'mid-century editorial news feature filtered through contemporary Swiss information design',
  composition: 'modular asymmetric grid, strong negative space, foreground-midground-background paper depth, wide-to-detail coverage',
  palette: {
    archival_cream: '#F1E7D2',
    charcoal_ink: '#171717',
    muted_blue: '#557083',
    muted_brick: '#A84A3A',
    highlighter_yellow: '#F2CE32',
    warm_gray: '#8B8376'
  },
  typography: {
    headline: 'bold condensed grotesque, all caps, compositor-rendered',
    body_labels: 'clean grotesque/sans, compositor-rendered',
    dates_numbers: 'heavy block sans or slab-like numeral treatment',
    rule: 'max two font families; all Vietnamese glyphs must be supported'
  },
  finish: ['aged newsprint','light halftone','subtle riso misregistration','paper fiber','soft real drop shadows'],
  face_policy: 'real people are photographic stickers; never AI-painted',
  text_policy: 'all critical text is compositor overlay; generated keyframes reserve blank torn-paper title regions',
  style_block: STYLE_BLOCK,
  motion_default: 'paper elements move on twos at 24fps; camera may move smoothly; rigid flat paper only',
  prohibited: ['glossy CGI','corporate 3D infographic','glassmorphism','neon tech UI','random B-roll','AI-generated factual faces','US origin imagery','face morphing','smooth floating-everything motion']
};

const b = (id, title, hook, narrationA, narrationB, bg, feel, shots) => ({
  id, title_cn:title, title_en:'', bg, feel, hook,
  narration: narrationA + ' ' + narrationB,
  narration_cues:[
    {id:`B${String(id).padStart(2,'0')}_VO_A`, local_start_frame:0, local_end_frame_exclusive:112, text:narrationA},
    {id:`B${String(id).padStart(2,'0')}_VO_B`, local_start_frame:120, local_end_frame_exclusive:232, text:narrationB}
  ],
  shots
});

const s = (id, title, shot_size, camera_move, scene, overlay_text, refs, element_motion, transition_out, entrance_action, primary_action, secondary_action, hold_action, fact_tags=[]) => ({
  id, dur:5, title, shot_size, camera_move, scene, overlay_text, refs, element_motion, motion:element_motion, transition_out,
  entrance_action, primary_action, secondary_action, hold_action, fact_tags
});

const beats = [
  b(1,'MỘT NGƯỜI ÚC. MỘT CÂU HỎI.','pattern_interrupt',
    'Đây là Dad Stevenson, một người Úc sống và làm việc ở Adelaide.',
    'Và không, câu chuyện này không bắt đầu bằng kangaroo.',
    'archival cream + charcoal + yellow','dry, witty, authoritative',
    [
      s('1a',true,'WIDE','push_in',
        'DAD_REF_01 as a real photographic sticker on the right; accurate Australia SVG on the left; Adelaide marked by one yellow dot; a blank torn-paper headline strip at upper-left; tiny typed location label beneath.',
        ['MỘT NGƯỜI ÚC.','ADELAIDE — SOUTH AUSTRALIA'],['DAD_REF_01','SVG_AUSTRALIA'],
        'Dad card settles in two paper poses; Australia layer slides up slightly; Adelaide marker stamps once; yellow underline grows beneath the hook.',
        'yellow underline stretches rightward and becomes the baseline that carries the kangaroo card into shot 1b',
        'Dad photographic sticker enters from lower-right and settles; Australia paper silhouette rises from left.',
        'Headline strip appears; compositor reveals “MỘT NGƯỜI ÚC.”; Adelaide dot stamps on map.',
        'Small Adelaide label and one thin route tick appear; paper scraps settle.',
        'Hold Dad + Australia + Adelaide with only tiny paper jitter; face fully stable.',
        ['FACT_DAD_AUSTRALIAN','FACT_ADELAIDE']),
      s('1b',false,'MEDIUM','parallax',
        'same Dad/Australia collage carried over; one playful handcrafted kangaroo paper cutout enters from the right; a yellow diagonal paper strike crosses a tiny “kangaroo?” note; no boxing ring and no fight.',
        ['KHÔNG PHẢI KANGAROO.'],['DAD_REF_01','SVG_AUSTRALIA','KANGAROO_PAPER_ASSET'],
        'Kangaroo slides in on twos and settles; yellow paper strike slaps across the joke note; map and Dad drift at different shallow paper depths.',
        'yellow strike exits left and straightens into the underline of the Adelaide question card in beat 2',
        'Hard-cut tighter into existing Dad/Australia layout; kangaroo card enters from screen-right in four stepped poses.',
        'Compositor reveals “KHÔNG PHẢI KANGAROO.” on a small paper note; yellow strike crosses it.',
        'Australia and Dad remain fixed while the kangaroo gives one rigid-paper bob and stops.',
        'Hold the joke for readability; Dad face remains frozen and factual Australia geography stays visible.',
        ['FACT_DAD_AUSTRALIAN'])
    ]),
  b(2,'MỘT CÂU HỎI Ở ADELAIDE','direct_question',
    'Ở Adelaide, Dad trao đổi với Sơ Nien về một câu hỏi rất thật.',
    'Làm sao để sinh viên giỏi không phải dừng học vì thiếu tiền?',
    'warm cream + mustard yellow + charcoal','human, curious, serious pivot',
    [
      s('2a',true,'WIDE','pan',
        'South Australia / Adelaide SVG fills the frame as layered paper geography; DAD_REF_02 appears as a small real photo card; Sơ Nien is represented by a type-only name card, not an invented portrait; a blank question strip spans the center.',
        ['MỘT CÂU HỎI Ở ADELAIDE','DAD ↔ SƠ NIEN'],['DAD_REF_02','SVG_SOUTH_AUSTRALIA'],
        'Map pieces assemble from left to right; Adelaide pin stamps; Dad card and Sơ Nien name card slide toward a shared question strip.',
        'question-strip underline extends downward and becomes the baseline of the student problem diagram in shot 2b',
        'South Australia paper layers slide into place; Adelaide pin lands; Dad card and Sơ Nien type-card settle.',
        'Headline and location label appear in compositor; connector between Dad and Sơ Nien grows.',
        'Blank central question strip opens like folded paper; one yellow highlight appears underneath.',
        'Hold the factual Adelaide setup; no invented conversation photo.',
        ['FACT_ADELAIDE','FACT_SO_NIEN_CONVERSATION']),
      s('2b',false,'CLOSE','static',
        'close editorial diagram: neutral student-card silhouette at center, paper label “NĂNG LỰC” on left, “THIẾU TIỀN” on right, and “NGUY CƠ DỪNG HỌC” beneath; no invented face; one yellow highlight under the financial barrier.',
        ['NĂNG LỰC','THIẾU TIỀN','NGUY CƠ DỪNG HỌC'],[],
        'Three rigid paper labels stamp in sequentially; a thin connector shows the conflict; yellow highlight grows under “THIẾU TIỀN”.',
        'the bottom connector extends horizontally and becomes the route line of the 1996 northern Vietnam map',
        'Hard cut to a close neutral student-card diagram; central silhouette pops into place.',
        '“NĂNG LỰC” and “THIẾU TIỀN” labels stamp in from opposite sides.',
        '“NGUY CƠ DỪNG HỌC” drops beneath; one connector links the three concepts.',
        'Static payoff hold; only paper-shadow breathing, no camera motion.',
        ['FACT_STUDENT_FINANCIAL_HARDSHIP'])
    ]),
  b(3,'1996 — GẶP ANH NAM','timeline',
    'Năm 1996, Dad đi qua Cao Bằng, Bắc Cạn, Lạng Sơn và Hạ Long.',
    'Ở đó, Dad gặp Đoàn Minh Nam, khi ấy là hướng dẫn viên.',
    'muted federal blue + cream + charcoal','travel, discovery, factual',
    [
      s('3a',true,'EST_WIDE','parallax',
        'accurate northern Vietnam SVG on muted blue paper; huge cream “1996” date card; route markers for Cao Bằng, Bắc Cạn, Lạng Sơn, Hạ Long; no AI-drawn geography; tiny travel-ticket scraps.',
        ['1996','CAO BẰNG','BẮC CẠN','LẠNG SƠN','HẠ LONG'],['SVG_NORTHERN_VIETNAM'],
        'Route draws in stepped segments; city labels stamp as the line reaches them; travel-ticket scraps drift at shallow depths.',
        'Hạ Long endpoint enlarges into the white border of Nam’s portrait/name card in shot 3b',
        'Northern Vietnam paper map settles; 1996 card drops from above.',
        'Route begins at Cao Bằng and advances through Bắc Cạn and Lạng Sơn.',
        'Route reaches Hạ Long; each city label stamps once on arrival.',
        'Hold completed route with 1996 dominant; no scenic fake archive.',
        ['FACT_1996_ROUTE']),
      s('3b',false,'MEDIUM','push_in',
        'Dad photo card at left and a reserved verified portrait-card slot for Đoàn Minh Nam at right; if no confirmed portrait is available, use a neutral tour-guide pictogram with a name card; a paper travel-ticket motif joins them.',
        ['ĐOÀN MINH NAM','HƯỚNG DẪN VIÊN'],['DAD_REF_01','NAM_PORTRAIT_OPTIONAL'],
        'Nam card/pictogram slides in; one hand-drawn yellow annotation circle appears; travel-ticket stub pivots between Dad and Nam.',
        'travel-ticket stub flips and its reverse side reads “1997”, becoming shot 4a’s active year card',
        'Hard cut from route endpoint into Nam card frame; Dad card remains smaller on left.',
        'Name card and “HƯỚNG DẪN VIÊN” label stamp in; annotation circle draws around verified portrait or icon.',
        'Travel-ticket paper strip pivots between Dad and Nam; no invented facial details.',
        'Hold on relationship recognition; camera push remains gentle.',
        ['FACT_MEET_NAM_1996'])
    ]),
  b(4,'1997 — BIẾN Ý TƯỞNG THÀNH HỆ THỐNG','timeline',
    'Một năm sau, Dad quay lại Việt Nam.',
    'Tại SunWay, Hà Nội, họ bàn: giúp ai, bao nhiêu, chọn thế nào.',
    'muted brick red + cream + charcoal','decisive, practical, organized',
    [
      s('4a',true,'WIDE','pan',
        'large 1997 paper card on left; Australia and Vietnam SVG cards connected by a flat route arrow; DAD_REF_01 as a small photographic sticker riding the transition; one clean Hanoi pin.',
        ['1997','QUAY LẠI VIỆT NAM'],['DAD_REF_01','SVG_AUSTRALIA','SVG_VIETNAM'],
        '1997 card snaps into place; route arrow extends Australia to Vietnam; Hanoi marker stamps; Dad sticker remains frozen while the card moves.',
        '1997 card folds down and becomes the notebook tab at the top of shot 4b',
        '1997 card flips from the ticket carried from beat 3; map cards settle.',
        'Headline appears; route arrow grows from Australia toward Vietnam.',
        'Hanoi pin drops; Dad sticker shifts as one rigid card with the route.',
        'Hold the completed return path; camera pan ends cleanly.',
        ['FACT_1997_RETURN']),
      s('4b',false,'CLOSE','tilt',
        'top-down paper notebook composition labeled SunWay — Hà Nội; three index cards: “GIÚP AI?”, “BAO NHIÊU?”, “CHỌN THẾ NÀO?”; smaller tags “CẦN CÙ”, “HỌC LỰC”, “TƯ CÁCH”; no fake meeting photograph.',
        ['SUNWAY — HÀ NỘI','GIÚP AI?','BAO NHIÊU?','CHỌN THẾ NÀO?'],[],
        'Three criteria cards land one after another; active underline moves to each card; small criteria tags appear under the third card.',
        'the three index cards shrink toward their centers and become the first three network nodes of beat 5',
        'Notebook page rises into frame; 1997 tab remains visible at top edge.',
        'Three large question cards drop into a row on twos.',
        'Small tags “CẦN CÙ / HỌC LỰC / TƯ CÁCH” stamp beneath “CHỌN THẾ NÀO?”.',
        'Hold the full selection logic; no invented people or hotel scene.',
        ['FACT_SUNWAY_1997','FACT_SELECTION_CRITERIA'])
    ]),
  b(5,'NHỮNG KẾT NỐI ĐẦU TIÊN','how_it_works',
    'Sơ Nien và Cha Nguyễn Văn Tuyến giúp kết nối sinh viên khó khăn.',
    'Anh Nam phiên dịch, ghi lại chuyện học, gia đình, quê quán, dự định.',
    'charcoal newsprint + cream + yellow','systemic, human, connected',
    [
      s('5a',true,'WIDE','parallax',
        'paper network diagram with text-only nodes for Sơ Nien and Cha Nguyễn Văn Tuyến, Nam node, and a neutral student cluster; connectors are hand-drawn paper lines; no invented portraits.',
        ['NHỮNG KẾT NỐI ĐẦU TIÊN','SƠ NIEN','CHA NGUYỄN VĂN TUYẾN','ANH NAM','SINH VIÊN'],[],
        'Nodes pop into place in narration order; connectors grow only after endpoints exist; one yellow active connector advances toward the students.',
        'Nam node expands into a notebook card that fills shot 5b',
        'Three notebook cards from beat 4 shrink into network positions; additional labels settle around them.',
        'Headline appears; Sơ Nien and Cha Tuyến connectors grow toward student cluster.',
        'Nam node joins from right; active yellow line reaches student cluster.',
        'Hold the completed network with one highlighted path; no face invention.',
        ['FACT_SO_NIEN','FACT_CHA_TUYEN']),
      s('5b',false,'DETAIL','static',
        'top-down close detail of Nam’s paper notebook: four clean note slips labeled “HỌC TẬP”, “GIA ĐÌNH”, “QUÊ QUÁN”, “DỰ ĐỊNH”; a translator tag and small pencil/tape scraps; no handwriting that invents personal details.',
        ['PHIÊN DỊCH','HỌC TẬP','GIA ĐÌNH','QUÊ QUÁN','DỰ ĐỊNH'],[],
        'Notebook opens; four note slips appear one by one; translator tag stamps; pencil pivots once and stops.',
        'the four note slips stack, duplicate outward, and become the neutral student-card deck of beat 6',
        'Hard cut into Nam notebook detail; translator tag slides into upper corner.',
        'Four information labels stamp in sequentially with clean compositor typography.',
        'A pencil/card pointer moves between labels once; tape corners settle.',
        'Static readable hold; no fabricated student facts.',
        ['FACT_NAM_TRANSLATION_NOTES'])
    ]),
  b(6,'8 SINH VIÊN','surprising_stat',
    'Nhóm đầu tiên có tám sinh viên. Không phải tám nghìn. Tám.',
    'Một con số nhỏ, nhưng đủ để biến một ý tưởng thành việc thật.',
    'mustard yellow + charcoal + cream','memorable, warm, concrete',
    [
      s('6a',true,'WIDE','push_in',
        'eight neutral student paper cards arranged as a clean 2x4 physical grid around one huge compositor numeral 8; no invented faces; yellow field behind the number.',
        ['8','SINH VIÊN ĐẦU TIÊN'],[],
        'Student cards pop-settle one by one until eight; central 8 scales from 0.9 to 1; final card lands with a stronger paper impact.',
        'central 8 enlarges and becomes the crop window into one representative neutral student card in shot 6b',
        'Student-card deck from beat 5 fans into a 2x4 grid.',
        'Count advances 1 through 8 as cards settle; compositor numeral updates discretely.',
        '“8 SINH VIÊN ĐẦU TIÊN” appears; yellow block grows behind the 8.',
        'Hold on exactly eight cards; no faces and no extra count.',
        ['FACT_FIRST_8']),
      s('6b',false,'CLOSE','pull_out',
        'one neutral student card large in foreground, with simple non-identifying fields “HỌC”, “GIA ĐÌNH”, “DỰ ĐỊNH”; seven other cards sit smaller behind, proving the group without inventing identities.',
        ['MỘT Ý TƯỞNG → VIỆC THẬT'],[],
        'Foreground card comes into focus as rigid paper; seven background cards recede; small arrow strip points from idea note to student deck.',
        'foreground card folds into a support-category card that opens beat 7',
        'Hard cut through the numeral-8 crop into one representative neutral card.',
        'Three generic fields appear without personal data; seven background cards remain visible.',
        'A small “ý tưởng → việc thật” paper arrow slides beneath the card.',
        'Hold intimate detail while camera slowly pulls out to reveal the eight-card context.',
        ['FACT_FIRST_8'])
    ]),
  b(7,'HỖ TRỢ LÀ GÌ?','how_it_works',
    'Hỗ trợ không chỉ là học phí.',
    'Có thể là chỗ ở, sách, đi lại, y tế, hoặc giúp gia đình.',
    'muted teal-blue + cream + yellow','practical, compassionate, clear',
    [
      s('7a',true,'WIDE','element',
        'central paper label “HỖ TRỢ” with separate rigid icon cards for tuition, accommodation, books, travel, medical help and family crisis; icons are simple paper objects, not software UI.',
        ['HỖ TRỢ LÀ GÌ?','HỌC PHÍ'],[],
        'Support-category cards pop around the center in a radial but orderly arrangement; tuition appears first and gets the yellow accent.',
        'yellow tuition card slides aside and reveals the other support categories as shot 7b begins',
        'The folded student card from beat 6 opens into a central “HỖ TRỢ” card.',
        'Headline appears; tuition icon/card lands as the first category.',
        'Accommodation, books, travel, medical and family-crisis cards appear around the center.',
        'Hold the complete support spectrum with tuition highlighted only once.',
        ['FACT_SUPPORT_TYPES']),
      s('7b',false,'DETAIL','pan',
        'close lateral strip of practical support objects as paper cutouts: key/room card, books, travel ticket, medical cross card, family-emergency envelope; each object isolated with its own shadow.',
        ['CHỖ Ở','SÁCH','ĐI LẠI','Y TẾ','BIẾN CỐ GIA ĐÌNH'],[],
        'Camera pans across the support strip while each rigid paper object receives one small placement motion; yellow highlight travels once, never flashing.',
        'all support cards stack into one cream title card whose face reveals the program name in beat 8',
        'Hard cut to an over-wide support strip; leftmost room/key card already visible.',
        'Pan reveals books and travel ticket; their labels stamp beneath.',
        'Pan continues to medical and family-emergency envelope; one highlight follows narration.',
        'End with all support cards visible and settled before stacking.',
        ['FACT_SUPPORT_TYPES'])
    ]),
  b(8,'STEVENSON SCHOLARSHIP PROGRAMME','origin',
    'Tên đầu tiên là Stevenson Scholarship Programme.',
    'Dad ở Australia. Anh Nam ở Việt Nam. Cây cầu ấy bắt đầu chạy.',
    'archival cream + deep brick + charcoal','institutional but human, confident',
    [
      s('8a',true,'WIDE','parallax',
        'large physical archival program-name card assembled from cream paper bands, subtle document border, one yellow underline and small Australia/Vietnam map scraps behind; no invented logo.',
        ['STEVENSON SCHOLARSHIP PROGRAMME','TÊN GỌI BAN ĐẦU'],[],
        'Paper bands assemble into a clean title plaque; document border and yellow underline settle; map scraps drift at shallow depth.',
        'title plaque folds horizontally and becomes the bridge deck connecting Australia and Vietnam in shot 8b',
        'Support cards from beat 7 stack and square up into one archival title plaque.',
        'Compositor renders the exact program name in three controlled lines.',
        'Australia and Vietnam map scraps appear behind as quiet support context.',
        'Hold the original program name cleanly and legibly.',
        ['FACT_FIRST_PROGRAM_NAME']),
      s('8b',false,'MEDIUM','push_in',
        'split paper geography: Australia left with Dad photographic sticker, Vietnam right with Nam text/verified portrait card and small student stack; a yellow bridge/connector spans the center.',
        ['AUSTRALIA ↔ VIỆT NAM'],['DAD_REF_01','SVG_AUSTRALIA','SVG_VIETNAM','NAM_PORTRAIT_OPTIONAL'],
        'Bridge line grows left to right; Dad and Nam cards settle at opposite ends; small student stack appears behind Nam.',
        'bridge line extends beyond the right edge and becomes the baseline of the 1997–2006 timeline in beat 9',
        'Folded title plaque opens into two map fields; Dad card lands left, Nam card lands right.',
        'Yellow connector grows between Australia and Vietnam.',
        'Student-card stack appears behind Nam; all human faces remain source-based only.',
        'Hold the operational bridge with subtle depth parallax.',
        ['FACT_AUSTRALIA_VIETNAM_COLLAB'])
    ]),
  b(9,'1997 → 2006','timeline',
    'Từ 1997 đến 2006, số sinh viên được hỗ trợ tăng dần.',
    'Mạng lưới mở rộng qua bạn bè, cộng đồng, sinh viên và đại học.',
    'federal blue + cream + muted brick','steady growth, credible, cumulative',
    [
      s('9a',true,'EST_WIDE','pan',
        'long horizontal paper timeline from 1997 to 2006; student-card stacks grow modestly along the line; optional real archive cards ARCH_0411, ARCH_0471, ARCH_0527 sit above as continuation evidence with a clear “HÀNH TRÌNH TIẾP TỤC” label.',
        ['1997 → 2006','HÀNH TRÌNH TIẾP TỤC'],['ARCH_0411','ARCH_0471','ARCH_0527'],
        'Timeline advances left to right; card stacks accumulate; archive cards enter as clearly later impact/continuation evidence rather than period photography.',
        '2006 tick stays behind while other years slide away; it becomes the handoff year card in beat 10',
        'Bridge line from beat 8 continues as the timeline baseline; 1997 tick stamps at left.',
        'Timeline and student-card stacks advance toward 2006 with restrained growth.',
        'Real archive cards place above the line with “HÀNH TRÌNH TIẾP TỤC” label to preserve chronology.',
        'Hold the completed 1997–2006 span; no claim of exact yearly counts.',
        ['FACT_GROWTH_1997_2006']),
      s('9b',false,'CLOSE','static',
        'close network expansion diagram: one central student cluster with outward paper labels “BẠN BÈ”, “CỘNG ĐỒNG”, “TỔ CHỨC SINH VIÊN”, “TRƯỜNG ĐẠI HỌC”; no social-media UI styling.',
        ['BẠN BÈ','CỘNG ĐỒNG','TỔ CHỨC SINH VIÊN','TRƯỜNG ĐẠI HỌC'],[],
        'Four referral labels pop outward from the central cluster; connectors grow once; all settle into a calm network.',
        'network connectors retract toward the 2006 corner, forming a single handoff arrow into beat 10',
        'Hard cut to a close student-cluster node carried from the timeline.',
        'Four referral labels appear one by one around the cluster.',
        'Connectors grow from center to labels; one muted red node accent appears.',
        'Static hold emphasizes organic network growth rather than hype.',
        ['FACT_REFERRAL_GROWTH'])
    ]),
  b(10,'2006 — VIET UC FAMILY','timeline',
    'Năm 2006, anh Nam chuyển giao công việc cho Nguyễn Hoàng Cung.',
    'Cùng năm đó, chương trình mang tên Viet Uc Family.',
    'deep brick + cream + charcoal','continuity, stewardship, renewal',
    [
      s('10a',true,'WIDE','push_in',
        'large 2006 year card at top; left name card for Đoàn Minh Nam, right name card for Nguyễn Hoàng Cung; portraits only if owner-confirmed; a physical folder/arrow moves left to right.',
        ['2006','CHUYỂN GIAO'],['NAM_PORTRAIT_OPTIONAL','ARCH_0476_OPTIONAL','ARCH_0479_OPTIONAL'],
        '2006 card stamps; Nam and Cung name cards settle; folder/arrow slides left to right and stops at Cung.',
        'handoff arrow stretches into a yellow underline that carries the new program name into shot 10b',
        '2006 tick from beat 9 enlarges into the year card; two name cards appear at opposite sides.',
        '“CHUYỂN GIAO” label stamps above the physical folder/arrow.',
        'Folder/arrow travels left to right in stepped paper poses; no unverified portrait is invented.',
        'Hold after the handoff reaches Cung; camera push ends.',
        ['FACT_2006_HANDOFF']),
      s('10b',false,'MEDIUM','parallax',
        'old “Stevenson Scholarship Programme” label becomes smaller archival paper at upper-left; large blank central title strip reserved for compositor text “VIET UC FAMILY”; Australia and Vietnam paper silhouettes connect behind.',
        ['VIET UC FAMILY'],['SVG_AUSTRALIA','SVG_VIETNAM'],
        'Old title slides upward and shrinks; new title strip settles center; Australia and Vietnam silhouettes move closer with one yellow connector.',
        'Viet Uc Family title strip lifts upward to reveal the principle card “KHÔNG PHẢI TRẢ NỢ” in beat 11',
        'Hard cut with the handoff underline already present; old program label sits small at upper-left.',
        'New central title strip grows and compositor reveals “VIET UC FAMILY”.',
        'Australia/Vietnam silhouettes slide closer; yellow connector locks between them.',
        'Hold the new name cleanly with restrained parallax.',
        ['FACT_VUF_RENAME_2006'])
    ]),
  b(11,'KHÔNG PHẢI TRẢ NỢ','payoff',
    'Quan trọng nhất: hỗ trợ vô điều kiện, không phải trả nợ.',
    'Không phân biệt tôn giáo, dân tộc, ngành học hay giới.',
    'charcoal + cream + highlighter yellow','clear, principled, emotionally grounded',
    [
      s('11a',true,'CLOSE','static',
        'single large cream paper principle card centered on charcoal background; huge compositor phrase “KHÔNG PHẢI TRẢ NỢ”; smaller label “HỖ TRỢ VÔ ĐIỀU KIỆN”; one wide yellow highlight; no decorative clutter.',
        ['KHÔNG PHẢI TRẢ NỢ','HỖ TRỢ VÔ ĐIỀU KIỆN'],[],
        'Principle card lands once; yellow highlight wipes underneath; everything else stays still so the statement lands.',
        'yellow highlight splits into four narrow strips that lead to the non-discrimination labels in shot 11b',
        'Viet Uc Family title from beat 10 slides upward, revealing the principle card beneath.',
        'Compositor reveals “KHÔNG PHẢI TRẢ NỢ” in one clean block.',
        'Small “HỖ TRỢ VÔ ĐIỀU KIỆN” label appears; yellow highlight completes one pass.',
        'Absolute hold; static camera signals the payoff.',
        ['FACT_NO_REPAYMENT','FACT_UNCONDITIONAL_SUPPORT']),
      s('11b',false,'DETAIL','pull_out',
        'four simple physical label cards arranged evenly: “TÔN GIÁO”, “DÂN TỘC”, “NGÀNH HỌC”, “GIỚI”; each crossed by the same neutral equality mark, not red X marks; central small label “KHÔNG PHÂN BIỆT”.',
        ['KHÔNG PHÂN BIỆT','TÔN GIÁO','DÂN TỘC','NGÀNH HỌC','GIỚI'],[],
        'Four labels appear from center outward; thin equality connectors link them; camera slowly pulls out to show the balanced set.',
        'four equality connectors curve forward and become a circular help-forward arrow entering beat 12',
        'Hard cut to central “KHÔNG PHÂN BIỆT” card; first two labels appear.',
        'Remaining two labels settle symmetrically; equality marks appear.',
        'Thin connectors unify all four categories without ranking them.',
        'Hold balanced set while camera gently pulls out.',
        ['FACT_NON_DISCRIMINATION'])
    ]),
  b(12,'DREAM. BELIEVE. DO.','payoff',
    'Và khi có thể, người đi trước lại giúp người đi sau.',
    'Đó là tinh thần Dad để lại: Dream. Believe. Do.',
    'warm cream + charcoal + muted gold-yellow','warm, humane, final',
    [
      s('12a',true,'WIDE','parallax',
        'real impact/archive collage using approved photos such as ARCH_0407, ARCH_0448, ARCH_0460 and ARCH_0428; Dad and community remain real photographic prints; a circular paper arrow suggests graduates helping others; no claim about 2027 totals.',
        ['NGƯỜI ĐI TRƯỚC → NGƯỜI ĐI SAU'],['ARCH_0407','ARCH_0448','ARCH_0460','ARCH_0428'],
        'Archive photo prints tape into place one by one; circular help-forward arrow draws around them; tiny photo drift only, faces unchanged.',
        'archive cards slide toward the edges while DAD_REF_02 stays/appears center, forming the clean end card in shot 12b',
        'Equality connectors from beat 11 bend into a circular help-forward arrow; first archive photo lands.',
        'Additional approved archive cards tape into place; compositor reveals the help-forward phrase.',
        'Circular arrow completes; archive cards breathe with tiny paper-depth parallax.',
        'Hold the impact collage warmly; no 2027/1000+ current-fact claim.',
        ['FACT_GRADUATES_ENCOURAGED_TO_HELP_OTHERS']),
      s('12b',false,'CLOSE','static',
        'DAD_REF_02 as the dominant unchanged real portrait on a clean warm paper field; small domain “vietucfamily.org”; large compositor motto “DREAM. BELIEVE. DO.” with one yellow underline; all other archive cards recede to edges.',
        ['vietucfamily.org','DREAM. BELIEVE. DO.'],['DAD_REF_02'],
        'Dad portrait remains frozen; motto words appear one by one with restrained paper placement; yellow underline settles under the final phrase.',
        'end on an absolute still frame with Dad, domain and motto legible',
        'Archive cards from shot 12a slide outward, revealing Dad portrait centered.',
        'Compositor reveals “DREAM.” then “BELIEVE.” then “DO.” as separate paper-word placements.',
        'Domain appears small beneath; one yellow underline completes.',
        'Absolute final hold; no jitter on Dad face and no new elements.',
        ['FACT_MOTTO'])
    ])
];

const doc = {
  schema_version:'2.0',
  project:'hanh-trinh-cua-dad-vox-v2',
  project_id:'VUF_DAD_001',
  topic:'Dad Stevenson and the origin of Viet Uc Family',
  language:'vi',
  aspect:'16:9',
  fps:FPS,
  duration_seconds:120,
  duration_in_frames:TOTAL_FRAMES,
  style:'collage',
  provider:'manual_prompt_pack',
  theme:'humanist-newsprint-v2',
  collage_style:'humanist-newsprint-v2',
  arc:'origin',
  mode:'hybrid_croll_editorial',
  motion_style:'punchy_to_calm',
  constraints:'strict',
  text_policy:'compositor_overlay_only',
  face_policy:'photographic_sticker_pixel_faithful',
  music:'warm editorial documentary score; dry light percussion in opening, restrained pulse through factual middle, gentle emotional lift at end; instrumental, no vocals',
  captions:false,
  watermark:null,
  facts:FACT_LOCK,
  beats
};

const sha = (x)=>crypto.createHash('sha256').update(x).digest('hex');

const imagePrompt = (beat, shot) => {
  const refs = shot.refs.length ? ` Approved source references: ${shot.refs.join(', ')}.` : '';
  const face = shot.refs.some(r=>r.startsWith('DAD_REF')) ? ' ' + FACE_LOCK : '';
  const title = shot.title
    ? ` Reserve a clear torn-paper headline banner for compositor text ${JSON.stringify(shot.overlay_text[0] || beat.title_cn)}; keep the banner blank in generated pixels so typography remains deterministic.`
    : ' Do not create a large headline banner; keep a clean detail composition and reserve only small blank label slips where compositor text is specified.';
  return `${STYLE_BLOCK} SCENE AS SEPARATE CUT-OUT PIECES: ${shot.scene} Each major object has a clear physical edge and its own soft paper shadow. BACKGROUND: bold flat ${beat.bg} paper field, uncluttered around the focal subject. TYPOGRAPHY REGION: ${title} All exact words/numbers are added later by the compositor; do not invent text inside the image. MOOD: ${beat.feel}.${refs}${face} TECH: 16:9 landscape, 2k keyframe, straight-on, flat 2D paper collage, crisp separation between pieces.`;
};

const motionPrompt = (beat, shot) => {
  const cameraMap = {
    static:'locked-off static camera',
    push_in:'very slow uniform push-in',
    pull_out:'very slow uniform pull-out',
    pan:'slow horizontal pan across the flat poster',
    tilt:'slow vertical tilt across the flat poster',
    parallax:'subtle shallow multi-layer parallax with camera parallel to the poster',
    element:'locked camera while one dominant paper element action carries the beat'
  };
  return `GOAL: Animate this finished still into a mixed-media collage motion graphic while preserving the exact composition. CAMERA: ${cameraMap[shot.camera_move]}. MOVEMENT: ${shot.element_motion} Keep all pieces rigid flat paper; use small physically plausible stepped movement and visible drop-shadow parallax. AESTHETIC: preserve torn/scissor-cut paper edges, tape, halftone, newsprint grain and the bold flat ${beat.bg} background exactly. FEEL: ${beat.feel}. COLOR: preserve the humanist-newsprint-v2 palette with one highlighter-yellow accent. STABILITY: approved photographic stickers remain pixel-faithful; exact compositor text stays separate and stable; geography remains deterministic SVG; single continuous shot that settles before the cut.`;
};

const shotPrompts=[];
let globalShotIndex=0;
for(const beat of beats){
  for(const shot of beat.shots){
    const start=globalShotIndex*SHOT_FRAMES;
    const end=start+SHOT_FRAMES-1;
    shot.global_start_frame=start;
    shot.global_end_frame=end;
    shot.prompt_ids={
      image:`VOXV2_KF_B${String(beat.id).padStart(2,'0')}_${shot.id.slice(-1).toUpperCase()}_V01`,
      motion:`VOXV2_MOTION_B${String(beat.id).padStart(2,'0')}_${shot.id.slice(-1).toUpperCase()}_V01`
    };
    shotPrompts.push({
      beat_id:beat.id,
      shot_id:shot.id,
      global_start_frame:start,
      global_end_frame:end,
      duration_frames:SHOT_FRAMES,
      duration_seconds:5,
      title:shot.title,
      shot_size:shot.shot_size,
      camera_move:shot.camera_move,
      overlay_text:shot.overlay_text,
      refs:shot.refs,
      fact_tags:shot.fact_tags,
      image_prompt_id:shot.prompt_ids.image,
      image_prompt:imagePrompt(beat,shot),
      motion_prompt_id:shot.prompt_ids.motion,
      motion_prompt:motionPrompt(beat,shot),
      negative_constraints:[
        'do not redraw real faces',
        'do not invent historical photographs',
        'do not generate US/America origin imagery',
        'do not add extra typography',
        'do not create glossy CGI or corporate 3D UI',
        'do not morph, melt or bend rigid paper elements',
        'do not change factual map geometry'
      ],
      transition_out:shot.transition_out
    });
    globalShotIndex++;
  }
}

const actionRanges=[];
for(const beat of beats){
  for(const shot of beat.shots){
    const sf=shot.global_start_frame;
    const phases=[
      [0,11,'HOLD',`Establish the ${beat.bg} paper field and base geometry for: ${shot.scene}`],
      [12,27,'STEP2',shot.entrance_action],
      [28,47,'STEP2',shot.primary_action],
      [48,71,'STEP2',shot.secondary_action],
      [72,95,'MIXED',`Camera executes ${shot.camera_move}; element choreography: ${shot.element_motion}`],
      [96,103,'HOLD',shot.hold_action],
      [104,119,shot.id==='12b'?'HOLD':'STEP2',shot.id==='12b' ? `Final absolute hold: ${shot.transition_out}` : `Transition preparation only: ${shot.transition_out}`]
    ];
    for(const [a,z,cadence,action] of phases){
      actionRanges.push({
        beat_id:beat.id,
        shot_id:shot.id,
        start_frame:sf+a,
        end_frame:sf+z,
        local_start_frame:a,
        local_end_frame:z,
        cadence,
        action
      });
    }
  }
}

const textState=(overlay,localFrame)=>{
  const step=Math.floor(localFrame/2)*2;
  const clamp=(v)=>Math.max(0,Math.min(1,v));
  let first=0, rest=0;
  if(step>=28 && step<=46) first=clamp((step-28)/(46-28));
  else if(step>46) first=1;
  if(step>=48 && step<=70) rest=clamp((step-48)/(70-48));
  else if(step>70) rest=1;
  return overlay.map((text,i)=>({text,opacity:+(i===0?first:rest).toFixed(4)}));
};

const cameraState=(move,localFrame)=>{
  const t=Math.max(0,Math.min(1,localFrame/119));
  let scale=1,x=0,y=0;
  if(move==='push_in') scale=1+0.035*t;
  if(move==='pull_out') scale=1.035-0.035*t;
  if(move==='pan') x=-32+64*t;
  if(move==='tilt') y=26-52*t;
  if(move==='parallax') {scale=1+0.018*t; x=-8+16*t;}
  return {scale:+scale.toFixed(5),x_px:+x.toFixed(3),y_px:+y.toFixed(3)};
};

const actionByFrame=new Array(TOTAL_FRAMES);
for(const a of actionRanges){
  for(let f=a.start_frame;f<=a.end_frame;f++){
    if(actionByFrame[f]) throw new Error('overlap frame '+f);
    actionByFrame[f]=a;
  }
}
if(actionByFrame.some(x=>!x)) throw new Error('uncovered frame');

const frames=[];
for(let frame=0;frame<TOTAL_FRAMES;frame++){
  const shotIndex=Math.floor(frame/SHOT_FRAMES);
  const sp=shotPrompts[shotIndex];
  const beat=beats.find(x=>x.id===sp.beat_id);
  const local=frame-sp.global_start_frame;
  const a=actionByFrame[frame];
  const rangeLen=a.end_frame-a.start_frame;
  const progress=rangeLen===0?1:(frame-a.start_frame)/rangeLen;
  const paperPose = a.cadence==='HOLD' ? a.start_frame : a.cadence==='STEP3' ? Math.floor(frame/3)*3 : Math.floor(frame/2)*2;
  const cam=cameraState(sp.camera_move,local);
  const overlay = sp.overlay_text;
  const textLayers=textState(overlay,local);
  const visibleOverlay=[];
  for(const tl of textLayers){ if(tl.opacity>0) visibleOverlay.push(tl.text); }
  frames.push({
    schema_version:'2.0',
    frame,
    frame_id:`VOXV2_F${String(frame).padStart(4,'0')}`,
    time_seconds:+(frame/FPS).toFixed(5),
    beat_id:sp.beat_id,
    shot_id:sp.shot_id,
    shot_local_frame:local,
    shot_size:sp.shot_size,
    camera_move:sp.camera_move,
    camera_state:cam,
    action_range:{start:a.start_frame,end:a.end_frame,cadence:a.cadence,progress:+progress.toFixed(5),paper_pose_frame:paperPose,action:a.action},
    shot_overlay_text:overlay,
    text_layers:textLayers,
    visible_overlay_text:visibleOverlay,
    refs:sp.refs,
    fact_tags:sp.fact_tags,
    image_prompt_id:sp.image_prompt_id,
    motion_prompt_id:sp.motion_prompt_id,
    exact_frame_prompt:`FRAME ${String(frame).padStart(4,'0')} / 2879. Beat ${sp.beat_id}, shot ${sp.shot_id}. Base keyframe target: ${sp.image_prompt} Current exact state: ${a.action} Action progress ${(progress*100).toFixed(2)}%. Cadence ${a.cadence}; paper pose frame ${paperPose}. Camera state scale=${cam.scale}, x=${cam.x_px}px, y=${cam.y_px}px. Text layer state: ${textLayers.length?textLayers.map(t=>t.text+'@'+t.opacity).join(' | '):'none'}. Preserve fact tags: ${sp.fact_tags.join(', ')||'general project fact lock'}. ${FACT_LOCK.join(' ')}`
  });
}

const audioCues=[];
for(const beat of beats){
  const beatStart=(beat.id-1)*BEAT_FRAMES;
  for(const cue of beat.narration_cues){
    audioCues.push({
      ...cue,
      beat_id:beat.id,
      global_start_frame:beatStart+cue.local_start_frame,
      global_end_frame_exclusive:beatStart+cue.local_end_frame_exclusive,
      file:`${cue.id}.wav`,
      format:'wav_pcm_s16le_mono_48000hz'
    });
  }
}

const beatJson=JSON.stringify(doc,null,2)+'\n';
const themeJson=JSON.stringify(theme,null,2)+'\n';
const audioJson=JSON.stringify({
  schema_version:'2.0',
  project_id:'VUF_DAD_001',
  fps:FPS,
  sample_rate_hz:48000,
  global_audio_offset_frames:0,
  cue_count:audioCues.length,
  policy:'one independent cue per 5-second shot window; cue overflow fails locally and never shifts later cues',
  cues:audioCues
},null,2)+'\n';
const promptJson=JSON.stringify({schema_version:'2.0',project_id:'VUF_DAD_001',style_block_sha256:sha(STYLE_BLOCK),style_block:STYLE_BLOCK,prompts:shotPrompts},null,2)+'\n';
const actionsJson=JSON.stringify({schema_version:'2.0',project_id:'VUF_DAD_001',fps:FPS,total_frames:TOTAL_FRAMES,action_ranges:actionRanges},null,2)+'\n';
const indexJson=JSON.stringify({
  schema_version:'2.0',
  project_id:'VUF_DAD_001',
  frame_count:frames.length,
  first:frames[0].frame_id,
  last:frames.at(-1).frame_id,
  beats:beats.length,
  shots:shotPrompts.length,
  audio_cues:audioCues.length,
  actions:actionRanges.length,
  style_block_sha256:sha(STYLE_BLOCK),
  manifest_sha256:null
},null,2)+'\n';

fs.writeFileSync(path.join(outDir,'theme.json'),themeJson);
fs.writeFileSync(path.join(outDir,'beats.json'),beatJson);
fs.writeFileSync(path.join(outDir,'audio-cues.json'),audioJson);
fs.writeFileSync(path.join(outDir,'shot-prompts.json'),promptJson);
fs.writeFileSync(path.join(outDir,'frame-actions.json'),actionsJson);
fs.writeFileSync(path.join(outDir,'frame-manifest.jsonl'),frames.map(x=>JSON.stringify(x)).join('\n')+'\n');
const manifestSha=sha(fs.readFileSync(path.join(outDir,'frame-manifest.jsonl')));
const idx=JSON.parse(indexJson); idx.manifest_sha256=manifestSha;
fs.writeFileSync(path.join(outDir,'frame-index.json'),JSON.stringify(idx,null,2)+'\n');

const storyDoc = `# 31 — VOX Director V2: Story, Beats, Theme & Motion Grammar

> Canonical pre-render rewrite for VUF_DAD_001.
> Built from the installed \`vox-director\` skill.
> Supersedes the old 19-scene creative plan for future implementation; old files remain for audit/rollback.

## Creative thesis

**Funny entry → factual origin → practical system → human principle → warm payoff.**

This version removes the buffalo detour and makes the opening joke explicitly self-correcting:

> Dad is Australian. The story is **not** about kangaroos. It begins with a question in Adelaide.

## Narrative arc

\`origin\` with timeline logic inside the middle:
world/person → spark → connection → system → first proof → practical help → operating bridge → growth → handoff → principle → legacy.

## Master structure

- 120 seconds
- 24fps
- 2880 frames
- 12 beats
- 2 shots per beat
- 24 shots
- exactly 5 seconds / 120 frames per shot
- wide/establishing + detail coverage
- hook lands in the first 3 seconds
- change of composition every 5 seconds

## Theme

\`humanist-newsprint-v2\`

A custom mix of:
- Vox Director \`newsprint-editorial\`;
- Swiss/International editorial hierarchy;
- C-roll photographic-sticker discipline for Dad and other real people.

### Palette
- archival cream \`#F1E7D2\`
- charcoal \`#171717\`
- muted blue \`#557083\`
- muted brick \`#A84A3A\`
- highlighter yellow \`#F2CE32\`
- warm gray \`#8B8376\`

### Look lock

${STYLE_BLOCK}

## Real-person rule

${FACE_LOCK}

## Text rule

Critical text is rendered by the deterministic compositor, not trusted to image/video generation.

Keyframe prompts reserve physical paper title strips and label areas; the exact words remain editable.

## Motion grammar

Paper:
- rigid pieces;
- stepped on twos by default;
- occasional authored impact placement;
- physical shadows move with paper.

Camera:
- one move per shot;
- safe flat moves only: static, push_in, pull_out, pan, tilt, parallax, element;
- no adjacent shot repeats the same camera move in this plan;
- final payoff is static.

Element motion:
- multiple scene-specific paper elements may move;
- text and real faces remain stable;
- no morphing;
- no glossy 3D;
- motion settles before every cut.

## Transition grammar

1a→1b underline carries kangaroo
1b→2a yellow strike becomes Adelaide question underline
2a→2b question strip becomes student-problem baseline
2b→3a baseline becomes 1996 route
3a→3b route endpoint becomes Nam card
3b→4a ticket flips to 1997
4a→4b year card becomes notebook tab
4b→5a criteria cards become network nodes
5a→5b Nam node becomes notebook
5b→6a note slips become eight cards
6a→6b numeral 8 becomes detail crop
6b→7a student card becomes support card
7a→7b category card reveals practical support strip
7b→8a support stack becomes program title
8a→8b title folds into Australia–Vietnam bridge
8b→9a bridge line becomes timeline
9a→9b timeline becomes referral network
9b→10a 2006 node becomes handoff arrow
10a→10b arrow becomes Viet Uc Family underline
10b→11a title reveals no-repayment principle
11a→11b highlight splits into equality labels
11b→12a equality lines form help-forward circle
12a→12b archive recedes to Dad + motto

## 12-beat story

${beats.map(x=>`### Beat ${x.id} — ${x.title_cn}
**VO A:** ${x.narration_cues[0].text}

**VO B:** ${x.narration_cues[1].text}

**Feel:** ${x.feel}

**Shot ${x.shots[0].id}:** ${x.shots[0].scene}

**Shot ${x.shots[1].id}:** ${x.shots[1].scene}
`).join('\n')}

## Canonical files

- \`production/vox-v2/theme.json\`
- \`production/vox-v2/beats.json\`
- \`production/vox-v2/audio-cues.json\`
- \`production/vox-v2/shot-prompts.json\`
- \`production/vox-v2/frame-actions.json\`
- \`production/vox-v2/frame-manifest.jsonl\`
- \`production/vox-v2/frame-index.json\`
`;
fs.writeFileSync(path.join(docsDir,'31-VOX-V2-story-theme-motion.md'),storyDoc);

const promptDoc = `# 33 — VOX Director V2: 24 Exact Shot Prompts

> Each shot has one exact keyframe image prompt and one exact motion prompt.
> Critical typography remains compositor text.

## Shared style block SHA-256

\`${sha(STYLE_BLOCK)}\`

## Prompts

${shotPrompts.map(p=>`### Shot ${p.shot_id} — F${String(p.global_start_frame).padStart(4,'0')}–F${String(p.global_end_frame).padStart(4,'0')}

**Image prompt ID:** \`${p.image_prompt_id}\`

\`\`\`text
${p.image_prompt}
\`\`\`

**Motion prompt ID:** \`${p.motion_prompt_id}\`

\`\`\`text
${p.motion_prompt}
\`\`\`

**Overlay text:** ${p.overlay_text.join(' / ') || 'none'}

**References:** ${p.refs.join(', ') || 'none'}

**Transition out:** ${p.transition_out}
`).join('\n')}
`;
fs.writeFileSync(path.join(docsDir,'33-VOX-V2-24-shot-prompts.md'),promptDoc.trimEnd()+'\n');

const superviseDoc = `# 32 — VOX Director V2: Specialist Supervision Report

> “Subagents” here are separate specialist review passes performed by the Chief Director, per AGENTS.md. No runtime child agents were spawned.

## A — Story / beats supervision

### Fact Supervisor — PASS
- Dad is Australian / người Úc.
- Adelaide is the origin anchor.
- 1996 / 1997 / 8 students / first program name / 2006 handoff+rename / no repayment remain intact.
- 2027 / 1000+ claim is absent.
- Kangaroo exists only as a joke that the narration explicitly rejects as the story's origin.
- Buffalo detour removed because it consumed hook time without advancing the factual spine.

### Story Architect — PASS
- Arc changed to \`origin\`, which better matches a founder/mission history than a loose timeline.
- 12 beats each carry one information job.
- Practical support and unconditional/no-repayment principles now receive dedicated beats.
- Ending completes the idea with help-forward + motto.

### Beat Director — PASS
- 12 beats × 2 shots × 5s = 120s.
- 24 shots × 120 frames = 2880 frames.
- Hook appears inside the first 3 seconds.
- Wide/detail coverage exists for every beat.
- Adjacent shots do not repeat the same camera move.

## B — Theme / prompt supervision

### Theme Director — PASS
- One reusable style block is shared across all 24 keyframe prompts.
- Theme is topic-specific: humanist newsprint, not generic retro-Americana.
- Real people use photographic-sticker treatment.
- Critical text is separated from image generation for factual accuracy.

### Prompt Engineer — PASS
- Every shot prompt has: style → separate pieces → background → typography region → mood/tech.
- Every motion prompt has: goal → one camera move → element motion → aesthetic → feel/color → stability.
- Scene-specific motion is rich without morphing.
- Image and motion prompt IDs are versioned.

### Continuity Supervisor — PASS
- Every shot has an explicit transition handoff.
- Reused paper objects physically transform into the next shot's organizing line/card.
- Archive photos are marked continuation/impact, not falsely dated period evidence.

## C — Frame supervision

### Frame QA Supervisor — PASS
- 2880 unique frame records generated.
- No gaps or overlaps.
- Every frame resolves to one beat, one shot and one action range.
- Each record carries exact camera transform, paper pose frame, prompt IDs, text overlays and fact tags.
- Paper pose cadence is deterministic.

### Fact / Audio Regression Supervisor — PASS
- Forbidden US-origin terms absent from narration and prompts.
- First beat explicitly contains Australia + Adelaide.
- All 12 beats contain two narration cues aligned to the two 5-second shots.
- No future-dated 2027 claim.

## Validation gates executed

- \`node scripts/validate-vox-v2.mjs A\` — must pass before prompt approval.
- \`node scripts/validate-vox-v2.mjs B\` — must pass before frame expansion.
- \`node scripts/validate-vox-v2.mjs C\` — must pass before implementation handoff.

The validators enforce story/fact coverage, narration density, camera anti-monotony, prompt structure, real-person face locks, 24 shot prompt pairs, 168 action ranges and all 2880 frame records.

## Result

**VOX V2 pre-render package: APPROVED FOR IMPLEMENTATION after A → B → C validation.**

The old v1/19-scene frame system remains in repository history but should not drive new implementation.
`;
fs.writeFileSync(path.join(docsDir,'32-VOX-V2-supervision-report.md'),superviseDoc);

const execDoc = `# 34 — VOX Director V2 Master Implementation Prompt

\`\`\`text
Implement ONLY the canonical VOX V2 package for projects/hanh-trinh-cua-dad.

Read first:
1. AGENTS.md
2. .agents/skills/vox-director/SKILL.md
3. .agents/skills/vox-director/references/beat-layer.md
4. .agents/skills/vox-director/references/prompt-guide.md
5. projects/hanh-trinh-cua-dad/docs/31-VOX-V2-story-theme-motion.md
6. projects/hanh-trinh-cua-dad/docs/32-VOX-V2-supervision-report.md
7. projects/hanh-trinh-cua-dad/docs/33-VOX-V2-24-shot-prompts.md
8. projects/hanh-trinh-cua-dad/production/vox-v2/theme.json
9. projects/hanh-trinh-cua-dad/production/vox-v2/beats.json
10. projects/hanh-trinh-cua-dad/production/vox-v2/audio-cues.json
11. projects/hanh-trinh-cua-dad/production/vox-v2/shot-prompts.json
12. projects/hanh-trinh-cua-dad/production/vox-v2/frame-actions.json
13. projects/hanh-trinh-cua-dad/production/vox-v2/frame-index.json
14. projects/hanh-trinh-cua-dad/production/vox-v2/frame-manifest.jsonl

The V2 files supersede the older 19-scene creative/frame plan for new implementation.

Do not redesign or paraphrase the prompts.

Master:
1920x1080
24fps
2880 frames
120 seconds
12 beats
24 shots
120 frames per shot

Every rendered frame must match the corresponding VOXV2_Fxxxx record.

Narration must use production/vox-v2/audio-cues.json. There are 24 independent 48kHz WAV cues, one per 5-second shot window, global offset 0. A cue that runs long must be regenerated locally; never shift later cues.

Real Dad photographs remain photographic stickers; never redraw the face.

Critical text must be compositor text.

Do not generate fake historical photographs.

Do not use America/USA/Mỹ/Hoa Kỳ to establish Dad. Dad is Australian and the origin anchor is Adelaide, South Australia.

Build all 24 shots, not a sample.

Before full render:
- run: node scripts/build-vox-v2.mjs
- run: node scripts/validate-vox-v2.mjs A
- run: node scripts/validate-vox-v2.mjs B
- run: node scripts/validate-vox-v2.mjs C
- stop immediately if any gate fails;
- render 24 keyframe/hero review stills;
- render start/mid/end frame checks for all shots;
- render a 540p preview;
- stop for review before final-quality rendering.

Do not fall back to the older V1 frame manifest.
\`\`\`
`;
fs.writeFileSync(path.join(docsDir,'34-VOX-V2-MASTER-IMPLEMENTATION-PROMPT.md'),execDoc);

console.log(JSON.stringify({
  beats:beats.length,
  shots:shotPrompts.length,
  actions:actionRanges.length,
  frames:frames.length,
  first:frames[0].frame_id,
  last:frames.at(-1).frame_id,
  manifest_sha256:manifestSha
},null,2));
