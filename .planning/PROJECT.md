# Neon Portfolio — Cinematic Personal World

**Phạm vi hiện hành — 05/11/2026:** 5 phase / 74 yêu cầu (58 baseline + 16 fantasy/footer). Q01–Q20 và S01–S20 trực tiếp thay các điểm xung đột trong quyết định cũ; xem [hợp đồng fantasy](discovery/fantasy-journey-context-2026-11-05.md). Lịch sử 7 phase bên dưới là quyết định tại thời điểm cũ, không phải lộ trình đang thực thi.

## What This Is

Nâng cấp toàn diện portfolio dev của Bùi Bảo Long thành một thế giới cá nhân có câu chuyện, giúp khách hàng và người muốn cùng xây sản phẩm thấy được khả năng biến ý tưởng thành ứng dụng hoàn chỉnh. Hệ thiết kế mới kết hợp Cinematic, Motion design, Motion typography, Motion graphic và Glassmorphism / Liquid Glass, với chất lượng tương đương ở tiếng Việt/Anh, sáng/tối và máy tính/điện thoại. Đây là nâng cấp website React hiện có, không phải tạo một sản phẩm khác từ đầu.

## Core Value

Người xem nhớ dấu ấn Bùi Bảo Long và tin khả năng xây sản phẩm qua những dự án được kể rõ, đẹp và dễ khám phá.

## Business Context

- **Customer**: Khách hàng cần người xây ứng dụng và người muốn cùng làm sản phẩm; người tuyển dụng có đường đọc nhanh tới dự án và vai trò.
- **Revenue model**: Portfolio hỗ trợ cơ hội hợp tác và làm độc lập theo dự án; điều kiện hợp tác trao đổi riêng, không có checkout trên website. S15 bổ sung QR donate do owner gửi sau, không tự tạo giao dịch hoặc người nhận.
- **Success metric**: Người xem đi sâu vào dự án và tiếp cận liên hệ; chủ portfolio tự tin chia sẻ công khai. S01–S20 chốt số khách footer; S20 giao agent chọn Workers + D1 làm hướng đo, chưa cấu hình hoặc triển khai. Không có ngưỡng thành công bằng số lượng.
- **Strategy notes**: Chuỗi câu trả lời được lưu nguyên byte tại `.planning/discovery/answers-2026-10-19.json`, `answers-2026-10-19-followup.json` và `answers-2026-10-19-final.json`; bộ cuối có đủ 200 câu và là nguồn mới nhất. Nguồn gốc quyết định nằm trong `workflow-decisions.json`.

## Requirements

### Validated — inferred existing baseline

Các năng lực dưới đây được suy ra từ mã nguồn hiện tại, không phải chứng nhận runtime hay dịch vụ đã hoạt động trong phiên này.

- ✓ Trang chủ giới thiệu bản thân, kỹ năng và ba dự án — `src/pages/Home.tsx`, `src/siteConfig.ts`.
- ✓ Trang `/contact` có kiểm tra email/lời nhắn, gửi qua EmailJS và thông báo kết quả — `src/pages/Contact.tsx`; chưa xác nhận giao thư thực tế.
- ✓ Có CV, GitHub, LinkedIn, Facebook và ảnh dự án — `src/siteConfig.ts`; chưa xác minh đích công khai còn truy cập được.
- ✓ Có lựa chọn sáng/tối được lưu ở trình duyệt — `src/contexts/ThemeContext.tsx`.
- ✓ Có shell dùng chung, điều hướng, phần cuối trang và hiệu ứng hiện có — `src/components/AppShell.tsx`, `src/styles/*`.

### Active

