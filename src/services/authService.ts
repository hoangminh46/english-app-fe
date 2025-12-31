import apiClient from '@/lib/axios';
import { AuthResponse, User } from '@/types/auth';

const AUTH_TOKEN_KEY = 'auth_token';
const AUTH_USER_KEY = 'auth_user';

export const authService = {
  /**
   * Bắt đầu quá trình đăng nhập Google OAuth
   * Redirect user đến Google OAuth endpoint
   */
  loginWithGoogle: () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    window.location.href = `${apiUrl}/api/auth/google`;
  },

  /**
   * Xử lý callback từ Google OAuth
   * Backend sẽ redirect về frontend với token trong URL hoặc query params
   */
  handleCallback: async (token: string): Promise<AuthResponse> => {
    try {
      // Lưu token vào localStorage
      localStorage.setItem(AUTH_TOKEN_KEY, token);

      // Lấy thông tin user từ backend
      const response = await apiClient.get<{ success: boolean; data: User }>('/api/auth/me');
      const user = response.data.data;

      // Lưu user vào localStorage
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));

      return {
        token,
        user,
      };
    } catch (error) {
      // Nếu có lỗi, xóa token đã lưu
      localStorage.removeItem(AUTH_TOKEN_KEY);
      throw error;
    }
  },

  /**
   * Lấy thông tin user hiện tại từ backend
   */
  getCurrentUser: async (): Promise<User> => {
    const response = await apiClient.get<{ success: boolean; data: User }>('/api/auth/me');
    return response.data.data;
  },

  /**
   * Cập nhật audience của user
   */
  updateAudience: async (audience: string): Promise<User> => {
    // Gọi API PUT /api/auth/audience để cập nhật audience
    const response = await apiClient.put<{ success: boolean; data: User }>('/api/auth/audience', { audience });
    const updatedUser = response.data.data;
    
    // Update localStorage với user mới từ response
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(updatedUser));
    return updatedUser;
  },

  /**
   * Đăng xuất
   */
  logout: () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
    // Redirect về trang login
    if (typeof window !== 'undefined') {
      window.location.href = '/auth/login';
    }
  },

  /**
   * Lấy token từ localStorage
   */
  getToken: (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(AUTH_TOKEN_KEY);
  },

  /**
   * Lấy user từ localStorage
   */
  getUser: (): User | null => {
    if (typeof window === 'undefined') return null;
    const userStr = localStorage.getItem(AUTH_USER_KEY);
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },

  /**
   * Kiểm tra xem user đã đăng nhập chưa
   */
  isAuthenticated: (): boolean => {
    return !!authService.getToken();
  },
};

