import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authApi } from '../services/api';
import type { RegisterData, UserCredentials, UserInfo } from '../types';

interface AuthState {
  token: string | null;
  user: UserInfo | null;
  isAuthenticated: boolean;
  login: (credentials: UserCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      login: async (credentials: UserCredentials): Promise<void> => {
        const data = await authApi.login(credentials);
        set({ token: data.access_token, user: data.user, isAuthenticated: true });
      },
      register: async (registerData: RegisterData): Promise<void> => {
        const data = await authApi.register(registerData);
        set({ token: data.access_token, user: data.user, isAuthenticated: true });
      },
      logout: (): void => {
        set({ token: null, user: null, isAuthenticated: false });
      },
    }),
    { name: 'auth-storage' },
  ),
);