- [ ] Thiết lập hệ thiết kế mới, dùng chất kính xuyên suốt nhưng tiết chế; cá tính táo bạo, chuyên nghiệp, màu giàu tương phản nhưng không chói, hình khối mềm; chữ thanh lịch và nội dung chính luôn rõ.
- [ ] Đổi toàn bộ cách thể hiện khi cần, đồng bộ toàn site, giữ dấu ấn tên thật Bùi Bảo Long và cách sắp chữ/kể chuyện; không dùng anime/game làm nhận diện chính.
- [ ] Trang chủ bắt đầu tối → lóe sáng → camera tiến vào vùng sáng R02 chứa tên/giới thiệu ngắn theo Q03 mới. Mạch đọc giữ giới thiệu → kỹ năng → dự án → phần về tôi đầy đủ → kết nối; đường nhanh/nội dung tiếp cận được không phải chờ media. Điều hướng thu gọn khi đọc, mở khi chọn; liên hệ luôn dễ tìm.
- [ ] Giữ cả Vixie, website đặt xe, game 2D; Vixie dẫn đầu. Mỗi dự án có trang đọc sâu, tóm tắt dễ chia sẻ, vai trò một câu, trạng thái thật và bằng chứng sản phẩm; quay về đúng vị trí vừa xem.
- [ ] Vixie nhấn ý tưởng và trải nghiệm người dùng; website đặt xe nhấn phối hợp; game nhấn hành trình học hỏi. Giữ ảnh dự án hiện có và sắp lại; dùng ảnh trong bản xem thử khi chưa có sản phẩm/clip để ghi.
- [ ] Giữ Software Developer và Prompt Engineering. Thể hiện năng lực xây ứng dụng, kết nối hệ thống, hoàn thiện sản phẩm qua bằng chứng; bỏ các số 3+/20+ và cách tự phân hạng kỹ năng.
- [ ] Phần về tôi hướng tới điều muốn xây trong tương lai, nguyên tắc làm việc ngắn, dòng thời gian từ mốc thật, ảnh chân dung mới; CV ở phần về tôi và giữ đường dẫn hiện tại. AI được nói như công cụ hỗ trợ; cuối trang có câu ký tên ngắn.
- [ ] Có tiếng Việt/Anh ngay trong đợt này, đổi ngôn ngữ giữ nội dung đang đọc; có sáng/tối với chất lượng tương đương.
- [ ] Motion kể chuyện theo từng đoạn, điểm nhấn mạnh ở dự án chính, tiêu đề biến đổi rồi đọc rõ, đoạn dài đứng yên. Tương tác chủ động mới lặp hiệu ứng; có thể giữ một cảnh khi cuộn nếu cảnh đó kể điều quan trọng. Chuyển trang ngắn; lần quay lại vào nội dung ngay.
- [ ] Có lựa chọn giảm chuyển động dễ thấy: tất cả entity đứng yên, art low-detail theo Q18; trên điện thoại vẫn đủ nội dung và điều khiển. Hiệu ứng không được lặp đến mức che câu chuyện; thiếu hiệu ứng vẫn đọc và dùng đầy đủ.
- [ ] Nhạc nền cố định do chủ portfolio chọn, lặp vô hạn xuyên site, chỉ phát sau khi người xem tự bật. Nhớ lựa chọn trong phiên xem; lần mở mới bắt đầu yên lặng. Đổi trang không làm mất trạng thái đang nghe; khi minh họa có tiếng thì hạ nhạc nền và phục hồi đúng trạng thái trước đó.
- [ ] Giữ trang liên hệ riêng; chọn loại trao đổi để gợi ý phù hợp cho tuyển dụng hoặc dự án, lời nhắn tập trung mục tiêu sản phẩm. Nhắc rõ chỗ thiếu và vì sao cần; gửi thành công xác nhận đã nhận, không hứa thời hạn hồi đáp cụ thể.
- [ ] Nhận tài liệu PDF hoặc liên kết tài liệu trong lần nâng cấp này. Chọn tệp từ máy, không bắt nhập đường dẫn tệp thủ công; khi gửi tệp thất bại giữ lời nhắn và chỉ rõ tệp cần chọn lại. Lỗi gửi chung có lối email trực tiếp mang theo nội dung.
- [ ] Hiện email để sao chép và thành phố “Thành phố Hồ Chí Minh”; chuyện làm từ xa và điều kiện nhận việc trao đổi riêng. Giữ Facebook/GitHub/LinkedIn, lời giải thích ngắn rằng thông tin được dùng để trả lời trao đổi.
- [ ] Toàn bộ trang và trạng thái phụ cùng được nâng cấp: tải/chờ, trống, lỗi, gửi thành công/thất bại, đường dẫn sai, menu nhỏ, focus. Dùng bàn phím được, phóng to chữ không mất nội dung, máy yếu/mạng chậm nhận nội dung và hành động chính trước.
- [ ] Chủ portfolio xem và chốt trước khi công khai. Kiểm chứng các hành động quan trọng và nguồn nội dung thật; không dùng báo cáo tĩnh hoặc mock thay bằng chứng runtime.

