> Historical discovery snapshot. Superseded by .planning/PROJECT.md, REQUIREMENTS.md, ROADMAP.md and discovery/completion-record.md after J approvals on 2026-10-19.

# Portfolio initialization review — 2026-10-19

## Completed

- I20 duyệt lập hồ sơ/lộ trình, mục chưa có vẫn ghi chờ.
- PROJECT.md đã tạo và commit bước 4 (`d70c3a2`). Chưa hoàn tất new-project.
- Bản trả lời bổ sung giữ nguyên 160 câu cũ, có 19 câu I đã trả lời; I02 không áp dụng sau I01.
- F12 → I01: bỏ sở thích. H06 → I03: giữ mục tiêu/thêm thời gian. A17/G17 → I04/I05: công khai Thành phố Hồ Chí Minh, làm từ xa trao đổi riêng.
- Nhạc tìm thấy ở `D:/Projects/Flutter/VixieAI/BoogieDown.mp3.mpeg`, 4,220,062 byte. Chưa copy/phát/đo thời lượng.
- PDF hoặc liên kết; lỗi tệp giữ lời nhắn; nhạc nhớ trong phiên và hạ khi minh họa có tiếng.

## Proposals ready for one review

- `requirements-proposal.md`: 58 yêu cầu có nguồn, gán đúng một chặng/yêu cầu.
- `roadmap-proposal.md`: 7 chặng, 3–4 tiêu chí mỗi chặng, chưa dự báo thời lượng.
- `initialization-proposal.json`: dữ liệu nguồn của bộ đề xuất, trạng thái chưa duyệt.
- `project-questions.html`: vẫn một HTML không CSS; thêm vùng J 20 câu nghiệp vụ về cách phối hợp, bản đề xuất và câu chữ. Câu cũ giữ để đối chiếu.

## Runtime constraints already decided

- Inline, tuần tự, không subagent; không hỏi lại để đổi ràng buộc này.
- Dùng model của phiên hiện tại; không đổi model hoặc spawn ngầm. `model_profile=inherit` là adapter của runtime khi tạo config, không phải lựa chọn chất lượng mới.
- Chưa ghi config.json với preferences chưa trả lời. Không lấy runtime antigravity trong defaults toàn cục làm runtime thật của chat Codex.

## Workflow preference mapping to collect

| Câu | Nội dung cần chốt |
|---|---|
| J01 | Tiếp tục trong phạm vi hay chờ xem từng chặng |
| J02 | Độ chia nhỏ chặng (coarse/standard/fine) |
| J03 | Lưu hồ sơ trong lịch sử dự án hay local-only từ đây |
| J04 | Lượt nghiên cứu tổng thể trước khi chốt phạm vi |
| J05 | Nghiên cứu trước mỗi chặng / theo vướng mắc / không lượt riêng |
| J06 | Kiểm tra cách làm dự kiến; giữ đúng điều kiện được chọn |
| J07 | Kiểm chứng sau chặng; không bỏ kiểm tra bắt buộc của hành vi được hứa |
| J08 | Đối chiếu thay đổi dữ kiện với điều đã chốt |
| J09–J12 | Các mục bản bàn giao: stories/acceptance, dependencies, release criteria, owner review |
| J13 | Chặng có luồng dùng được hoặc tổ chức từng lớp |
| J14–J16 | Chọn nháp copy; chưa đưa lên site khi chưa có lựa chọn |
| J17/J18 | Chốt phạm vi và lộ trình cụ thể |
| J19/J20 | Cách xem hướng thiết kế, giới hạn còn thiếu |

## Content drafts — not approved facts

### Hero

1. VI: Biến ý tưởng thành ứng dụng có thể dùng, có cá tính, có mục đích.
   EN: Turning ideas into usable applications with character and purpose.
2. VI: Xây ứng dụng hoàn chỉnh, bắt đầu từ điều người dùng cần.
   EN: Building complete applications, starting with what people need.
3. VI: Từ ý tưởng đến trải nghiệm ứng dụng rõ ràng và có dấu ấn.
   EN: From ideas to clear, distinctive app experiences.

### Vixie headline

Các câu dưới đây chỉ mô tả sản phẩm từ thông tin hiện có, không khẳng định vai trò cá nhân.

1. Vixie — Hình nền sống, cùng một người bạn AI.
2. Vixie — Đưa nhân vật AI vào trải nghiệm hình nền hằng ngày.
3. Vixie — Từ ý tưởng hình nền động đến trải nghiệm đồng hành.

Vai trò cá nhân Vixie vẫn cần nguồn/duyệt; website đặt xe và game chờ cung cấp theo I16/I17. Không lấy câu giới thiệu sản phẩm thay bằng chứng vai trò.

### Chữ ký

1. Bùi Bảo Long — Ý tưởng thành trải nghiệm. / Ideas into experiences.
2. Bùi Bảo Long — Xây điều có ý nghĩa. / Building what matters.
3. Bùi Bảo Long — Còn nhiều điều để xây. / More to build.

## Narrow reference checks already made

- [Apple Materials](https://developer.apple.com/design/human-interface-guidelines/materials): phân biệt lớp điều khiển/điều hướng bằng Liquid Glass, dùng có chừng mực và giữ độ rõ. Áp dụng sang web là suy luận thiết kế; không phải web có API native Apple hay một thiết kế cụ thể đã duyệt.
- [EmailJS file attachments](https://www.emailjs.com/docs/user-guide/file-attachments/): hỗ trợ gửi nội dung tệp hoặc file input qua sendForm; cấu hình attachment ở email template vẫn là phụ thuộc. Chưa biết tài khoản/template hiện tại hay giới hạn thực tế; chưa gửi thử.
- [MDN autoplay](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Autoplay): chính sách phát phụ thuộc tương tác và trình duyệt. E19/I07 đã chọn bắt đầu chủ động, yên lặng ở lần mở mới.
- Đây là kiểm tra nguồn hẹp cho B03/G14/E19 để đề xuất khả thi; chưa thay quyết định nghiên cứu tổng thể tại J04 và chưa phải bộ research GSD đầy đủ.

## Resume

Đang ở bước 5 new-project. Đọc câu J khi người dùng trả lại. Không tự chọn preferences; không coi I20 là duyệt 58 yêu cầu hoặc 7 chặng chưa được trình khi I20 được chọn. Sau khi có câu J, áp dụng cấu hình và nghiên cứu tương ứng; sửa đề xuất rồi mới ghi/commit các hồ sơ chính thức theo cổng được chốt.

## Validation — 2026-10-19

- 58 ID yêu cầu duy nhất, mỗi ID gán đúng một trong 7 chặng; mỗi chặng có 3–4 tiêu chí.
- HTML: 200 mã duy nhất, 20 câu mỗi vùng A–J; không CSS; giữ nguyên 180 lựa chọn/ghi chú gốc, J để trống.
- JSDOM xác nhận xuất JSON và mở lại HTML giữ chỉnh sửa phạm vi, trạng thái chưa duyệt lộ trình, ghi chú nhiều dòng và I20 đã duyệt; không có lỗi script trong lượt kiểm tra.
- Chưa có config/REQUIREMENTS/ROADMAP/STATE chính thức. Chỉ PROJECT.md được commit; các bản đề xuất chưa được coi là duyệt.
- Đây là kiểm tra hồ sơ và biểu mẫu, không phải bằng chứng runtime của portfolio hay gửi PDF/email.
