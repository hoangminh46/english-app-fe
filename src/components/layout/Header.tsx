'use client';

import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';

export const Header = () => {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [imageError, setImageError] = useState(false);

  // Ẩn header trên các trang auth (login, callback)
  if (pathname?.startsWith('/auth')) return null;
  
  if (!isAuthenticated) return null;

  const handleAvatarClick = () => {
    router.push('/profile');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Logo Mine */}
        <Link 
            href="/" 
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
             <button
                onClick={handleAvatarClick}
                className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-white ring-2 ring-gray-100 shadow-sm transition-transform hover:scale-105 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
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
             </button>
          </div>
        </div>
      </div>
    </header>
  );
};
