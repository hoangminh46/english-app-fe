# Changelog

Tất cả các thay đổi quan trọng của dự án sẽ được ghi lại tại đây.

## [Unreleased]

### Added
- Thêm `AuthGuard` component để quản lý quyền truy cập route.
- Tích hợp Google OAuth2 login flow.
- Thêm `KnowledgeNotesWidget` nổi hỗ trợ lưu trữ từ vựng nhanh.
- Thêm logic `NoteForm` hỗ trợ thêm/sửa ghi chú đa năng.
- Thêm màn hình Loading Animation mượt mà khi xác thực.
- Tích hợp **Zod** và **React Hook Form** cho `NoteForm` để tăng cường validation.

### Changed
- Cập nhật **Next.js 16** và **Tailwind CSS 4**.
- Cấu trúc lại `authService.ts` và `noteService.ts` để tối ưu hóa việc gọi API.
- Cập nhật giao diện Header hỗ trợ hiển thị thông tin User sau login.
- Refactor `AuthContext.tsx` để sử dụng `authService` thống nhất và bổ sung SSR check cho `localStorage`.

### Fixed
- Sửa lỗi redirect không đúng khi token hết hạn.
- Tối ưu hóa việc render UI trong `NoteCard` để tránh flickering.
- **Critical Fix:** Sửa lỗi import `next/router` sai trên Next.js 16 (chuyển sang `next/navigation`).

## [0.1.0] - 2026-01-01
- Khởi tạo dự án Next.js cơ bản.