### Out of Scope

- Sở thích cá nhân trong lần nâng cấp này — I01 quyết định bỏ; I02 bỏ trống là nhánh không áp dụng, không phải câu còn cần trả lời.
- Blog/bài chia sẻ, lời nhận xét chưa được cho phép, đặt lịch trao đổi — F11/F19/G13 chưa cần.
- Thêm dự án mới vào bộ ba hiện tại — H04 cho phép lùi việc bổ sung dự án; vẫn phải làm tốt cả ba dự án đã có.
- Học vấn/chứng chỉ trên trang chính — chỉ giữ trong CV theo F09.
- Tự thêm số liệu, mốc kinh nghiệm, vai trò cá nhân của nhóm, lời chứng thực hoặc trạng thái phát hành chưa được xác nhận — D06/D15/F07/I14–I18.
- Tự phát âm thanh khi mở trang hoặc lưu lựa chọn nghe giữa các lần mở mới — E19/I07 yêu cầu bật chủ động và nhớ trong phiên.
- Công khai điều kiện nhận việc từ xa, số điện thoại hoặc địa chỉ chi tiết — chưa được chọn; I04/I05 chỉ chốt thành phố.

## Context

### Existing codebase

- React 19, TypeScript, Vite, React Router; hai route `/` và `/contact`, shell và theme dùng chung, nội dung tập trung trong `src/siteConfig.ts`, ảnh trong `src/assets/`.
- EmailJS hiện chỉ nhận email/message; chưa có luồng tệp đính kèm. Giữ ranh giới giữa giao diện chọn PDF và bằng chứng tệp thật tới người nhận.
- Đã có `.planning/codebase/` và graph từ trước. Các mô tả cũ là điểm xuất phát, cần đối chiếu mã và bằng chứng hiện tại trước khi dùng làm kết luận.
- Có thay đổi `.gitignore`, `.graphifyignore`, codebase map và graph từ trước phiên khởi tạo; không gộp hoặc sửa những thay đổi đó trong công việc này.

### Discovery and interpretation

- 160 câu gốc và 20 câu bổ sung đã được đối chiếu với HTML; bộ bổ sung giữ nguyên toàn bộ 160 câu cũ. I20 chọn bắt đầu lập hồ sơ/lộ trình và ghi rõ mục còn chờ.
- F12 được I01 giải quyết: không có sở thích trong đợt này. H06 được I03 giải quyết: giữ đầy đủ mục tiêu, cho thêm thời gian nếu phát sinh. A17/G17 được I04/I05 giải quyết: hiện tên thành phố đã cung cấp, làm từ xa trao đổi riêng.
- C04 và C11 được giữ cùng nhau: giới thiệu ngắn ở đầu, phần về tôi đầy đủ sau dự án. D09 giữ ảnh dự án; F13 đổi ảnh chân dung. B07/B08 yêu cầu màu mạnh nhưng không chói, không loại bỏ một câu trả lời.
- E19 kết hợp lựa chọn và ghi chú: nhạc cố định lặp toàn site nhưng vẫn phải được người xem tự bật. I07/I08 bổ sung nhớ trong phiên và hạ nhạc nền khi minh họa có tiếng.
- Lusion (`https://lusion.co/`) là tham khảo do chủ portfolio đưa. Đã đọc nội dung công khai về kể chuyện tương tác; chưa xem xét trực tiếp chuyển động hoặc hiệu năng trên cùng thiết bị. Không xem tên tham khảo là yêu cầu sao chép bố cục/tài nguyên.
- B03 giao nghiên cứu chất kính. Phân bổ kính, palette, typography và chuyển động cụ thể vẫn cần mẫu để xem; không coi đề xuất của agent là quyết định đã được duyệt.

