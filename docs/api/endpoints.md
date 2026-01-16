# API Endpoints Documentation

Tài liệu này liệt kê các API endpoints chính mà Front-end tương tác với Backend.

## 1. Authentication
Base URL: `process.env.NEXT_PUBLIC_API_URL` hoặc `http://localhost:5000`

### GET /api/auth/google
- **Description:** Khởi đầu flow đăng nhập Google. Backend sẽ redirect user đến Google login page.
- **Redirects:** Về Frontend sau khi login thành công.

### GET /api/auth/me
- **Description:** Lấy thông tin người dùng hiện tại dựa trên token.
- **Response:** `{ success: boolean, data: User }`

### PUT /api/auth/audience
- **Description:** Cập nhật đối tượng/mục tiêu học tập của người dùng.
- **Body:** `{ audience: string }`

### PUT /api/auth/language
- **Description:** Cập nhật ngôn ngữ hiển thị của người dùng.
- **Body:** `{ language: string }`

### POST /api/auth/logout
- **Description:** Đăng xuất người dùng.

## 2. Knowledge Notes

### GET /api/notes
- **Description:** Lấy toàn bộ danh sách ghi chú.
- **Response:** `{ success: boolean, data: AllNotesData }`

### POST /api/notes
- **Description:** Tạo một ghi chú mới.
- **Body:** `NoteFormData`

### GET /api/notes/stats
- **Description:** Lấy thống kê số lượng ghi chú theo loại.

### GET /api/notes/search
- **Description:** Tìm kiếm ghi chú theo keyword.
- **Query Params:** `?keyword=...&page=...`

### GET /api/notes/category/:category
- **Description:** Lấy danh sách ghi chú theo phân loại.

### PATCH /api/notes/category/:category/item/:itemId/toggle-learned
- **Description:** Đánh dấu đã học hoặc chưa học một mục ghi chú.

### DELETE /api/notes/category/:category/item/:itemId
- **Description:** Xóa một mục ghi chú.
