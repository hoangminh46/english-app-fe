'use client';

import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export const Header = () => {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [imageError, setImageError] = useState(false);
  const isVisible = isAuthenticated && !pathname?.startsWith('/auth');

  // Quản lý chiều cao header cho thuộc tính CSS min-h-screen toàn cục
  useEffect(() => {
    if (isVisible) {
      document.documentElement.style.setProperty('--header-height', '64px');
    } else {
      document.documentElement.style.setProperty('--header-height', '0px');
    }

    return () => {
      document.documentElement.style.setProperty('--header-height', '0px');
    };
  }, [isVisible]);

  // Ẩn header trên các trang auth (login, callback)
  if (!isVisible) return null;

  const checkNavigation = (e: React.MouseEvent, targetPath: string) => {
    if (pathname === '/quiz') {
      e.preventDefault();
      const event = new CustomEvent('request-navigation', { 
        detail: { targetPath } 
      });
      window.dispatchEvent(event);
    }
  };

  const handleAvatarClick = (e: React.MouseEvent) => {
    if (pathname === '/quiz') {
      checkNavigation(e, '/profile');
    } else {
      router.push('/profile');
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Logo Mine */}
        <Link 
            href="/" 
            onClick={(e) => checkNavigation(e, '/')}
            className="text-2xl font-bold tracking-tighter bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
        >
          Mine
        </Link>

        {/* Right: User Avatar */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
             <span className="text-sm font-medium text-gray-700">
                Xin chào, {user?.firstName || user?.name?.split(' ').pop()}!
             </span>
             <div
                onClick={handleAvatarClick}
                className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-white ring-2 ring-blue-50 shadow-md cursor-pointer transition-transform hover:scale-110 active:scale-95"
              >
                {user?.picture && !imageError ? (
                    <img
                        src={user.picture}
                        alt={user.name || 'User avatar'}
                        className="h-full w-full object-cover"
                        onError={() => setImageError(true)}
                        referrerPolicy="no-referrer"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-semibold">
                        {user?.name?.charAt(0).toUpperCase() || user?.firstName?.charAt(0).toUpperCase() || 'U'}
                    </div>
                )}
             </div>
          </div>
        </div>
      </div>
    </header>
  );
};