### Content and asset readiness

| Item | Current evidence | Next acceptance |
|------|------------------|-----------------|
| Nhạc nền | Tìm thấy `D:/Projects/Flutter/VixieAI/BoogieDown.mp3.mpeg`, 4,220,062 byte; I06 gọi “boogiedown” tại VixieAI root | Kiểm tra định dạng/phát thực tế khi làm âm thanh; chưa copy vào repo, chưa kiểm tra thời lượng |
| Chân dung | I12 nói có ảnh và sẽ gửi riêng | Chờ tệp thật; không tự thay bằng ảnh tạo mới |
| Lời mở đầu | I13 cho phép đề xuất từ câu trả lời | Soạn nháp VI/EN để chủ portfolio duyệt |
| Mốc kinh nghiệm | I14 sẽ cung cấp sau | Không tự thêm mốc; giữ mục chờ trước khi công khai |
| Vai trò Vixie | I15 cho phép soạn nháp từ dữ kiện đã xác minh | Nêu dự án từ mô tả hiện có; vai trò cá nhân vẫn cần dữ kiện/duyệt |
| Vai trò website đặt xe/game | I16/I17 yêu cầu chờ cung cấp | Không gán trách nhiệm nhóm hoặc thêm chi tiết mới |
| Minh họa ngắn | I18 chưa có sản phẩm để ghi | Bản xem thử dùng ảnh có sẵn; không tuyên bố đã có clip thật |
| Chữ ký | I19 muốn vài đề xuất | Chủ portfolio chọn câu trước khi công khai |
| CV | F18 giữ đường dẫn hiện tại | Kiểm tra đích và trải nghiệm mở hồ sơ; không đọc tài liệu riêng ngoài phạm vi |

## Constraints

- **Execution**: Inline, không spawn subagent, xử lý tuần tự. Không xem ghi chú trong tệp trả lời là quyền đổi ràng buộc trực tiếp trong chat.
- **Questioning**: Chỉ một HTML không CSS, khoảng 20 câu mỗi vùng cần làm rõ; câu hỏi bằng tiếng Việt đời thường, tập trung nghiệp vụ. Giữ mã câu, ý riêng và câu chưa chốt; không tự chọn mặc định.
- **Scope**: Toàn site và trạng thái phụ, ba dự án, hai ngôn ngữ và hai diện mạo. Không có hạn cố định; nếu phát sinh việc thì giữ mục tiêu, thêm thời gian theo I03.
- **Budget**: Ưu tiên tư liệu sẵn có hoặc miễn phí; chưa có phê duyệt mua dịch vụ hoặc tài nguyên.
- **Content**: Dữ kiện cá nhân, mốc, vai trò và kết quả phải có căn cứ; nháp chờ duyệt phải tách khỏi dữ kiện đã chốt.
- **Compatibility**: Nội dung và hành động chính phải hoạt động khi giảm motion, thiếu hiệu ứng, máy yếu, mạng chậm, dùng bàn phím hoặc phóng chữ.
- **Release**: I20 duyệt lập hồ sơ; J17/J18 duyệt 58 yêu cầu và 7 chặng đã được trình. Đây không phải duyệt thiết kế cuối hoặc tự công khai website. Những phần còn chờ phải được ghi rõ trong hồ sơ và cổng nghiệm thu.

## Workflow Decisions — approved J answers

