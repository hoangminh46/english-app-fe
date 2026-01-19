# Phase 04: Vibe & Polish
Status: ✅ Complete
Dependencies: Phase 03

## Objective
Hoàn thiện "nhân cách" và trải nghiệm thị giác cho Mine trên Frontend.

## Requirements
### Functional
- [x] Thêm các gợi ý chat (Suggested Quick Prompts) như: "Giải thích câu này cho anh", "Từ này phát âm sao em?".
- [x] Hỗ trợ Emoji và định dạng Markdown (In đậm, In nghiêng) trong tin nhắn.

### Non-Functional
- [x] Animation mượt mà khi tin nhắn xuất hiện bằng Framer Motion.
- [x] Tinh chỉnh màu sắc, shadow và blur hiệu ứng Glassmorphism.

## Implementation Steps
1. [x] Thêm dãy nút "Quick Actions" phía trên input chat.
2. [x] Sử dụng một library render markdown đơn giản (nếu cần) hoặc tự handle format cơ bản. (Đã dùng Regex helper)
3. [x] Hoàn thiện CSS cho bong bóng chat và icon mascot.

## Files to Create/Modify
- `src/components/layout/FloatingAssistant.tsx` - Polish UI/UX.

---
Next Phase: [phase-05-testing.md]
