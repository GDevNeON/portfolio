# Stack Research

**Domain:** Nâng cấp portfolio cá nhân Cinematic / Glass trên React hiện có.
**Researched:** 2026-10-19.
**Confidence:** HIGH với mã/lockfile và tài liệu; MEDIUM với hiệu năng, triển khai và tài khoản chưa kiểm chứng.
**Execution:** Nghiên cứu inline theo J04; không subagent, không cài dependency hoặc sửa code ứng dụng.

## Recommended Stack

| Technology | Locked version | Purpose | Recommendation |
|---|---|---|---|
| React / React DOM | 19.2.3 | UI hiện tại | Giữ; nâng cấp trải nghiệm không đòi đổi framework |
| React Router DOM | 6.30.2 | Route / shell | Giữ; mở rộng locale, dự án và trang lỗi có chủ đích |
| TypeScript | 5.9.3 | Kiểu dữ liệu | Giữ; tách dữ liệu nội dung và trạng thái tư liệu |
| Vite | 7.2.7 | Dev/build hiện tại | Giữ build; khảo sát đầu ra metadata khi làm trang dự án |
| EmailJS Browser | 4.4.1 | Transport liên hệ hiện tại | Giữ như ứng viên; chưa kết luận PDF hoạt động với tài khoản đang có |
| Vitest | 4.1.5 | Kiểm tra hành vi hiện có | Chạy focused checks phù hợp, không coi là giao thư thực tế |

Phiên bản lấy từ package-lock.json tại repo, không phải khuyến nghị tự cập nhật lên bản mới nhất. Không thay package.json/lockfile trong khởi tạo.

### Supporting libraries and materials

- GSAP + @gsap/react là ứng viên cho choreography DOM, chữ và scroll. Chưa được cài/pin trong repo; khi cần ở chặng 5, xác minh release tương thích và khóa phiên bản khi cài. Hook useGSAP hỗ trợ scope và cleanup React. [GSAP React](https://gsap.com/resources/React/)
- Dùng CSS tokens và chất liệu tăng cường dần; nền đọc có fallback rõ. backdrop-filter cần kiểm tra trên trình duyệt/thiết bị thật, không suy ra toàn bộ máy cũ đều hỗ trợ. [MDN backdrop-filter](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/backdrop-filter)
- Phân biệt lớp điều khiển và nội dung, tiết chế hiệu ứng kính. Đây là diễn giải sang web, không phải dùng API native Apple. [Apple Materials](https://developer.apple.com/design/human-interface-guidelines/materials)
- Chưa có nhu cầu được chứng minh cho một sân khấu WebGL toàn site. Three/R3F đã có trong manifest; sự tồn tại của package không bắt buộc dùng chúng hoặc đổi kiến trúc.

## Contact integration decision

EmailJS có luồng file input/sendForm và cấu hình attachment tại template. [File attachments](https://www.emailjs.com/docs/user-guide/file-attachments/)

Bảng giá công khai không có attachment trên Free; Personal ghi tối đa 500 KB, Professional 2 MB. Đây là snapshot nghiên cứu, không phải gói tài khoản chủ portfolio đang dùng. [Pricing](https://www.emailjs.com/pricing/)

Chặng 4 phải xác minh tài khoản/template, giới hạn PDF và phương án trong ngân sách trước implementation. Không mua gói, đổi provider hoặc biến yêu cầu PDF thành chỉ gửi liên kết mà chưa có quyết định. Giữ cả PDF và liên kết trong phạm vi.

## Tooling and skill availability

- taste-skill tương ứng bản cài design-taste-frontend tại C:/Users/neong/.agents/skills/design-taste-frontend/SKILL.md.
- Skill này có mặc định “No glass”; brief trực tiếp yêu cầu Glass/Liquid Glass có ưu tiên cao hơn. Dùng ngoại lệ có lý do, không xóa kính hoặc che kết quả inspector.
- Impeccable được tìm thấy ở lượt kiểm lại cuối tại C:/Users/neong/.agents/skills/impeccable/SKILL.md; đã đọc phiên bản 4.6.0. Chưa chạy context hoặc critique trong init.
- Các skill GSAP React/performance đã được đọc để đối chiếu phương án; chưa có code motion hoặc benchmark được chạy.

## Confidence / next decisions

HIGH: stack hiện tại, nguồn API, lựa chọn người dùng.
MEDIUM: bản nhạc thực phát, metadata tại host, gói EmailJS và blur trên máy yếu.
Chỉ nghiên cứu sâu tiếp khi có quyết định cụ thể theo J05; giữ không subagent.

