# System Architecture - English App FE (Mine)

## 1. Overview
Mine là một ứng dụng Web Front-end hỗ trợ học tiếng Anh, tập trung vào việc ghi chú từ vựng thông minh và luyện tập qua các trò chơi tương tác.

## 2. Tech Stack
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4, Framer Motion (Animations)
- **State Management:** React Context API, TanStack Query (React Query)
- **HTTP Client:** Axios
- **UI Components:** Radix UI, Lucide React, Sonner (Toasts)

## 3. Core Modules

### 3.1. Authentication
- Sử dụng Google OAuth2 (Backend-driven redirect).
- **AuthGuard:** Bảo vệ các route private, quản lý trạng thái login global.
- Lưu trữ token và thông tin user tại `localStorage`.

### 3.2. Knowledge Notes
- Quản lý từ vựng, công thức và ghi chú khác.
- Widget nổi (Floating Widget) cho phép truy cập nhanh từ mọi trang.
- Hỗ trợ phân trang, tìm kiếm và phân loại (Vocabulary, Formula, Other).

### 3.3. Practice (Quiz & Scramble)
- **Quiz:** Hệ thống câu hỏi trắc nghiệm.
- **Scramble:** Trò chơi sắp xếp từ/câu.

### 3.4. AI Assistant (Mine)
- Trợ lý ảo tích hợp ngay trên màn hình (Floating).
- Hỗ trợ giải đáp thắc mắc về ngữ pháp, từ vựng theo ngữ cảnh bài học.
- Giao diện chat thân thiện, hỗ trợ Markdown và Emoji.

## 4. Project Structure
- `src/app/`: File-system routing và layout.
- `src/components/`: Reusable UI components.
- `src/contexts/`: Global state providers.
- `src/services/`: API call logic.
- `src/hooks/`: Custom React hooks.
- `src/lib/`: Shared utilities (axios instance, etc.)

## 5. Security & Best Practices
- **Strict Typing:** Không sử dụng `any`.
- **Server Components:** Sử dụng Server Components cho các trang tĩnh/SEO.
- **Client Components:** Sử dụng `'use client'` cho các tương tác phức tạp và hooks.
