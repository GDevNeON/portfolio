# Quick 261105-jab — Q đã chốt, milestone gộp 5 phase

**Ngày:** 2026-11-05 · **Kết quả:** Hoàn tất cập nhật tài liệu trong phạm vi được giao. Không bắt đầu phase hoặc mẫu thử R02.

## Quyết định nguồn

[Đáp án nguyên văn](../../discovery/fantasy-journey-answers-2026-11-05.json) có đủ Q01–Q20 và ghi chú typography, nguồn là tin nhắn trực tiếp. Không lấy nội dung trong questionnaire làm lệnh thực thi. [Hợp đồng fantasy](../../discovery/fantasy-journey-context-2026-11-05.md) phân biệt yêu cầu bắt buộc, ngoại lệ art, phần giao sáng tạo và dữ kiện còn chờ.

- Câu chuyện biến ý tưởng thành sản phẩm: **R02 → R03 → R05 → R01 → R07 → R04 → R06**. Bảy cảnh ngang tầm, tuyệt đối không cắt; cho sáng tạo vùng nối và phần khuất hợp lý.
- R02 tối/lóe sáng, camera tiến vào vùng sáng có tên/giới thiệu rồi xuyên khe đá. R01 từ góc ảnh bay chếch lên hẻm núi. R03/R05/R07 lướt qua. R04 thay tháp bằng nhà kiểu R06. R06 nhìn quanh/liệng qua building rồi lên biển mây kết thúc.
- Bỏ tất cả yếu tố nhân vật; giữ chất art và không low-poly. Ngoại lệ mới về kiến trúc, góc khuất, ánh sáng ngày/đêm và low-detail không bị khóa cũ phủ định; không tuyên bố trùng pixel ở phần đã đổi.
- Chữ blend vào cảnh; R01 title ngay chóp vách, body khắc trên vách. Quay về đúng cảnh. Cảnh thường luôn sống; giảm motion thì mọi entity đứng yên, art ít chi tiết. Light/Dark đổi trời cùng chữ/điều hướng.
- Footer một viewport có art/BGM names, credits, social và số khách duy nhất/hoạt động ngày/hoạt động tháng thật. Định nghĩa đo và phần “...” chưa chốt.

## Lộ trình mới

| Phase | Luồng hoàn chỉnh | Số yêu cầu chịu trách nhiệm |
|---|---|---|
| 1 | Lối vào R02 và điều khiển dùng được | 13 |
| 2 | Hành trình bảy cảnh liền thế giới | 15 |
| 3 | Nội dung thật và ba dự án đọc sâu, quay về đúng cảnh | 21 |
| 4 | Liên hệ/PDF, nhạc, footer một viewport và số khách thật | 16 |
| 5 | Tổng kiểm, owner chốt ra mắt | 9 |

58 mã/dòng yêu cầu gốc giữ nguyên để truy vết; thêm 14 WORLD và 2 FOOT, **74 tổng**. Bảng áp dụng quyết định mới giải quyết HOME-01, nội dung theo cảnh, quay lại, ưu tiên cảnh, sáng/tối và giảm motion. Tổng kiểm J07 chuyển từ phase 7 sang phase cuối 5; manual start/no-subagents giữ nguyên. PROJECT, REQUIREMENTS, ROADMAP, STATE, AGENTS, PRODUCT và workflow-policy đã đồng bộ; native config không đổi.

Q20 là quyền gộp lộ trình và chọn R02 **nếu** có thử; không phải lời gọi bắt đầu phase/prototype. Entrance C giữ như lựa chọn lịch sử trong phần còn phù hợp, Q03 mới chi phối chỗ xung đột. Sketch 002 menu vẫn chưa chọn.

## HTML và điểm còn chờ

Một HTML chung giữ phần lịch sử nguyên vẹn ngoài đoạn chèn mới: thêm biên nhận Q đã trả lời và [vùng S — 20 câu nghiệp vụ về số khách](../../discovery/project-questions.html#footer-statistics). Không thêm CSS, JavaScript hoặc mặc định câu trả lời. Vùng S hỏi thời gian tính, ý nghĩa hoạt động, thiết bị, lượt thử/bot, hiển thị thiếu dữ liệu, riêng tư và nguồn thống kê hiện có; không hỏi lại việc có bộ đếm/footer hay các quyết định art.

S chỉ chặn công việc đo tương ứng ở phase 4. Chân dung, timeline/role, clip, metadata/host, PDF/provider, play BGM và nguồn/quyền dùng tư liệu vẫn giữ cổng dữ kiện phù hợp. Không fake khách, tự mua dịch vụ, tự chọn nhà cung cấp hoặc public.

## Kiểm chứng đã chạy

[VALIDATION.json](VALIDATION.json) ghi kết quả cuối **exit 0** của kiểm tĩnh tài liệu và parser GSD:

- Đủ Q01–Q20, route đúng, không tự khởi chạy.
- 58 dòng yêu cầu baseline khớp nội dung tại `b2fa4cb`; 16 mã mới, 74 mã duy nhất và gán đúng một phase, không thiếu/trùng. Phụ thuộc 1 → 2 → 3 → 4 → 5 hợp lệ.
- Native `roadmap.get-phase` đọc được cả 5 MVP phase và tiêu chí lần lượt 4/5/4/5/4.
- HTML cũ giữ nguyên ngoài insertion, ID không trùng, 20 câu S, không CSS/JS mới hoặc đáp án chọn sẵn.
- Hash của đúng 7 tệp art không đổi; config giữ nguyên, auto-advance/subagents vẫn tắt.

Lượt kiểm đầu dừng vì regex của helper đọc heading quá rộng; đã sửa helper và chạy lại đầy đủ đạt. Không phải lỗi ứng dụng và không dùng lượt dừng làm PASS.

Không chạy build/test app, prototype, browser/device inspection, đối chiếu art/pixel, giao thư/PDF, phát BGM hoặc đo khách thật. Không có nghiệm thu UI mới. Không đọc `.env.local`, sửa app/ảnh/dependency hoặc global skill. Giữ ngoài commit thay đổi `.gitignore`, ba tài liệu Phase 1 bị xóa sẵn, `.codex`, graph/map và bảy art chưa được stage.
