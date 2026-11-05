# Quick 261105-jab — Chốt câu trả lời fantasy và gộp milestone

**Ngày:** 2026-11-05 · **Workflow:** gsd-quick, inline, tuần tự.

## Phạm vi đã được giao

Ghi đúng 20 câu trả lời trực tiếp và ghi chú typography; cập nhật hợp đồng phạm vi, yêu cầu, lộ trình tối đa 5 phase và trạng thái. Không bắt đầu phase, prototype R02, UI-SPEC hoặc triển khai ứng dụng.

## Công việc

1. Lưu nguyên văn đáp án cùng nguồn chat; phân biệt quyết định đã chốt, phần giao sáng tạo và phần chưa có dữ kiện.
2. Giữ 58 mã yêu cầu cũ, ghi ngoại lệ mới có nguồn; bổ sung yêu cầu fantasy/footer. Gộp thành 5 MVP phase, mỗi yêu cầu có một phase chịu trách nhiệm.
3. Đồng bộ PROJECT, STATE, PRODUCT, AGENTS; giữ config thủ công/no-subagent. Trong HTML duy nhất, đánh dấu Q đã trả lời và thêm vùng nghiệp vụ mới cho cách hiểu số lượt xem; không hỏi lại thiết kế đã chốt.
4. Kiểm tĩnh dữ liệu/HTML/truy vết, parser GSD và diff; commit chỉ tài liệu thuộc nhiệm vụ.

## Ràng buộc

- Nhánh hiện tại giữ nguyên theo `git.branching_strategy=none`; không chuyển nhánh mang theo thay đổi ngoài phạm vi.
- Không sửa ảnh gốc, app, dependency, archive đáp án cũ hoặc khôi phục ba tài liệu phase đang bị xóa ngoài nhiệm vụ.
- Không đổi đề xuất Sketch 002 thành lựa chọn; quyết định Q03/Q07 mới chi phối phần mở đầu có xung đột.
- Xác minh tài liệu không phải nghiệm thu hình ảnh, runtime, thiết bị, giao thư hay số khách thật.

## Kiểm tra dự kiến

20 đáp án đủ, đúng thứ tự; 58 mã gốc giữ nguyên, 16 mã mới được gán đủ một lần; đúng 5 phase, phụ thuộc hợp lệ, tiêu chí GSD đọc được. HTML giữ nguyên phần lịch sử và script, vùng mới không CSS/JS, 20 câu S không tự chọn câu trả lời. Kiểm stage trước commit để loại thay đổi có sẵn.