- J01: chủ portfolio tự gọi từng chặng; không tự bắt đầu phase 1 hoặc chuyển chặng vì hồ sơ đã xong.
- J02/J13: ban đầu 7 chặng vừa; Q20 trực tiếp ngày 05/11 thay số lượng bằng tối đa 5. ROADMAP hiện dùng 5 chặng, mỗi chặng vẫn tạo luồng người xem dùng được.
- J03: hồ sơ đã chốt được lưu cùng lịch sử dự án.
- J04: đã nghiên cứu project bằng nguồn chính thức, đủ STACK/FEATURES/ARCHITECTURE/PITFALLS/SUMMARY; giữ nguyên phạm vi/lộ trình, bổ sung phụ thuộc thực tế.
- J05: chỉ nghiên cứu tiếp khi có quyết định cụ thể; không bắt buộc một lượt nghiên cứu riêng trước mọi chặng.
- J06/J08: đối chiếu cách làm trước triển khai và kiểm thay đổi dữ kiện để tránh dùng nguồn cũ.
- J07: đối chiếu tổng thể ở chặng cuối; không chạy lượt verifier tổng quát riêng sau mỗi chặng. Focused checks phù hợp với phần được giao và visual critique cần thiết vẫn phải thực hiện.
- J09–J12: bản bàn giao không cần mục User Stories & Acceptance Criteria riêng; giữ Risks & Dependencies, Success Metrics & Release Criteria, Stakeholder Review & Approval.
- J19: trao đổi thêm về tham khảo trước khi dựng bản xem thử; chưa chọn art direction hoặc tự tạo mockup trong init.
- J20: không bổ sung giới hạn nghiệp vụ khác.

### Selected copy

- Hero VI (J14): **Từ ý tưởng đến trải nghiệm ứng dụng rõ ràng và có dấu ấn.**
- Vixie headline VI (J15): **Vixie — Từ ý tưởng hình nền động đến trải nghiệm đồng hành.** Đây là mô tả sản phẩm, không phải bằng chứng vai trò cá nhân.
- Signature VI (J16): **Bùi Bảo Long — Còn nhiều điều để xây.**
- Bản EN cần biên tập đúng nghĩa trong công việc nội dung; không coi bản dịch nháp là lời đã duyệt riêng.

### UI skill preference captured from closing notes

Ghi chú trả lại cùng questionnaire yêu cầu taste-skill để tạo hướng thiết kế, Impeccable để verify/critique. Ghi nhận như sở thích quy trình UI/UX trong phạm vi portfolio; không dùng ghi chú để thay lệnh trực tiếp không subagent, tự chạy chặng hoặc cài công cụ.

- Taste được xác định tại `C:/Users/neong/.agents/skills/design-taste-frontend/SKILL.md`. Mặc định cấm kính của skill xung đột brief trực tiếp; giữ Glass/Liquid Glass và ghi ngoại lệ có căn cứ trong lượt UI được giao. Không sửa skill toàn cục hoặc che kết quả inspector.
- Ở lượt kiểm đầu chưa thấy Impeccable; kiểm lại theo hook mới xuất hiện đã tìm thấy và đọc `C:/Users/neong/.agents/skills/impeccable/SKILL.md`, phiên bản 4.6.0. Khi làm UI được giao, dùng context và playbook critique/audit của skill; chưa chạy context hoặc critique trong init. Giới hạn kiểm trực quan theo skill: một lượt desktop/mobile cùng batch, tối đa một lượt xác nhận sau sửa.
- Chưa thực hiện thiết kế hoặc critique UI trong khởi tạo này.

### Research-derived readiness gates

- Phase 3: `MetaTags.tsx` hiện cập nhật head bằng useEffect và có URL mẫu. Chốt đầu ra route/locale phù hợp cho chia sẻ và kiểm HTML/đích preview thực; chưa cần đổi framework trong init.
- Phase 4: EmailJS Free không có attachment theo bảng giá đã kiểm tra. Xác minh gói/template/giới hạn hoặc chốt phương án phù hợp ngân sách trước triển khai PDF. Yêu cầu PDF vẫn giữ; không tự mua hoặc chỉ thay bằng liên kết.
- Phase 2 mới: cleanup motion theo vòng đời route/locale, fallback giảm motion; hiệu năng blur cần đo khi có UI.
- Phase 4 mới: kiểm định dạng/phát nhạc thật; giữ intent nghe tách khỏi ducking. Không suy ra phát được từ tên file.

## Key Decisions

