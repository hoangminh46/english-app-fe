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
   * Cập nhật language của user
   */
  updateLanguage: async (language: string): Promise<User> => {
    // Gọi API PUT /api/auth/language để cập nhật language
    const response = await apiClient.put<{ success: boolean; data: User }>('/api/auth/language', { language });
    const updatedUser = response.data.data;
    
    // Update localStorage với user mới từ response
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(updatedUser));
    return updatedUser;
  },

  /**
   * Đăng xuất - gọi API logout và xóa tất cả data
   */
  logout: async () => {
    try {
      // Gọi API logout
      await apiClient.post('/api/auth/logout');
    } catch (error) {
      console.error('Error calling logout API:', error);
      // Tiếp tục xóa data dù API có lỗi
    }
    
    // Xóa tất cả data của user trong localStorage
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
    
    // Xóa tất cả các data khác liên quan đến user
    const keysToRemove = [
      'userPreferences',
      'progessState',
      'quizData',
      'scrambleData',
      'quizProgress',
      'scrambleProgress',
      'formData'
    ];
    
    keysToRemove.forEach(key => {
      localStorage.removeItem(key);
    });
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

