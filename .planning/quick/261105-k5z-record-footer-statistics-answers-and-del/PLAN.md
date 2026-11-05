# Quick 261105-k5z — Ghi S01–S20 và chốt hướng đo

**Ngày:** 2026-11-05 · **Workflow:** gsd-quick, inline, tuần tự, không subagent.

## Phạm vi

Lưu nguyên văn 20 đáp án footer do user gửi; chốt nghĩa nghiệp vụ, chọn phương án theo S20 và cập nhật hồ sơ hiện hành/biên nhận trong HTML. Giữ 5 phase, 74 mã, thực thi 0/5; không bắt đầu phase, sửa app hoặc triển khai dịch vụ.

## Công việc

1. Archive đáp án và hợp đồng footer: mốc hoàn thành milestone, ngày Việt Nam/30 ngày, thiết bị, loại lượt không hợp lệ, snapshot hằng ngày và số gần nhất, aggregate khi từ chối nhận diện, liên hệ/social/QR còn chờ tư liệu.
2. S20 giao agent chọn: nghiên cứu nguồn chính thức cho quyết định cụ thể, ghi Workers + D1 là hướng cho Phase 4 cùng giới hạn/quyền riêng tư cần thực thi. Không coi nguồn docs là bằng chứng tài khoản/measurement chạy thật.
3. Đồng bộ REQUIREMENTS/ROADMAP/PROJECT/STATE/PRODUCT/AGENTS và phần footer trong context fantasy. Thêm biên nhận S ở HTML duy nhất, giữ nguyên câu hỏi/lịch sử/scripts.
4. Kiểm dữ liệu/HTML/truy vết/diff; commit chỉ tài liệu thuộc nhiệm vụ. Config, app/assets, archive cũ và thay đổi có sẵn nằm ngoài commit.

## Cách hiểu cần ghi rõ

- S10 “Defer bản xem thử” áp dụng lượt bản thử trong câu hỏi S10: không nhập lượt thử vào bộ đếm thật; không tự suy ra hủy các công việc sketch/R02 khác.
- S14 không yêu cầu cờ ngày thiếu dữ liệu; vẫn không bịa bù số hoặc dùng 0 thay unknown.
- S15 thêm nội dung/hành động footer; không suy thành chỉ số lượt liên hệ/social/donate hoặc thực hiện giao dịch.
- S17 yêu cầu rate limit/IP; không tự coi đó là yêu cầu danh sách IP công khai hay lưu IP gốc vĩnh viễn.
- S19 tổng lượt vô danh tách khỏi unique/DAU/MAU, không dựng danh tính cho người từ chối đo.

## Kiểm tra

20 mã/đáp án đủ, 74 mã ánh xạ đúng một lần/5 phase, native criteria phase 4 còn đọc được, S đánh dấu nhận đủ không bị xem là câu chưa trả lời. HTML ngoài đoạn chèn giữ nguyên, không CSS/JS mới; config/assets và archive Q cũ nguyên vẹn. Không chạy build/test/UI browser cho lượt tài liệu.