| Decision | Rationale / source | Outcome |
|----------|--------------------|---------|
| Tên thật Bùi Bảo Long; giữ Software Developer, Prompt Engineering | B01, F02/F03 | Chốt nghiệp vụ, chưa triển khai |
| Cinematic + Motion design/typography/graphic + Glass/Liquid Glass toàn site | Yêu cầu trực tiếp, B04/B20/H01 | Chốt hướng; giải pháp hình ảnh cụ thể còn phải xem mẫu |
| Ưu tiên khách hàng/cùng xây sản phẩm, dấu ấn cá nhân, đọc sâu dự án | A01–A09, A19/A20 | Chốt |
| Giữ bộ ba; Vixie dẫn đầu, dự án có trang riêng | D01/D02, C12 | Chốt |
| VI/EN và sáng/tối ngang chất lượng | C17/C18, H13 | Chốt |
| Không sở thích; bỏ số 3+/20+, không xếp hạng kỹ năng | I01, F06/F07 | Chốt |
| Hiện Thành phố Hồ Chí Minh; làm từ xa trao đổi riêng | I04/I05 giải quyết A17/G17 | Chốt |
| PDF hoặc liên kết; lỗi tệp giữ lời nhắn và nêu tệp cần chọn lại | G14, I09–I11 | Chốt trải nghiệm; tích hợp thật chưa chứng minh |
| Nhạc bật chủ động, nhớ trong phiên, lặp toàn site, hạ khi minh họa có tiếng | E19, I06–I08 | Chốt; tìm thấy tệp nguồn, chưa tích hợp |
| Chưa có clip: ảnh có sẵn cho bản xem thử | I18 | Chốt cho bản xem thử; tiêu chí công khai phải ghi rõ |
| Giữ đầy đủ mục tiêu, thêm thời gian khi phát sinh | I03, H05 | Chốt |
| Bắt đầu hồ sơ/lộ trình, giữ mục chưa có là chờ | I20, J17/J18 | Đã duyệt baseline 58 yêu cầu/7 chặng ngày 19/10; Q20 ngày 05/11 thay bằng 5 chặng, chưa triển khai |
| Tự gọi từng chặng, kiểm cách làm trước, tổng kiểm ở cuối | J01/J06/J07 | Chốt; cấu hình và workflow-policy ghi đúng lựa chọn |
| Trao đổi tham khảo trước dựng mẫu | J19 | Chốt; art direction còn mở |

## Design extension — 2026-11-04 (lịch sử, đã được trả lời ngày 05/11)

