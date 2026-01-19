# API Endpoints Documentation

Tài liệu này liệt kê các API endpoints chính mà Front-end tương tác với Backend.

## 1. Authentication
Base URL: `process.env.NEXT_PUBLIC_API_URL` hoặc `http://localhost:5000`

### GET /api/v1/auth/google
- **Description:** Khởi đầu flow đăng nhập Google. Backend sẽ redirect user đến Google login page.
- **Redirects:** Về Frontend sau khi login thành công.

### GET /api/v1/auth/me
- **Description:** Lấy thông tin người dùng hiện tại dựa trên token.
- **Response:** `{ success: boolean, data: User }`

### PUT /api/v1/auth/audience
- **Description:** Cập nhật đối tượng/mục tiêu học tập của người dùng.
- **Body:** `{ audience: string }`

### PUT /api/v1/auth/language
- **Description:** Cập nhật ngôn ngữ hiển thị của người dùng.
- **Body:** `{ language: string }`

### POST /api/v1/auth/logout
- **Description:** Đăng xuất người dùng.

## 2. Knowledge Notes

### GET /api/v1/notes
- **Description:** Lấy toàn bộ danh sách ghi chú.
- **Response:** `{ success: boolean, data: AllNotesData }`

### POST /api/v1/notes
- **Description:** Tạo một ghi chú mới.
- **Body:** `NoteFormData`

### GET /api/v1/notes/stats
- **Description:** Lấy thống kê số lượng ghi chú theo loại.

### GET /api/v1/notes/search
- **Description:** Tìm kiếm ghi chú theo keyword.
- **Query Params:** `?keyword=...&page=...`

### GET /api/v1/notes/category/:category
- **Description:** Lấy danh sách ghi chú theo phân loại.

### PATCH /api/v1/notes/category/:category/item/:itemId/toggle-learned
- **Description:** Đánh dấu đã học hoặc chưa học một mục ghi chú.

### DELETE /api/v1/notes/category/:category/item/:itemId
- **Description:** Xóa một mục ghi chú.

## 3. AI Assistant
### POST /api/v1/chat/ask
- **Description:** Gửi câu hỏi và ngữ cảnh đến AI Assistant.
- **Body:** `{ message: string, context: { type: string, data: any }, history: Message[] }`
- **Response:** `{ success: boolean, data: { answer: string } }`
