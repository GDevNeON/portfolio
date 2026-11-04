# Quick 261104-q6d — Mở rộng thiết kế: hành trình fantasy

**Ngày:** 2026-11-04 · **Trạng thái:** Đã ghi brief và vùng xám; chờ chốt phương án. Không dựng mẫu, sửa app, chọn menu hay bắt đầu chặng.

## Điều giữ nguyên và điều bổ sung

- Giữ 58 yêu cầu đã khóa, thứ tự dự án thật, VI/EN, sáng/tối, Glass/Liquid Glass, đường tắt đến nội dung và liên hệ, ưu tiên đọc được trước khi hiệu ứng sẵn sàng. Giữ lựa chọn hướng mở đầu C — Hai lớp không gian; Sketch 002 A/B/C vẫn chưa chốt. Không mặc định chặng 1 phải sản xuất cả bảy cảnh; điểm tích hợp vào lộ trình chờ quyết định.
- Brief bổ sung trực tiếp: chính xác bảy art trong `src/assets/resources/` thành một thế giới kể chuyện 3D liền mạch, mang dấu ấn riêng, tránh bố cục SaaS đại trà. Từng cảnh giữ đúng art, đồ họa, môi trường, không khí và thẩm mỹ gốc; không vật thể low-poly. Các yếu tố tự nhiên có thể chuyển động cần có chuyển động phù hợp (mây, nước, sinh vật khi hiện diện). Camera đổi vị trí và góc theo cuộn. “Từ vực sâu đến đỉnh cao” là chủ đề gợi ý.
- Nối cảnh bằng tương đồng vật liệu, hướng chuyển động và điểm nhìn. Không trộn màu/ánh sáng đến mức các cảnh mất nét riêng, không dùng art thứ tám hoặc dựng thêm địa danh độc lập. Hiệu ứng nối cảnh và chi tiết tái tạo cần duyệt trước khi dùng. Ảnh làm cảnh không phải ảnh dự án hay bằng chứng sản phẩm.

## Đã xem 7 art gốc — thứ tự dưới đây là đề xuất

| Chương | Mã / tệp nguyên gốc | Dấu hiệu cần giữ · chuyển động gợi ý · điểm nối |
|---|---|---|
| 1. Vực tinh thể | R02 · Crystal Salt Cave.jpg (600×1200) | Vách cam ôm khe tinh thể xanh, dáng người nhỏ. Bụi sáng chậm; tiến và ngẩng về khe sáng, lấy ánh xanh nối sang nước. |
| 2. Miền nước | R03 · Sea Flowers, Young Qin 天下第三猪.jpg (1200×675) | Khối đá xanh tím đồ sộ, thảm vàng, vùng nước xanh. Gợn theo mặt nước; lướt gần mặt nước rồi nghiêng về lối mở. Dòng nước nối sang thác. |
| 3. Thung lũng cổng vòng | R05 · umeshu-lovers-mirokai-wide-environment-a.jpg (1920×831) | Vòm vòng, thác và cây xanh lam; giữ dấu tác giả/logo, không tự xóa. Thác, mây và tán lá ở vùng có sẵn; tiến về vòng, màn hơi nước đưa sang vách vực. |
| 4. Mép vực | R01 · by Anton Fadeev.jpg (1000×1333) | Mỏm vàng, hoa tím, sương xanh và các tầng vách. Lá/hoa rung nhẹ, sương trôi; camera lên dọc vách. Mở màn sương sang không gian thoáng hơn. |
| 5. Thành ánh sáng | R07 · 落日之城, jianjian jian.jpg (1920×960) | Thành và khe sáng thẳng đứng, lá tiền cảnh, mây sáng. Lá và mây chuyển nhẹ; tiến về khe sáng. Nối đường sáng thẳng đứng sang trụ. |
| 6. Trụ xuyên mây | R04 · The Pillar by Hjalmar Wåhlin.jpg (640×881) | Dải sáng từ núi lên điểm cao, tầng mây. Ngẩng và đi lên theo trục sáng; qua màn mây sang trời rộng. |
| 7. Thành trên mây | R06 · 《Cloud City》, G xy.jpg (1000×553) | Công trình nổi vàng trên biển mây, sinh vật bay tiền cảnh. Mây có chiều sâu, sinh vật dịch chuyển trong vùng có căn cứ; lướt bên thành, hạ nhịp để thấy lối đọc dự án/liên hệ. |