- Chủ portfolio giữ nguyên yêu cầu đã khóa và bổ sung trải nghiệm kể chuyện fantasy 3D từ đúng 7 ảnh trong `src/assets/resources/`. Giữ đúng đồ họa, không gian, không khí và thẩm mỹ của từng ảnh (yêu cầu 100%); không low-poly. Tạo chuyển động tự nhiên ở phần có thể chuyển động; camera đổi vị trí/góc theo cuộn.
- “Từ vực sâu đến đỉnh cao” là chủ đề gợi ý. Thứ tự, điểm nối, khung đối chiếu, vùng chưa có tư liệu, vị trí nội dung thật và chặng tích hợp còn cần chốt. Không đổi 58 yêu cầu/7 chặng, không hủy hướng mở đầu C hoặc tự duyệt menu Sketch 002.
- Bản đối chiếu ảnh và đề xuất kỹ thuật: [.planning/quick/261104-q6d-record-fantasy-journey-design-extension-/SUMMARY.md](quick/261104-q6d-record-fantasy-journey-design-extension-/SUMMARY.md). Vùng xám Q01–Q20 nằm trong [HTML chung](discovery/project-questions.html#fantasy-journey).

## Quyết định fantasy — 2026-11-05 (hiện hành)

- Nguồn trực tiếp: [Q01–Q20 và ghi chú typography](discovery/fantasy-journey-answers-2026-11-05.json). [Hợp đồng chi tiết](discovery/fantasy-journey-context-2026-11-05.md) tách điều bắt buộc, phần giao sáng tạo và phụ thuộc còn chờ.
- Kể cách biến ý tưởng thành sản phẩm; **R02 → R03 → R05 → R01 → R07 → R04 → R06**, bảy cảnh ngang tầm, kết ở biển mây R06. Không cắt cảnh dưới mọi hình thức; được sáng tạo vùng nối fantasy hợp lý và phần khuất/ngoài khung, không thêm art nguồn thứ tám.
- R02 tối/lóe sáng rồi tiến về tên/giới thiệu trong vùng sáng, xuyên khe đá mở ra thế giới. R01 từ góc nguồn bay chếch lên hẻm núi; R03/R05/R07 lướt qua; R04 thay tháp bằng nhà kiểu R06; R06 nhìn quanh, liệng qua building rồi lên trời. Góc/quỹ đạo còn lại được giao chọn.
- Chất art 100%, không low-poly; các ngoại lệ chủ portfolio đã cho phép là bỏ toàn bộ nhân vật, thay kiến trúc R04, sáng tạo phần khuất/vùng nối, ngày/đêm, low-detail khi giảm motion. Không thể gọi những góc/ánh sáng đã đổi là trùng pixel ảnh gốc.
- Cảnh thường luôn sống kể cả lúc ngừng scroll. Giảm motion là ngoại lệ: mọi entity đứng yên, art low-detail, không mất nội dung/hành động. Light trời sáng, Dark trời tối cùng lớp chữ/điều hướng; giữ lựa chọn người xem.
- Typography blend vào cảnh. **R01: title ngay chóp vách, body khắc lên vách**. Vị trí nội dung khác giao chọn theo art, giữ đường đọc/ngữ nghĩa và nội dung thật. Quay từ dự án về đúng cảnh vừa rời, không xem lại intro.
- Footer **một viewport**, tên art/BGM, credits, liên hệ/social, unique/DAU/MAU và giải thích; QR donate owner thêm sau. S đã trả lời, xem [hợp đồng footer](discovery/footer-statistics-context-2026-11-05.md): bắt đầu ngày hoàn thành milestone, tính thiết bị mở mọi route, ngày VN/30 ngày, loại owner/bot/spam/preview, số đầy đủ/snapshot hằng ngày/số gần nhất khi lỗi, tổng lượt vô danh khi từ chối nhận diện và rate limit/IP. S20 giao agent chọn Workers + D1; chưa tạo account, mua hay deploy. Ghi công không tự xác nhận quyền dùng art/nhạc.
- **5 phase / 74 yêu cầu / thực thi 0/5** theo Q20. Giữ 58 mã baseline, thêm 16 mã; [ROADMAP](ROADMAP.md) thay lộ trình 7 chặng. Nếu thử cảnh thì chọn R02, chưa tự chạy thử. Entrance C là lựa chọn lịch sử còn giữ ở phần phù hợp, Q03 mới chi phối phần xung đột; menu Sketch 002 chưa chọn.
- Không sửa app/ảnh/dependency ở lượt này, không tự bắt đầu phase hay khôi phục tài liệu phase bị xóa ngoài nhiệm vụ. Dữ kiện cá nhân, PDF/provider, metadata/host, play BGM và nguồn/quyền dùng art vẫn có cổng kiểm tương ứng.

## Footer đã chốt — S01–S20, 2026-11-05

[Đáp án trực tiếp](discovery/footer-statistics-answers-2026-11-05.json) giữ nguyên văn. Không còn câu S chưa trả lời; phương án theo S20 là lựa chọn được ủy quyền, chưa phải dịch vụ đang chạy. S10 áp dụng lượt xem thử, không tự hủy workflow thử R02; S14 không cần badge ngày đo thiếu; S15 thêm nội dung footer, không thêm chỉ số click/chuyển tiền. Mốc milestone chưa có, QR/đích donate chờ owner bổ sung. Giữ 5 phase / 74 mã / thực thi 0/5, không tự bắt đầu phase.

## Evolution

Sau mỗi chặng: đối chiếu mục tiêu với hành vi đã kiểm chứng, cập nhật yêu cầu/điểm còn chờ, ghi quyết định mới và điều chỉnh mô tả nếu thực tế thay đổi. Chỉ chuyển Active sang Validated khi có bằng chứng phù hợp. Sau mỗi mốc phát hành: rà lại giá trị cốt lõi, mục tiêu cơ hội, phạm vi và tư liệu; không biến mục tạm hoãn thành hoàn tất.

---
*Last updated: 2026-11-05 — câu trả lời Q/S và typography được ghi; 5 phase / 74 yêu cầu. Chưa bắt đầu thực thi lộ trình mới.*
