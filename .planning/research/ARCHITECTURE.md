# Architecture Research

**Domain:** Brownfield React portfolio, cinematic interactions, bilingual content, contact documents.
**Researched:** 2026-10-19.
**Confidence:** HIGH về ranh giới đề xuất; MEDIUM về provider, hosting và hành vi thiết bị chưa kiểm chứng.

## Recommended Architecture

Giữ React Router với một shell bền vững và Outlet cho nội dung trang. Đặt audio/preferences ở phía không bị unmount khi route đổi; locale thay dữ liệu nhưng không tạo lại audio. Outlet là điểm render route con theo tài liệu React Router. [Outlet](https://reactrouter.com/6.30.1/components/outlet)

| Boundary | Owns | Must not own |
|---|---|---|
| App shell / navigation | Điều hướng, locale, theme, cấu trúc trang, skip link | Vai trò/số liệu tự suy ra |
| Content model | VI/EN, danh mục dự án, trạng thái approved/pending, asset reference | Credential hoặc trạng thái gửi |
| Page composition | Mạch đọc, dự án, phần về tôi, liên hệ | Tạo audio toàn cục theo từng route |
| Motion scope | Timeline/cảnh, cleanup, reduce-motion policy | Ẩn nội dung vĩnh viễn nếu JS lỗi |
| Audio owner | Một media element, ý định nghe, ducking reasons | Tự bật lại từ callback của video |
| Contact transport | EmailJS hoặc phương án được chốt, kết quả gửi thật | Báo thành công chỉ vì mở email |
| Metadata build/output | Route/locale-specific document head | Chỉ dựa vào mutation client để chứng minh preview bot |

Đây là ranh giới khi triển khai, không yêu cầu tạo toàn bộ các module trong một chặng nền riêng. Mỗi chặng phải có đầu ra dùng được như lộ trình đã duyệt.

## Data Flow

1. Route + locale → nội dung đã duyệt → trang/metadata.
2. Theme + reduce-motion → tokens/cách trình bày; không thay nghĩa của nội dung.
3. Audio intent (off/on) + media đang phát tiếng → mức nghe thực tế. Bỏ một lý do ducking phải xem các lý do còn lại; không đổi intent off thành on.
4. Email/message + PDF hoặc link → validate → transport → kết quả được xác nhận → phản hồi. Lỗi giữ nội dung, chỉ mục cần chọn lại.

## Motion lifecycle

Nếu chọn GSAP, scope theo page/section, cleanup khi route/locale thay đổi; dùng useGSAP/context và matchMedia thay vì để listener/timeline tồn tại ở DOM cũ. [GSAP React](https://gsap.com/resources/React/), [matchMedia](https://gsap.com/docs/v3/GSAP/gsap.matchMedia%28%29/)

Để đường đọc hoạt động trước lớp chuyển động; reduced-motion tháo pin/độ dịch chuyển không thiết yếu, không làm nút hoặc nội dung biến mất. Đây là quyết định triển khai từ E17/H14.

## Audio semantics

“Phiên xem” được hiểu là lượt duyệt site hiện tại: đổi route giữ intent/position, mở một lượt mới bắt đầu off. Nếu dùng sessionStorage, không tự phát khi reload chỉ vì còn giá trị on; cần thao tác chủ động của người xem theo yêu cầu. Bắt lỗi play(), để điều khiển đúng trạng thái nghe. [MDN Autoplay](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Autoplay)

Không chứng nhận BoogieDown phát được chỉ từ tên file. Kiểm tra codec/duration/browser khi chặng 6 được yêu cầu.

## Metadata and routing

MetaTags.tsx hiện dùng useEffect và một URL mẫu. WORK-02/LANG-04 cần route dự án thật, URL canonical đúng và head theo locale có thể kiểm tra từ phản hồi HTML. Nghiên cứu lựa chọn prerender/build route output ở chặng 3; chưa đổi sang một framework khác.

Google mô tả một số bot không chạy JavaScript và nêu lợi ích prerender/server rendering. Từ đó suy ra không nên lấy document.head sau React render làm bằng chứng đủ cho mọi preview bot. Cần kiểm tra HTML trả về và bot/đích chia sẻ thật. [JavaScript SEO basics](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)

## Contact and external boundaries

Chưa đọc .env.local, chưa truy cập tài khoản dịch vụ và chưa gửi thử. Trước chặng 4 phải chốt provider, khả năng attachment và giới hạn file phù hợp. Không tự mua gói. Chọn link không bắt upload; lỗi PDF không làm mất lời nhắn.

## Build Order

1. Shell/đường vào dễ đọc; giữ route đang có.
2. Mạch đọc và nội dung cá nhân.
3. Route dự án, scroll restoration, metadata build.
4. Transport liên hệ/PDF thực tế.
5. Motion theo section đã có nội dung.
6. Audio bền vững và ducking.
7. Đối chiếu tổng thể và owner release decision.

Không có code kiến trúc nào được tạo trong nghiên cứu này.

