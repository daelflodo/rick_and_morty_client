import axios, { type AxiosInstance } from 'axios';
import type {
  AuthTokenResponse,
  Character,
  CharacterFilters,
  CustomCharacter,
  CustomCharacterCreate,
  FavoriteCharacter,
  RegisterData,
  UserCredentials,
} from '../types';

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000';

const apiClient: AxiosInstance = axios.create({ baseURL: BASE_URL });

apiClient.interceptors.request.use((config) => {
  const stored = localStorage.getItem('auth-storage');
  if (stored) {
    const parsed = JSON.parse(stored) as { state?: { token?: string } };
    const token = parsed.state?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (
      axios.isAxiosError(error) &&
      error.response?.status === 401 &&
      window.location.pathname !== '/'
    ) {
      localStorage.removeItem('auth-storage');
      window.location.href = '/';
    }
    return Promise.reject(error);
  },
);

export const authApi = {
  register: async (data: RegisterData): Promise<AuthTokenResponse> => {
    const res = await apiClient.post<AuthTokenResponse>('/api/auth/register', data);
    return res.data;
  },
  login: async (data: UserCredentials): Promise<AuthTokenResponse> => {
    const res = await apiClient.post<AuthTokenResponse>('/api/auth/login', data);
    return res.data;
  },
};

export const charactersApi = {
  getById: async (id: number): Promise<Character> => {
    const res = await apiClient.get<Character>(`/api/characters/${id}`);
    return res.data;
  },
  search: async (filters: Partial<CharacterFilters>): Promise<Character[]> => {
    const params: Record<string, string> = {};
    if (filters.name) params.name = filters.name;
    if (filters.status) params.status = filters.status;
    if (filters.species) params.species = filters.species;
    if (filters.gender) params.gender = filters.gender;
    if (filters.sort) params.sort = filters.sort;
    const res = await apiClient.get<Character[]>('/api/characters/search', { params });
    return res.data;
  },
  getRandom: async (count = 10): Promise<Character[]> => {
    const res = await apiClient.get<Character[]>('/api/characters/random', { params: { count } });
    return res.data;
  },
};

export const favoritesApi = {
  getAll: async (): Promise<FavoriteCharacter[]> => {
    const res = await apiClient.get<FavoriteCharacter[]>('/api/favorites');
    return res.data;
  },
  add: async (characterId: number): Promise<FavoriteCharacter> => {
    const res = await apiClient.post<FavoriteCharacter>('/api/favorites', { character_id: characterId });
    return res.data;
  },
  remove: async (characterId: number): Promise<void> => {
    await apiClient.delete(`/api/favorites/${characterId}`);
  },
};

export const customCharactersApi = {
  getAll: async (filters?: Partial<CharacterFilters>): Promise<CustomCharacter[]> => {
    const params: Record<string, string> = {};
    if (filters?.name) params.name = filters.name;
    if (filters?.status) params.status = filters.status;
    if (filters?.species) params.species = filters.species;
    if (filters?.gender) params.gender = filters.gender;
    if (filters?.sort) params.sort = filters.sort;
    const res = await apiClient.get<CustomCharacter[]>('/api/custom-characters', { params });
    return res.data;
  },
  create: async (data: CustomCharacterCreate): Promise<CustomCharacter> => {
    const res = await apiClient.post<CustomCharacter>('/api/custom-characters', data);
    return res.data;
  },
  update: async (id: number, data: Partial<CustomCharacterCreate>): Promise<CustomCharacter> => {
    const res = await apiClient.put<CustomCharacter>(`/api/custom-characters/${id}`, data);
    return res.data;
  },
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/api/custom-characters/${id}`);
  },
};
