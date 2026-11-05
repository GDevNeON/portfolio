# Footer và số khách — S01–S20 đã nhận

**Nguồn:** [Đáp án trực tiếp nguyên văn ngày 05/11/2026](footer-statistics-answers-2026-11-05.json). Bổ sung Q19; thay các dòng “vùng S còn mở” trong tài liệu hiện hành. Không phải thực thi Phase 4, không thay manual start và không đổi 5 phase / 74 mã.

## Các quyết định nghiệp vụ

| Nguồn | Quy tắc hiện hành |
|---|---|
| S01–S02 | Bắt đầu ghi số thật từ ngày hoàn thành **milestone này**. Chưa có ngày hoàn thành; không lấy ngày ghi đáp án, ngày commit, ngày làm Phase 4 hoặc ngày deploy làm mốc thay thế. Không nhập lùi lượt thử. |
| S03/S09 | Chỉ cần mở một trang portfolio đã tính hoạt động; tính cả truy cập trực tiếp vào dự án/liên hệ, không bắt đi qua hành trình. |
| S04 | Ngày đổi theo giờ Việt Nam, `Asia/Ho_Chi_Minh` (UTC+07:00); không dùng ranh giới ngày UTC của nhà cung cấp làm ngày nghiệp vụ. |
| S05 | MAU là số thiết bị duy nhất trong **30 ngày lịch gần nhất gồm ngày đang thống kê**, không phải tổng DAU hoặc tháng trên lịch. Giai đoạn đầu chỉ tính từ mốc milestone, không tự thêm dữ liệu 30 ngày trước đó. |
| S06 | Thiết bị tính riêng, không ghép cùng một người qua nhiều thiết bị. Một thiết bị mở nhiều lần chỉ là một unique trong kỳ tương ứng. |
| S07 | Loại lượt chủ portfolio mở để sửa/kiểm tra. |
| S08 | Loại bot, spam và lượt tự động/bất thường được nhận diện; không lưu chúng thành thống kê khách hợp lệ. Đây là yêu cầu lọc, chưa có bằng chứng có thể nhận diện tuyệt đối mọi bot. |
| S10 | “Defer bản xem thử”: lượt bản thử không đưa vào số công khai thật. Không suy câu này thành lệnh hủy sketch/R02 hoặc một phase khác. |
| S11/S12 | Hiện số đầy đủ, cập nhật snapshot **hằng ngày**, không hứa live. Một snapshot nhất quán gồm unique, DAU, MAU và tổng lượt xem; có ngày cập nhật để biết số thuộc ngày nào. |
| S13/S14 | Khi lỗi, dùng số đã xác nhận gần nhất, không tự về 0. Không yêu cầu thêm cảnh báo theo từng ngày đo thiếu; không bịa số bù. Chưa từng có snapshot thì hiện trạng thái chưa có dữ liệu, không tạo số mẫu như số thật. |
| S15 | Ngoài credits/số liệu, footer có lối liên hệ, social link và QR donate. Đây là nội dung/hành động, **không phải yêu cầu đo số click hoặc giao dịch**. QR/đích donate do owner thêm sau; không tạo QR giả, không tự chọn người nhận hoặc dịch vụ thanh toán. |
| S16 | Có giải thích ý nghĩa các chỉ số bằng tiếng Việt/Anh; vị trí/cách mở giải thích được giải quyết trong UI đã giao. |
| S17 | Cần rate limit theo IP cho đầu nhận dữ liệu, phân biệt chống lạm dụng với đếm unique. Không công khai IP hoặc mặc định giữ lịch sử IP gốc. |
| S18 | Chỉ cần các số hiện tại, không thêm dashboard lịch sử hoặc log hành vi người xem. Trạng thái kỹ thuật tối thiểu để tính đúng unique/30 ngày vẫn cần tồn tại. |
| S19 | Người từ chối nhận diện vẫn được tính **tổng lượt xem vô danh**, tách khỏi unique/DAU/MAU; không dùng IP để lén dựng lại danh tính. Aggregate vẫn chịu lọc bot/rate limit. |
| S20 | Giao agent chọn cách đo; phương án đã chọn bên dưới là lựa chọn kỹ thuật theo ủy quyền, không phải account đã cấu hình hay dịch vụ đã chạy. |

Unique là thiết bị/trình duyệt **ước tính**, không phải số người thật được xác minh. Xóa dữ liệu trình duyệt, dùng riêng tư hoặc đổi trình duyệt có thể được xem là thiết bị mới; không dùng fingerprint để hứa nhận diện phần cứng tuyệt đối. Người không có/không cho giữ mã nhận diện chỉ đóng góp aggregate; giới hạn này cần nằm trong giải thích chỉ số.

DAU đếm thiết bị mở ít nhất một trang trong ngày Việt Nam đang thống kê. MAU đếm hợp các thiết bị trong 30 ngày đó, **không cộng 30 DAU**. Unique tổng tính từ mốc hoàn thành milestone. Tổng lượt xem là một đại lượng riêng, có thể lớn hơn unique; không đổi tên pageviews thành unique để bao gồm lượt vô danh. Snapshot ghi rõ `asOf` theo ngày VN; việc cập nhật hằng ngày không có nghĩa mọi lần mở trang đều làm số hiển thị đổi ngay.

## Hướng đo do agent chọn theo S20

