# Project Research Summary

**Project:** Neon Portfolio — Cinematic Personal World
**Domain:** Brownfield bilingual developer portfolio, Glass, motion and optional background audio.
**Researched:** 2026-10-19
**Confidence:** HIGH về nguồn/mã và phạm vi; MEDIUM về provider, hosting, asset và runtime chưa kiểm chứng.
**Execution:** Inline theo J04. Không subagent, không cài package, không bắt đầu phase 1.

## Executive Summary

Nâng cấp có thể giữ React/Vite/Router hiện có. Chuyển động, nội dung song ngữ, dự án đọc sâu và audio cần ranh giới vòng đời rõ; không có dữ kiện buộc đổi framework hoặc đưa toàn site vào WebGL.

Nghiên cứu không làm thay đổi 58 yêu cầu hoặc thứ tự 7 chặng được J17/J18 duyệt. Nó bổ sung quyết định phải chốt trước khi triển khai: khả năng PDF của dịch vụ, output metadata dự án, chất kính có fallback, asset và đường dẫn skill critique.

## Key Findings

- **Stack:** Giữ các phiên bản đã khóa; GSAP/@gsap/react là ứng viên khi làm motion, không được cài trong init.
- **Features:** Dự án thật, mạch đọc, liên hệ, locale/theme và khả năng dùng đầy đủ là đầu ra; glass, typography và nhạc đều phải phục vụ những đầu ra đó.
- **External dependency:** Không suy ra PDF miễn phí từ việc dùng EmailJS. Xác minh tài khoản/template hoặc chốt giải pháp trước chặng 4. [EmailJS pricing](https://www.emailjs.com/pricing/)
- **Architecture:** Shell giữ preferences/audio; trang giữ nội dung; motion scope theo vòng đời; transport tách phản hồi UI; metadata phải được xem ở đích thực.
- **Tooling:** Taste-skill có sẵn; Impeccable 4.6.0 đã được tìm thấy và đọc ở lượt kiểm lại cuối. Chưa chạy critique hoặc nhận UI đã được kiểm chứng.
- **User control:** J01 tự gọi từng chặng; J05 nghiên cứu khi có quyết định cụ thể; J07 đối chiếu tổng thể ở cuối; J19 trao đổi tham khảo trước dựng mẫu.

## Implications for Roadmap

| Phase | Research implication | Gate / evidence |
|---|---|---|
| 1. Diện mạo và lối vào | Giữ kính nhưng đảm bảo độ rõ/fallback; trao đổi tham khảo trước mẫu | Taste brief override, ảnh/chữ thật, không tự dựng mẫu từ init |
| 2. Câu chuyện và con người | Dữ kiện pending tách nội dung duyệt | Ảnh chân dung, mốc thật, copy J14/J16 |
| 3. Ba dự án | Route/locale và metadata output, giữ vị trí quay lại | Quyết định prerender khi cần; role/clip thật còn chờ |
| 4. Liên hệ | PDF là boundary tích hợp mới | Account/template/limit/provider chưa chốt; không tự mua |
| 5. Motion | Cleanup/scoping, reduced-motion và touch | Không thêm scene trước nội dung; kiểm đường quay lại |
| 6. Nhạc | Một player, on/off intent độc lập ducking | Kiểm codec file, phiên mới im lặng, media events |
| 7. Ra mắt | Kiểm tổng thể theo J07 | Live links, email/PDF đến người nhận, owner release decision |

### Phase ordering rationale

Shell → nội dung → route dự án → liên hệ → motion → audio → kiểm toàn site tạo luồng dùng được từng chặng. Locale/theme là hợp đồng ngay từ đầu, không phải việc chỉ làm ở chặng 7. Dữ kiện phụ thuộc có thể chuẩn bị sớm nhưng không tự triển khai phase chưa được gọi.

### Research flags

- Chặng 3: chỉ nghiên cứu sâu khi lựa chọn output metadata/host chưa rõ.
- Chặng 4: cần quyết định capability/budget trước chọn transport.
- Chặng 5: chỉ kiểm phiên bản GSAP, split text/font hoặc tính năng scroll khi có nhu cầu cụ thể.
- Chặng 6: khảo sát codec/session/ducking khi thực hiện, không đoán từ tên tệp.
- Impeccable: dùng SKILL.md 4.6.0 tại đường dẫn đã ghi trong công việc UI được yêu cầu; không tự chạy phase hoặc critique từ init.

## Confidence Assessment

| Area | Confidence | Basis |
|---|---|---|
| Scope / workflow | HIGH | JSON đầy đủ và J17/J18 approvals |
| Existing stack | HIGH | package-lock và mã nguồn |
| Proposed boundaries | HIGH | Cấu trúc hiện tại + docs nền |
| Attachment capability for current account | UNKNOWN | Chưa truy cập tài khoản/template |
| Visual performance / art direction acceptance | UNVERIFIED | Chưa dựng mẫu, chưa benchmark |
| Asset/metadata delivery | MEDIUM | Có ảnh/file nhạc; các ranh giới còn phải chạy thật |

## Sources

- [Apple Materials](https://developer.apple.com/design/human-interface-guidelines/materials) — định hướng chất liệu; áp dụng web là suy luận.
- [MDN backdrop-filter](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/backdrop-filter) — nền tảng và tương thích.
- [GSAP React](https://gsap.com/resources/React/) và [matchMedia](https://gsap.com/docs/v3/GSAP/gsap.matchMedia%28%29/) — lifecycle/scoping.
- [EmailJS attachments](https://www.emailjs.com/docs/user-guide/file-attachments/) và [pricing](https://www.emailjs.com/pricing/) — capability/template.
- [MDN Autoplay](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Autoplay) — quyền bắt đầu phát.
- [Google JavaScript SEO](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics) — output cho crawler.
- [React Router Outlet](https://reactrouter.com/6.30.1/components/outlet) — route con trong shell.
- Local: package-lock.json; src/siteConfig.ts; src/pages/Contact.tsx; src/components/MetaTags.tsx; answers-2026-10-19-final.json; các SKILL.md thực sự đã đọc.

Research hoàn tất ở mức project; đủ đầu vào hoàn tất roadmap. Không phải nghiệm thu phần mềm.

