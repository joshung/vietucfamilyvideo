# 17 — Voice-over Lock v02

> This version supersedes v01.
> Exact timing lives in `production/audio/voiceover-cues.json`.

## Voice direction

Vietnamese narrator:
- warm;
- intelligent;
- lightly deadpan during the first 24 seconds;
- factual and increasingly sincere after 0:24;
- no exaggerated trailer voice;
- no rushed delivery.

## Critical fact lock

Opening identity:

**Dad Stevenson is Australian — một người Úc.**

Scholarship-origin context:

**Adelaide, South Australia.**

Never narrate Dad as American / from America / USA / Mỹ / Hoa Kỳ / United States.

## Locked narration by scene

### 00:00–00:06 — S01_SH01

Đây là Dad Stevenson.

Một người Úc.

Sống và làm việc tại Adelaide.

### 00:06–00:14 — S01_SH02

Kangaroo. Người Úc khó tránh.

Phiên bản điện ảnh bảo Dad thắng luôn.

Tái hiện này bịa.

### 00:14–00:24 — S01_SH03

Rồi Dad sang Việt Nam.

Mục tiêu tiếp theo: con trâu.

May mà...

chuyện thật hay hơn.

### 00:24–00:31 — S02_SH01

Chuyện thật bắt đầu ở Adelaide, Nam Úc.

Nơi Dad sống và làm việc.

### 00:31–00:38 — S02_SH02

Dad hỏi Sơ Nien:

Làm sao để sinh viên không phải bỏ học vì nghèo?

### 00:38–00:45 — S02_SH03

Năm 1996, Dad đi qua Cao Bằng, Bắc Cạn, Lạng Sơn và Hạ Long.

### 00:45–00:51 — S02_SH04

Dad gặp anh Đoàn Minh Nam, lúc đó là hướng dẫn viên.

### 00:51–00:58 — S03_SH01

Năm 1997, Dad quay lại Việt Nam.

Học bổng bắt đầu thành hình.

### 00:58–01:05 — S03_SH02

Tại SunWay, Hà Nội,

Dad và anh Nam bàn: giúp ai, bao nhiêu, chọn thế nào.

### 01:05–01:13 — S03_SH03

Qua Cha Nguyễn Văn Tuyến, sinh viên khó khăn được giới thiệu.

Anh Nam phiên dịch, ghi chép.

### 01:13–01:20 — S03_SH04

Nhóm đầu tiên Dad hỗ trợ có tám sinh viên.

Không phải tám nghìn.

Tám.

### 01:20–01:26 — S04_SH01

Tên đầu tiên là Stevenson Scholarship Programme.

### 01:26–01:31 — S04_SH02

Dad ở Australia.

Anh Nam ở Việt Nam.

### 01:31–01:37 — S04_SH03

Từ 1997 đến 2006, số sinh viên được hỗ trợ tăng dần.

### 01:37–01:42 — S04_SH04

Bạn bè và cộng đồng nối thêm những cánh tay.

### 01:42–01:47 — S05_SH01

Năm 2006, anh Nam chuyển giao công việc cho Nguyễn Hoàng Cung.

### 01:47–01:51 — S05_SH02

Cũng năm đó, chương trình mang tên Viet Uc Family.

### 01:51–01:58 — S05_SH03

Không chỉ tiền.

Còn niềm tin và hi vọng.

Vô điều kiện.

Không phải trả nợ.

### 01:58–02:00 — S05_SH04

Dream.

Believe.

Do.

## Timing policy

Do not synthesize this as one long audio file.

Use the exact 35 cue windows in:

`production/audio/voiceover-cues.json`

This prevents cumulative drift.

Do not speed-read to force a long paragraph into a scene.

If a generated cue is too long:
- regenerate that cue;
- or create an explicitly approved shorter cue version;
- never move later cues.

## Final motto

Preferred:
Dad's authentic voice.

Fallback:
narrator.

Both must use the same exact cue window.
