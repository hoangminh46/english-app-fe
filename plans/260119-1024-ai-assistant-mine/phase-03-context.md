# Phase 03: Context Integration
Status: ✅ Complete
Dependencies: Phase 02

## Objective
Giúp Mine "thấy" được người dùng đang học gì thông qua việc trích xuất dữ liệu từ LocalStorage.

## Requirements
### Functional
- [x] Truy xuất dữ liệu `quizData` và `currentQuestionIndex` từ LocalStorage khi đang ở `/quiz`.
- [x] Truyền các thông tin này vào tham số context khi gọi Mock API.
- [x] Mock API trả về phản hồi có chứa thông tin liên quan đến câu hỏi (giả lập việc AI đã hiểu ngữ cảnh).

## Implementation Steps
1. [x] Viết helper function để detect current context dựa trên `window.location.pathname`.
2. [x] Mapping dữ liệu Quiz thành format context object.
3. [x] Cập nhật hàm `mockChatAPI` để nhận thêm context và thay đổi response logic cho phù hợp.

## Files to Create/Modify
- `src/components/layout/FloatingAssistant.tsx` - Extract context & update mock.

---
Next Phase: [phase-04-polish.md]