**Cloudflare Workers + D1**, API đo riêng cho portfolio, gói Free trong giới hạn. Giữ frontend React/Vite hiện có; không buộc chuyển host toàn site chỉ để thêm thống kê. Routing cùng origin hoặc origin cho phép cụ thể sẽ chốt theo host thực tế ở Phase 4. Không thêm analytics SDK vào app ở lượt tài liệu này.

Lý do lựa chọn là suy luận kỹ thuật theo yêu cầu: server nhận/kiểm lượt tập trung, SQL tính tập unique/30 ngày, lưu snapshot dùng chung và trả số gần nhất; không dựa localStorage của một người xem làm tổng công khai. D1 có gói Free với hạn mức đọc/ghi/lưu trữ; khi chạm giới hạn query có thể lỗi. Không coi Free là dung lượng vô hạn hoặc tự nâng gói để tiếp tục. [Nguồn giá/hạn mức D1](https://developers.cloudflare.com/d1/platform/pricing/).

- Đầu nhận hoạt động chỉ chấp nhận môi trường production đã được cấu hình và mốc milestone thực tế. Trước mốc đó, dev/preview không tăng production totals. Việc hoàn thành milestone và khả năng nhận traffic thật là hai điều kiện độc lập; nếu chưa có traffic thì không tạo số. Thiết kế ở Phase 4 phải kiểm được điều kiện này trước khi milestone hoàn tất.
- Mã thiết bị ngẫu nhiên first-party, được giữ ở trình duyệt khi được phép; server giữ khóa giả danh tối thiểu để dedupe. Không lấy IP làm mã thiết bị vì nhiều thiết bị chung mạng và một thiết bị đổi IP. Không ép gộp theo người.
- IP do hạ tầng tin cậy cung cấp chỉ dùng chống lạm dụng. Không tin giá trị IP do client tự gửi; không lưu IP gốc vào bảng analytics hoặc trả ra public. Có thể băm có khóa, thời hạn ngắn cho bucket giới hạn; ngưỡng/TTL cụ thể cần kiểm tải, tránh chặn nhầm nhiều thiết bị dùng chung mạng. [Header IP và giới hạn theo luồng Cloudflare](https://developers.cloudflare.com/fundamentals/reference/http-headers/#cf-connecting-ip).
- Rate limiting binding có sẵn để bảo vệ ingest; giới hạn là **xấp xỉ, theo location**, không phải bộ đếm toàn cầu chính xác. Không dùng kết quả rate limiter để tính unique/DAU/MAU; SQL chịu trách nhiệm dedupe và tăng số an toàn khi retry/đồng thời. Nếu cần trần chặt toàn hệ thống, đó là thiết kế thêm phải kiểm trước thực thi, không hứa binding tự làm được. [Nguồn rate limiting](https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/).
- Mỗi lượt mở trang hợp lệ có khóa sự kiện để không bị nhân đôi vì gửi lại/lifecycle dev. Khi từ chối nhận diện, chỉ tăng aggregate, không tạo identifier bền hay hàng daily-unique. Origin check không tự chứng minh người thật; bộ lọc bot/chống spam phải có kiểm tập trung trước tăng số. Owner opt-out đáng tin được chọn ở Phase 4, không loại cả một IP chung như thể tất cả là owner.
- Chỉ lưu trạng thái cần tính số hiện tại: sổ unique tối thiểu từ mốc milestone, hoạt động theo thiết bị/ngày trong cửa sổ cần tính 30 ngày, số tổng và snapshot mới nhất. Không giữ log từng click/page path hoặc thêm báo cáo lịch sử chỉ vì có database. Dọn dữ liệu ngoài cửa sổ, khóa rate-limit hết hạn và khóa chống retry theo TTL phù hợp; dữ liệu tối thiểu dedupe unique toàn kỳ không thể xóa mỗi 30 ngày rồi vẫn tuyên bố tổng unique chính xác.
- Snapshot hằng ngày có thể dùng Workers Cron; cron chạy UTC, ứng dụng tự quy đổi ranh giới VN. Chọn giờ chạy/kiểm lỡ lịch trong kế hoạch Phase 4, giữ snapshot trước nếu cập nhật thất bại. Không nhầm reset quota UTC thành reset DAU Việt Nam. [Nguồn Cron](https://developers.cloudflare.com/workers/configuration/cron-triggers/).

## Phụ thuộc thực hiện còn lại

Không còn câu S nghiệp vụ chưa trả lời. Không hỏi lại quyền chọn kiến trúc theo S20. Phương án có điều kiện vận hành: host/origin thật, quyền account Cloudflare/D1, hạn mức account thực tế và bộ lọc/rate limit/owner exclusion phải kiểm khi Phase 4 được gọi. Chưa được tạo account, thay DNS, cài dependency, mua gói hoặc deploy ở lượt này; không suy lựa chọn S20 thành các hành động đó.

Ngày hoàn thành milestone chưa có. QR/đích donate chờ owner bổ sung; thiết kế có thể dành chỗ, chỉ hiển thị QR hoạt động sau khi có tư liệu đúng đích được xác nhận. Nội dung donate chưa cung cấp không được ngụy tạo để lấp layout. Nếu owner bổ sung sau milestone thì cập nhật riêng, không tự đánh dấu QR đã bàn giao.

Giữ footer **một viewport**, tên bảy art/BGM và credits, liên hệ, social, chỉ số đầy đủ + giải thích; đáp ứng phóng chữ/màn nhỏ như Q19/QUALITY-01/03. Việc chốt nghiệp vụ và chọn hướng đo không chứng minh giao diện đã dựng, counter chạy thật, bộ lọc chặn được mọi bot hoặc đạt quyền công khai website.
