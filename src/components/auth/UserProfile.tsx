'use client';

import { useAuth } from '@/contexts/AuthContext';
import { LogOut, User } from 'lucide-react';
import { motion } from 'framer-motion';

export const UserProfile = () => {
  const { user, logout, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-4 right-4 z-50 flex items-center gap-3 bg-white rounded-lg shadow-lg px-4 py-2 border border-gray-200"
    >
      {/* User Avatar */}
      <div className="flex items-center gap-2">
        {user.picture ? (
          <img
            src={user.picture}
            alt={user.name}
            className="w-8 h-8 rounded-full"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
        )}
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-900">{user.name}</span>
          <span className="text-xs text-gray-500">{user.email}</span>
        </div>
      </div>

      {/* Logout Button */}
      <button
        onClick={logout}
        className="ml-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
        title="Đăng xuất"
      >
        <LogOut className="w-4 h-4 text-gray-600" />
      </button>
    </motion.div>
  );
};

