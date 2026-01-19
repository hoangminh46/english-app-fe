# Phase 01: Setup & Basic UI
Status: ⬜ Pending
Dependencies: None

## Objective
Tạo giao diện cơ bản cho Trợ lý Mine bao gồm nút nổi (Floating Action Button) và khung chat ban đầu.

## Requirements
### Functional
- [x] Hiển thị nút FAB ở góc dưới bên phải màn hình sử dụng ảnh đại diện của Mine.
- [x] Khi click vào FAB, mở cửa sổ chat với hiệu ứng trượt/phóng to.
- [x] Cửa sổ chat có header (Tên Mine, Avatar, Status), khu vực tin nhắn (có avatar từng dòng), và input field.

### Non-Functional
- [ ] UI đồng bộ với phong cách "Playful" (bo góc lớn, màu Blue chủ đạo).
- [ ] Sử dụng Framer Motion cho animation mượt mà.

## Implementation Steps
1. [x] Tạo component `src/components/layout/FloatingAssistant.tsx`.
2. [x] Thiết kế nút FAB với icon robot/mascot. (Đã dùng Avatar Mine xinh xắn)
3. [x] Thiết kế `ChatWindow` với Glassmorphism và bo góc 24px.
4. [x] Tích hợp component này vào `src/app/layout.tsx` để xuất hiện toàn trang.

## Files to Create/Modify
- `src/components/layout/FloatingAssistant.tsx` - New component.
- `src/app/layout.tsx` - Tích hợp helper component.

## Test Criteria
- [x] Nút Mine xuất hiện ở mọi trang.
- [x] Bấm nút chat hiện lên/ẩn đi mượt màng.
- [x] Giao diện responsive trên mobile.

---
Next Phase: [phase-02-client-chat-logic.md]
