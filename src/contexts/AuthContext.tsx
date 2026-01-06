'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { authService } from '@/services/authService';
import { User, AuthState } from '@/types/auth';
import { toast } from 'sonner';

interface AuthContextType extends AuthState {
  login: () => void;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  reloadAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user từ localStorage khi component mount
  useEffect(() => {
    const initAuth = async () => {
      try {
        const storedToken = authService.getToken();
        const storedUser = authService.getUser();

        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(storedUser);
          
          // Verify token với backend
          try {
            const currentUser = await authService.getCurrentUser();
            setUser(currentUser);
            // Update localStorage với user mới nhất
            localStorage.setItem('auth_user', JSON.stringify(currentUser));
          } catch {
            // Token không hợp lệ, xóa và reset
            authService.logout();
            setToken(null);
            setUser(null);
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = useCallback(() => {
    authService.loginWithGoogle();
  }, []);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
      setUser(null);
      setToken(null);
      toast.success('Đăng xuất thành công');
    } catch (error) {
      console.error('Error logging out:', error);
      // Vẫn xóa state dù có lỗi
      setUser(null);
      setToken(null);
    }
  }, []);

  const refreshUser = useCallback(async () => {
    try {
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
      localStorage.setItem('auth_user', JSON.stringify(currentUser));
    } catch (error) {
      console.error('Error refreshing user:', error);
      toast.error('Không thể tải thông tin người dùng');
    }
  }, []);

  const reloadAuth = useCallback(async () => {
    try {
      setIsLoading(true);
      const storedToken = authService.getToken();
      const storedUser = authService.getUser();

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(storedUser);
        
        // Verify token với backend
        try {
          const currentUser = await authService.getCurrentUser();
          setUser(currentUser);
          localStorage.setItem('auth_user', JSON.stringify(currentUser));
        } catch {
          // Token không hợp lệ, xóa và reset
          await authService.logout();
          setToken(null);
          setUser(null);
        }
      } else {
        setToken(null);
        setUser(null);
      }
    } catch (error) {
      console.error('Error reloading auth:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!token && !!user,
    isLoading,
    login,
    logout,
    refreshUser,
    reloadAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

