export interface User {
  id: string;
  email: string;
  name: string;
  picture?: string;
  googleId?: string;
  firstName?: string;
  lastName?: string;
  audience: string | null;
  language: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

