'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { authService } from '@/services/authService';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { toast } from 'sonner';

function CallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { reloadAuth } = useAuth();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Đang xử lý đăng nhập...');

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Lấy token từ URL query params hoặc hash
        // Backend có thể redirect với token trong query params hoặc hash
        const tokenFromQuery = searchParams.get('token');
        const tokenFromHash = typeof window !== 'undefined' 
          ? new URLSearchParams(window.location.hash.substring(1)).get('token')
          : null;
        
        const token = tokenFromQuery || tokenFromHash;

        if (!token) {
          throw new Error('Token không tìm thấy trong URL');
        }

        // Xử lý callback với token
        const authResponse = await authService.handleCallback(token);
        const user = authResponse.user;
        
        // Reload AuthContext để cập nhật state
        await reloadAuth();
        
        setStatus('success');
        setMessage('Đăng nhập thành công!');

        // Kiểm tra audience và language để redirect phù hợp
        setTimeout(() => {
          if (!user.audience) {
            // Nếu user chưa có audience, chuyển đến màn hình chọn audience
            router.push('/?step=audience');
          } else if (!user.language) {
            // Nếu user đã có audience nhưng chưa có language, chuyển đến màn hình chọn ngôn ngữ
            router.push('/?step=language');
          } else {
            // Nếu user đã có cả audience và language, chuyển đến màn hình chọn mode (step 3)
            router.push('/');
          }
        }, 500);
      } catch (error) {
        console.error('Callback error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Đăng nhập thất bại. Vui lòng thử lại.';
        setStatus('error');
        setMessage(errorMessage);
        toast.error('Đăng nhập thất bại');

        // Redirect về trang login sau 3 giây
        setTimeout(() => {
          router.push('/auth/login');
        }, 3000);
      }
    };

    handleCallback();
  }, [searchParams, router, reloadAuth]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4">
        <div className="flex flex-col items-center justify-center space-y-4">
          {status === 'loading' && (
            <>
              <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
              <p className="text-gray-600 text-center">{message}</p>
            </>
          )}

          {status === 'success' && (
            <>
              <CheckCircle2 className="w-12 h-12 text-green-600" />
              <p className="text-gray-700 text-center font-medium">{message}</p>
              <p className="text-sm text-gray-500 text-center">
                Đang chuyển hướng...
              </p>
            </>
          )}

          {status === 'error' && (
            <>
              <XCircle className="w-12 h-12 text-red-600" />
              <p className="text-gray-700 text-center font-medium">{message}</p>
              <p className="text-sm text-gray-500 text-center">
                Đang chuyển về trang đăng nhập...
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CallbackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4">
          <div className="flex flex-col items-center justify-center space-y-4">
            <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
            <p className="text-gray-600 text-center">Đang tải...</p>
          </div>
        </div>
      </div>
    }>
      <CallbackContent />
    </Suspense>
  );
}
