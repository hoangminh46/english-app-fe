'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { languages } from '@/types/quiz';
import { authService } from '@/services/authService';
import { toast } from 'sonner';
import { LogOut, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const languageInfo: {
  [key: string]: {
    imagePath: string;
    code: string;
    description: string;
    isSupported: boolean;
  }
} = {
  "english": {
    imagePath: "/images/england.png",
    code: "GB",
    description: "Ngôn ngữ được sử dụng nhiều nhất",
    isSupported: true
  },
  "japanese": {
    imagePath: "/images/japan.png",
    code: "JP",
    description: "Đang phát triển",
    isSupported: false
  },
  "chinese": {
    imagePath: "/images/china.png",
    code: "CN",
    description: "Đang phát triển",
    isSupported: false
  }
};

export default function ProfilePage() {
  const router = useRouter();
  const [imageError, setImageError] = useState(false);
  const { user, logout, refreshUser, isAuthenticated, isLoading } = useAuth();
  const [isChangingLanguage, setIsChangingLanguage] = useState(false);
  const [showLanguageSelect, setShowLanguageSelect] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const languageSelectRef = useRef<HTMLDivElement>(null);

  // Đóng dropdown khi click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (languageSelectRef.current && !languageSelectRef.current.contains(event.target as Node)) {
        setShowLanguageSelect(false);
      }
    };

    if (showLanguageSelect) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showLanguageSelect]);

  useEffect(() => {
    setImageError(false);
  }, [user?.picture]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated && !isLoggingOut) {
      router.push('/');
    }
  }, [isLoading, isAuthenticated, isLoggingOut, router]);

  if (!isLoading && !isAuthenticated) {
    return null;
  }

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  const handleLanguageChange = async (language: string) => {
    if (language === user.language) {
      setShowLanguageSelect(false);
      return;
    }

    setIsChangingLanguage(true);
    try {
      await authService.updateLanguage(language);
      await refreshUser();
      toast.success('Đã cập nhật ngôn ngữ');
      setShowLanguageSelect(false);
    } catch (error) {
      console.error('Error updating language:', error);
      toast.error('Không thể cập nhật ngôn ngữ. Vui lòng thử lại.');
    } finally {
      setIsChangingLanguage(false);
    }
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      // Redirect về trang chủ sau khi logout thành công
      router.push('/');
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('Đăng xuất thất bại');
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8"
        >
          {/* Avatar và Full Name */}
          <div className="flex flex-col items-center space-y-3 sm:space-y-4">
            <div className="relative h-24 w-24 sm:h-32 sm:w-32 overflow-hidden rounded-full border-3 sm:border-4 border-white ring-3 sm:ring-4 ring-blue-100 shadow-lg">
              {user.picture && !imageError ? (
                <img
                  src={user.picture}
                  alt={user.name || 'User avatar'}
                  className="h-full w-full object-cover"
                  onError={() => setImageError(true)}
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-2xl sm:text-4xl font-bold">
                  {user.name?.charAt(0).toUpperCase() || user.firstName?.charAt(0).toUpperCase() || 'U'}
                </div>
              )}
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 text-center px-2">{user.name}</h1>
            {user.email && (
              <p className="text-sm sm:text-base text-gray-600 text-center px-2 break-all">{user.email}</p>
            )}
          </div>

          {/* Actions */}
          <div className="space-y-3 sm:space-y-4">
            {/* Button Đổi Ngôn Ngữ */}
            <div className="relative" ref={languageSelectRef}>
              <button
                onClick={() => setShowLanguageSelect(!showLanguageSelect)}
                disabled={isChangingLanguage}
                className="w-full flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 bg-blue-50 border-2 border-blue-200 rounded-lg sm:rounded-xl hover:border-blue-300 hover:bg-blue-100 active:bg-blue-100 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                  <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
                  <span className="text-base sm:text-lg font-medium text-gray-900 truncate">
                    Đổi ngôn ngữ
                  </span>
                </div>
                {user.language && (
                  <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0 ml-2">
                    <div className="relative w-5 h-5 sm:w-6 sm:h-6">
                      <Image
                        src={languageInfo[user.language]?.imagePath || '/images/england.png'}
                        alt={languages.find(l => l.value === user.language)?.label || 'English'}
                        fill
                        className="object-cover rounded-full"
                      />
                    </div>
                    <span className="text-xs sm:text-sm text-gray-600 hidden sm:inline">
                      {languages.find(l => l.value === user.language)?.label || 'Tiếng Anh'}
                    </span>
                  </div>
                )}
              </button>

              {/* Language Select Dropdown */}
              <AnimatePresence>
                {showLanguageSelect && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl shadow-lg z-10 overflow-hidden max-h-[80vh] overflow-y-auto"
                  >
                    {languages.map((language) => {
                      const info = languageInfo[language.value];
                      const isSelected = user.language === language.value;
                      const isDisabled = !info.isSupported;

                      return (
                        <button
                          key={language.value}
                          onClick={() => !isDisabled && handleLanguageChange(language.value)}
                          disabled={isDisabled || isChangingLanguage}
                          className={`w-full flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 transition-all duration-200 active:bg-gray-50 ${
                            isSelected
                              ? 'bg-blue-50 border-l-4 border-blue-500'
                              : isDisabled
                              ? 'opacity-50 cursor-not-allowed'
                              : 'hover:bg-gray-50'
                          }`}
                        >
                          <div className="relative w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0">
                            <Image
                              src={info.imagePath}
                              alt={language.label}
                              fill
                              className="object-cover rounded-full"
                            />
                          </div>
                          <div className="flex-1 text-left min-w-0">
                            <div className={`text-sm sm:text-base font-medium ${isSelected ? 'text-blue-600' : 'text-gray-900'}`}>
                              {language.label}
                            </div>
                            <div className="text-xs text-gray-500 mt-0.5">{info.description}</div>
                          </div>
                          {isSelected && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                          )}
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Button Đăng Xuất */}
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="w-full flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 bg-red-50 border-2 border-red-200 rounded-lg sm:rounded-xl hover:bg-red-100 hover:border-red-300 active:bg-red-100 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <LogOut className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 flex-shrink-0" />
              <span className="text-base sm:text-lg font-medium text-red-600">
                {isLoggingOut ? 'Đang đăng xuất...' : 'Đăng xuất'}
              </span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
