'use client';

import { useAuth } from '@/contexts/AuthContext';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

// Danh sách các đường dẫn không yêu cầu đăng nhập
const PUBLIC_PATHS = ['/', '/auth/login', '/auth/callback'];

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated && !PUBLIC_PATHS.includes(pathname || '')) {
      router.push('/');
    }
  }, [isAuthenticated, isLoading, pathname, router]);

  // Hiển thị màn hình loading khi đang kiểm tra token
  if (isLoading && !PUBLIC_PATHS.includes(pathname || '')) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <p className="text-gray-600 font-medium font-inter">Đang xác thực...</p>
        </div>
      </div>
    );
  }

  // Nếu đã đăng nhập hoặc đang ở trang public, cho phép hiển thị nội dung
  return <>{children}</>;
}
