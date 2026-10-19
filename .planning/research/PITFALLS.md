# Pitfalls Research

**Domain:** Cinematic Glass developer portfolio upgrade.
**Researched:** 2026-10-19.
**Confidence:** HIGH với các rủi ro có nguồn/mã cụ thể; runtime chưa thực nghiệm.

## Critical Pitfalls

### 1. PDF trông gửi được nhưng người nhận không nhận

- **Cause:** Dùng file picker nhưng transport/template không có attachment; dựa vào mock hoặc gói không hỗ trợ.
- **Warning signs:** Chỉ có success toast; không có tệp ở hộp thư; chỉ kiểm file name.
- **Prevention:** Xác minh tài khoản và template, giới hạn; thử gửi PDF thật trong bước được yêu cầu, kiểm người nhận. Lỗi giữ lời nhắn và chỉ tệp cần chọn lại.
- **Phase:** 4, tổng kiểm chứng 7.
- **Evidence:** EmailJS Free không liệt kê attachment; gói trả phí có giới hạn khác nhau. [Pricing](https://www.emailjs.com/pricing/), [attachment setup](https://www.emailjs.com/docs/user-guide/file-attachments/)
- **Scope impact:** Giữ CONTACT-03; không âm thầm thay bằng chỉ link hoặc tự mua gói.

### 2. Được tiếng “đẹp” nhưng chữ/đường đọc bị che

- **Cause:** Mọi bề mặt cùng blur, contrast kém ở sáng, phụ thuộc intro.
- **Warning signs:** Đọc không rõ trên ảnh, nút lẫn nền, nội dung chờ animation mới hiện.
- **Prevention:** Tách bề mặt đọc và điều khiển, kiểm cả theme, fallback nền rõ. Khi blur không có vẫn nhận ra cấu trúc. [Apple Materials](https://developer.apple.com/design/human-interface-guidelines/materials), [MDN backdrop-filter](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/backdrop-filter)
- **Phase:** 1 và 5; kiểm tổng thể 7.
- **Scope impact:** Giữ kính theo yêu cầu người dùng; không áp quy tắc “No glass” từ taste-skill lên brief.

### 3. Motion bị nhân đôi sau đổi route hoặc locale

- **Cause:** Timeline/listener thiếu owner và cleanup.
- **Warning signs:** Một thao tác kích hoạt nhiều tween, pin còn sau rời trang, focus trỏ mục đã unmount.
- **Prevention:** Scope scene và cleanup; giảm motion từ cùng nguồn policy. Tập trung kiểm chuỗi vào/ra trang, đổi locale và resize. [GSAP React](https://gsap.com/resources/React/)
- **Phase:** 5; kiểm hồi quy mục liên quan ngay trong chặng được gọi.

### 4. Ducking bật lại nhạc người xem đã tắt

- **Cause:** Đồng nhất âm lượng tạm và intent on/off, callback ended gọi play vô điều kiện.
- **Warning signs:** Nhạc tự chạy sau video, thêm route tạo player thứ hai.
- **Prevention:** Một audio owner, intent riêng, lý do ducking có thể chồng; phục hồi mức không thay quyết định off. Play error cần cập nhật trạng thái. [MDN Autoplay](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Autoplay)
- **Phase:** 6.
- **Scope impact:** Lần mới im lặng; không lưu on qua lần mới ngoài lựa chọn I07.

### 5. Preview chia sẻ đúng trong browser nhưng sai khi gửi link

- **Cause:** MetaTags.tsx chỉ cập nhật head sau useEffect và URL còn mẫu.
- **Warning signs:** Mọi dự án có cùng ảnh/tên khi chia sẻ, nguồn HTML không có dữ liệu riêng.
- **Prevention:** Chốt route output/prerender ở chặng 3, kiểm HTML không JS và preview thật khi có host. [Google JavaScript SEO](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)
- **Phase:** 3, đích live ở 7.

### 6. Lấy tư liệu thiếu thay bằng dữ kiện bịa hoặc tuyên bố hoàn tất

- **Cause:** Muốn đủ nội dung để lấp layout hoặc đọc “bản xem thử dùng ảnh” thành “đã có clip”.
- **Warning signs:** Mốc kinh nghiệm mới, vai trò nhóm bị gán cho cá nhân, số người dùng không có nguồn.
- **Prevention:** Content model có approved/pending và provenance. Không tự thêm role/metric. I14/I16/I17/I18 vẫn là điều kiện trước public.
- **Phase:** 2–3, owner quyết định 7.

### 7. Một skill ghi đè ý định của người dùng

- **Cause:** Áp mặc định taste-skill cấm glass hoặc bắt auto-critique khi phase chưa được gọi.
- **Warning signs:** Brief kính bị đổi sang phẳng, tự bắt đầu phase 1 vì khởi tạo xong, ghi Impeccable PASS dù không có skill.
- **Prevention:** AGENTS.md ghi thứ tự ưu tiên, no subagent, J01 manual, J19 discussion trước mockup; ngoại lệ taste có chứng cứ. Tìm đúng Impeccable trước lượt critique, không thay tên công cụ rồi nhận đã làm.
- **Phase:** Trước 1, xuyên suốt và 7.

## Verification policy

J07 bỏ lượt đối chiếu tổng thể sau từng chặng; thực hiện ở chặng 7. Điều này không hủy focused tests, kiểm tra lỗi hoặc visual critique cần cho việc đã được giao. Không tự mở một chặng khác để kiểm thêm.

## Recovery cost

Rẻ: sửa copy nháp, tokens chưa dùng, route labels.
Vừa: tái cấu trúc shell/audio sau khi có nhiều route.
Cao: đổi provider quá muộn, mất dữ kiện thật hoặc công khai nội dung sai.
Giải quyết gate dịch vụ trước chặng 4, không đợi đến kiểm cuối mới biết attachment không có.

