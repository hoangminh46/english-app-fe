# Knowledge Item: Tech Stack Upgrade (Next.js 16 & Tailwind CSS 4)

## Context
Vào tháng 1/2026, dự án đã nâng cấp lên các phiên bản mới nhất của Next.js và Tailwind CSS.

## Key Changes
- **Next.js 16:** Sử dụng App Router mặc định, tối ưu hóa Turbopack. Cần chú ý tính tương thích của các thư viện UI cũ.
- **Tailwind CSS 4:** 
  - Engine xử lý mới nhanh hơn.
  - Cấu hình chủ yếu qua CSS (CSS-first configuration) thay vì custom JS file hoàn toàn.
  - Sử dụng `@theme` block trong `globals.css` để định nghĩa variables.

## Best Practices
- Ưu tiên Server Components để tối ưu hiệu năng.
- Sử dụng `next-themes` kết hợp Tailwind 4 để quản lý Dark Mode.
- Kiểm tra kỹ các class conditional trong `clsx` do engine v4 có một số thay đổi nhỏ trong cách gộp CSS.