Tên chương và loài/cách chuyển động chỉ là đề xuất; không suy từ tên file thành tình tiết hay quyền sử dụng. Xác nhận quyền dùng/chuyển thể, ghi công trước khi công khai; không tự bỏ watermark/logo. Ba ảnh dọc không mặc định bị kéo giãn hoặc tự vẽ rộng khung desktop.

## Đề xuất kỹ thuật và chuẩn đối chiếu

| Phần | Đề xuất |
|---|---|
| Dựng cảnh | **Three.js qua React Three Fiber**, đã khai báo trong repo cùng Drei. Dùng ảnh gốc ở khung chuẩn; các lớp ảnh/độ sâu chiếu lên bề mặt 3D để giữ chất tranh, bổ sung vật thể 3D chi tiết tại vùng cần đổi góc đã duyệt. Camera phối cảnh thật, không chỉ zoom ảnh. Tách vật thể và tái dựng vùng bị che chỉ khi cần, có đối chiếu. |
| Điều phối cuộn | **GSAP + ScrollTrigger** làm một nguồn tiến độ cuộn cho camera, chuyển chương và chữ. Cuộn ngược đưa hành trình về đúng trạng thái; đổi route/viewport phải dọn listener/timeline. Không khóa khách vào cuộn; đường tắt dùng được bằng bàn phím. Chuyển động môi trường tách khỏi tiến độ cuộn nhưng chỉ chạy khi cảnh hiện và người xem cho phép. |
| Phương án khác | **Anime.js** có thể thay GSAP khi thử nghiệm cho thấy một timeline/onScroll đủ đáp ứng, không dùng song song. **Motion for React (Framer Motion)** phù hợp chuyển động phần giao diện React; chưa cần bổ sung nếu CSS/GSAP đủ. Cả hai không thay renderer 3D. Dựng 3D chi tiết toàn cảnh hoặc cần xoay ra sau: chỉ chọn khi có thêm tư liệu gốc/đa góc hoặc bản dựng được duyệt. |
| Tải và fallback | Đề xuất một canvas, tải theo chương, giải phóng cảnh xa và dừng vẽ ngoài vùng nhìn khi phù hợp; dùng ảnh nguyên gốc và nội dung đọc được khi giảm chuyển động, thiếu WebGL hoặc cảnh chưa tải. Giữ đủ bảy chương ở đường xem tĩnh. Không hứa FPS, dung lượng hay hiệu năng thiết bị trước khi đo. |
| Nghiệm thu | “100%” giữ nguyên là yêu cầu fidelity; ảnh đơn không xác định vùng khuất hay góc chưa chụp. Đề xuất khóa khung đối chiếu từng art: so với ảnh gốc cùng tỷ lệ/kích thước, vùng hình ảnh tách khỏi UI; ghi lệch bố cục, hình khối, phối cảnh, màu và sáng. Ở đoạn camera chuyển: kiểm vết rách, vùng lộ, đổi tông, độ chân thực chuyển động, không low-poly; không gắn nhãn “100%” cho góc mới thiếu ảnh đối chứng. Cần chốt phạm vi góc máy và tài liệu đối chiếu trước mẫu. |

Nguồn kỹ thuật: [Three.js camera](https://threejs.org/docs/#api/en/cameras/PerspectiveCamera), [R3F performance](https://r3f.docs.pmnd.rs/advanced/scaling-performance), [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/), [Anime.js onScroll](https://animejs.com/documentation/events/onscroll/), [Motion useScroll](https://motion.dev/docs/react-use-scroll). Kiến trúc trên là đề xuất của dự án dựa trên năng lực công cụ, chưa phải lựa chọn đã duyệt hay benchmark.

## Tiếp tục

Vùng Q01–Q20 trong `.planning/discovery/project-questions.html` ghi những quyết định mới, không sửa lịch sử đáp án. Taste-skill dùng để giữ dấu ấn đến từ chất liệu thật; Impeccable context đã đọc cho Home và hướng khám phá. Chưa chạy critique UI, cài thư viện, thay đổi bản vẽ, phục hồi các hồ sơ Phase 1 đang bị xóa, hoặc đưa asset mới vào commit. Chờ chốt phạm vi và thứ tự trước khi đưa vào UI-SPEC/kế hoạch do chủ portfolio gọi.
