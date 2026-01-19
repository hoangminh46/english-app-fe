# Phase 02: Chat Logic & Mock API
Status: ✅ Complete
Dependencies: Phase 01

## Objective
Xử lý logic quản lý tin nhắn và thiết lập Mock API để giả lập phản hồi từ Mine.

## Requirements
### Functional
- [x] Quản lý mảng tin nhắn `messages` trong State.
- [x] Tạo hàm `mockChatAPI` giả lập độ trễ (1-2s) và trả về nội dung text tùy biến.
- [x] Hiển thị tin nhắn người dùng và tin nhắn của Mine khác màu.
- [x] Hiển thị "Mine đang suy nghĩ..." (typing indicator) trong lúc chờ Mock API.
- [x] Tự động cuộn xuống dưới cùng khi có tin nhắn mới.

## Implementation Steps
1. [x] Cấu trúc dữ liệu tin nhắn: `{ role: 'user' | 'assistant', content: string }`.
2. [x] Viết hàm `sendMessage` gọi `mockChatAPI`.
3. [x] Xử lý logic hiển thị Typing Indicator.
4. [x] Sử dụng `useRef` để scroll to bottom mỗi khi `messages` thay đổi.

## Files to Create/Modify
- `src/components/layout/FloatingAssistant.tsx` - Implement logic.

---
Next Phase: [phase-03-context.md]
