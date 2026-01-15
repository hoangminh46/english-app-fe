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
    <header className="sticky top-0 z-50 w-full border-b-4 border-b-border/40 bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Logo Mine */}
        <Link 
            href="/" 
            onClick={(e) => checkNavigation(e, '/')}
            className="text-3xl font-extrabold tracking-tight text-primary drop-shadow-sm hover:scale-105 transition-transform"
        >
          Mine
        </Link>

        {/* Right: User Avatar */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
             <span className="hidden sm:block text-sm font-bold text-muted-foreground bg-secondary/10 px-3 py-1 rounded-full">
                Xin chào, {user?.firstName || user?.name?.split(' ').pop()}!
             </span>
             <div
                onClick={handleAvatarClick}
                className="relative h-11 w-11 overflow-hidden rounded-full border-4 border-background ring-4 ring-secondary/20 shadow-lg cursor-pointer transition-transform hover:scale-110 active:scale-95"
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
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary to-green-400 text-white font-bold text-lg">
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
