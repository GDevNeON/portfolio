# Feature Research

**Domain:** Portfolio dev kể chuyện qua sản phẩm.
**Researched:** 2026-10-19.
**Confidence:** HIGH cho nhu cầu đã trả lời; MEDIUM cho khả năng tích hợp chưa chạy.
**Method:** Đối chiếu 200 câu với mã hiện tại và nguồn chính thức; không giả lập khảo sát khách hàng.

## Feature Landscape

### Table Stakes — trong phạm vi chủ portfolio đã chốt

| Feature | User outcome | Complexity / dependency | Phase |
|---|---|---|---|
| Mở thấy tên và giá trị ngay | Hiểu ai và làm gì trước khi motion chạy | Nội dung đã chọn J14 | 1 |
| VI/EN, sáng/tối | Không bỏ sót nhóm người xem | Đầu vào chung cho mọi trang | 1, kiểm chứng 7 |
| Dự án và vai trò có căn cứ | Đọc sâu để tin năng lực | Chờ vai trò thật và tư liệu | 3 |
| Liên hệ rõ kết quả | Bắt đầu trao đổi, không mất lời nhắn | Provider/template, lỗi thật | 4 |
| PDF hoặc liên kết tài liệu | Gửi nhu cầu bằng cách phù hợp | Cần quyết định gói/provider | 4 |
| Bàn phím/phóng chữ/fallback | Hoàn thành hành động khi điều kiện khác nhau | Kiểm tra thực tế | 7 |

### Differentiators — đã được chọn, không thêm phạm vi mới

| Feature | Value | Dependency | Phase |
|---|---|---|---|
| Thế giới cá nhân có câu chuyện | Nhớ Bùi Bảo Long | Nội dung và tham khảo cần trao đổi trước mockup | 1–2 |
| Glass mềm, chữ có dấu ấn | Có cá tính nhưng chuyên nghiệp | Giữ độ rõ ở cả sáng/tối | 1, 5 |
| Vixie là cao trào chính | Thấy sản phẩm tiêu biểu nhanh | Ảnh thật hiện có, nội dung được duyệt | 3, 5 |
| Chuyển động theo nhịp nội dung | Dẫn mắt thay vì làm chậm đường đọc | Giảm motion và điện thoại | 5 |
| BoogieDown bật chủ động | Tạo không khí có quyền lựa chọn | Một chủ sở hữu audio xuyên route | 6 |

## Feature Dependencies

- Nội dung thật → câu chuyện dự án → motion dẫn vào tính năng.
- Locale + theme shell → các trang trong từng chặng; không chờ đến cuối mới dịch hoặc làm sáng.
- Tệp PDF → khả năng attachment thực tế của dịch vụ → bằng chứng người nhận nhận được.
- Media minh họa có tiếng → sự kiện play/pause/end → hạ và phục hồi nhạc nền theo ý định người xem.
- Metadata route → HTML có thể được bot đọc → kiểm tra đích chia sẻ sau deploy.

EmailJS có API attachment nhưng Free không liệt kê khả năng này. Coi tài khoản/template và giới hạn là phụ thuộc, không coi ô chọn PDF là hoàn tất tích hợp. [Attachment guide](https://www.emailjs.com/docs/user-guide/file-attachments/), [pricing](https://www.emailjs.com/pricing/)

## Anti-Features / explicitly excluded

- Intro che thông tin hoặc bắt xem lại: trái C02/E16.
- Audio tự phát, nhớ nghe giữa lần mở mới: trái E19/I07.
- Bịa vai trò, mốc, kết quả hoặc lấy mock làm sản phẩm thật: trái I14–I18.
- Thêm blog, sở thích, đặt lịch, testimonial hoặc dự án mới: ngoài phạm vi hiện tại.
- Dùng quy tắc “No glass” của một skill để thay brief người dùng: áp dụng sai ưu tiên.
- Tự mở rộng analytics bên ngoài vì có mục tiêu xem dự án/liên hệ: H18 chưa chọn dịch vụ.

## MVP Definition

Toàn bộ 58 yêu cầu đã được J17 chọn cho v1, không bỏ âm thanh, PDF hoặc song ngữ để làm một MVP nhỏ hơn. J13 là cách chia mỗi chặng có luồng dùng được; I03 giữ đủ mục tiêu, thêm thời gian khi phát sinh.

### Pending assets, not completed features

Ảnh chân dung được nói là đã có nhưng chưa được gửi. Mốc kinh nghiệm và vai trò cá nhân còn chờ. Bản xem thử dùng ảnh hiện có; clip không được ghi đã hoàn thành. Chủ portfolio phải chốt cách xử lý trước công khai.

## Sources

- answers-2026-10-19-final.json: J01–J20 và các câu A–I giữ nguyên.
- src/siteConfig.ts, src/pages/Home.tsx, src/pages/Contact.tsx.
- Nguồn EmailJS dẫn ngay cạnh nhận định; không có khảo sát thị trường ngoài phạm vi.

