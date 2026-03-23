import { create } from 'zustand';
import { charactersApi, customCharactersApi, favoritesApi } from '../services/api';
import type {
  CardDisplay,
  Character,
  CharacterFilters,
  CustomCharacter,
  CustomCharacterCreate,
  FavoriteCharacter,
} from '../types';

export type ActiveTab = 'explore' | 'favorites' | 'custom';

const EMPTY_FILTERS: CharacterFilters = {
  name: '',
  status: '',
  species: '',
  gender: '',
  sort: '',
};

// --- Normalizers ---
export function characterToDisplay(c: Character, favoriteIds: Set<number>): CardDisplay {
  return {
    id: c.id,
    name: c.name,
    status: c.status,
    species: c.species,
    gender: c.gender,
    origin: c.origin.name,
    image: c.image,
    isFavorite: favoriteIds.has(c.id),
    isCustom: false,
  };
}

export function favoriteToDisplay(f: FavoriteCharacter): CardDisplay {
  return {
    id: f.character_id,
    name: f.character_name,
    status: f.character_status,
    species: f.character_species,
    gender: f.character_gender,
    origin: f.character_origin,
    image: f.character_image,
    isFavorite: true,
    isCustom: false,
  };
}

export function customToDisplay(c: CustomCharacter): CardDisplay {
  return {
    id: c.id,
    name: c.name,
    status: c.status,
    species: c.species,
    gender: c.gender,
    origin: c.origin,
    image: c.image,
    isFavorite: false,
    isCustom: true,
  };
}

interface CharacterState {
  exploreCharacters: Character[];
  favorites: FavoriteCharacter[];
  customCharacters: CustomCharacter[];
  activeTab: ActiveTab;
  filters: CharacterFilters;
  isLoading: boolean;
  error: string | null;
  showCreateForm: boolean;
  editingCharacter: CustomCharacter | null;

  favoriteIds: () => Set<number>;

  setActiveTab: (tab: ActiveTab) => void;
  setFilters: (filters: Partial<CharacterFilters>) => void;
  resetFilters: () => void;

  loadRandom: () => Promise<void>;
  searchExplore: (filters: Partial<CharacterFilters>) => Promise<void>;

  loadFavorites: () => Promise<void>;
  addFavorite: (characterId: number) => Promise<void>;
  removeFavorite: (characterId: number) => Promise<void>;

  loadCustomCharacters: (filters?: Partial<CharacterFilters>) => Promise<void>;
  createCustomCharacter: (data: CustomCharacterCreate) => Promise<void>;
  updateCustomCharacter: (id: number, data: Partial<CustomCharacterCreate>) => Promise<void>;
  deleteCustomCharacter: (id: number) => Promise<void>;

  setShowCreateForm: (show: boolean) => void;
  setEditingCharacter: (char: CustomCharacter | null) => void;
  clearError: () => void;
}

export const useCharacterStore = create<CharacterState>()((set, get) => ({
  exploreCharacters: [],
  favorites: [],
  customCharacters: [],
  activeTab: 'explore',
  filters: EMPTY_FILTERS,
  isLoading: false,
  error: null,
  showCreateForm: false,
  editingCharacter: null,

  favoriteIds: () => new Set(get().favorites.map((f) => f.character_id)),

  setActiveTab: (tab) => { set({ activeTab: tab }); },
  setFilters: (updated) => { set((s) => ({ filters: { ...s.filters, ...updated } })); },
  resetFilters: () => { set({ filters: EMPTY_FILTERS }); },
  clearError: () => { set({ error: null }); },
  setShowCreateForm: (show) => { set({ showCreateForm: show, editingCharacter: null }); },
  setEditingCharacter: (char) => { set({ editingCharacter: char, showCreateForm: false }); },

  // ---- Explore ----
  loadRandom: async () => {
    set({ isLoading: true, error: null, activeTab: 'explore' });
    try {
      const data = await charactersApi.getRandom(10);
      set({ exploreCharacters: data });
    } catch {
      set({ error: 'Error al cargar personajes aleatorios.' });
    } finally {
      set({ isLoading: false });
    }
  },

  searchExplore: async (filters) => {
    set({ isLoading: true, error: null, activeTab: 'explore' });
    try {
      const data = await charactersApi.search(filters);
      set({ exploreCharacters: data });
    } catch {
      set({ error: 'No se encontraron personajes.' });
    } finally {
      set({ isLoading: false });
    }
  },

  // ---- Favorites ----
  loadFavorites: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await favoritesApi.getAll();
      set({ favorites: data });
    } catch {
      set({ error: 'Error al cargar favoritos.' });
    } finally {
      set({ isLoading: false });
    }
  },

  addFavorite: async (characterId) => {
    set({ isLoading: true, error: null });
    try {
      const saved = await favoritesApi.add(characterId);
      set((s) => ({ favorites: [...s.favorites, saved] }));
    } catch {
      set({ error: 'Error al agregar a favoritos.' });
    } finally {
      set({ isLoading: false });
    }
  },

  removeFavorite: async (characterId) => {
    try {
      await favoritesApi.remove(characterId);
      set((s) => ({
        favorites: s.favorites.filter((f) => f.character_id !== characterId),
      }));
    } catch {
      set({ error: 'Error al eliminar favorito.' });
    }
  },

  // ---- Custom Characters ----
  loadCustomCharacters: async (filters) => {
    set({ isLoading: true, error: null });
    try {
      const data = await customCharactersApi.getAll(filters);
      set({ customCharacters: data });
    } catch {
      set({ error: 'Error al cargar personajes personalizados.' });
    } finally {
      set({ isLoading: false });
    }
  },

  createCustomCharacter: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const created = await customCharactersApi.create(data);
      set((s) => ({ customCharacters: [...s.customCharacters, created], showCreateForm: false }));
    } catch {
      set({ error: 'Error al crear personaje.' });
    } finally {
      set({ isLoading: false });
    }
  },

  updateCustomCharacter: async (id, data) => {
    set({ isLoading: true, error: null });
    try {
      const updated = await customCharactersApi.update(id, data);
      set((s) => ({
        customCharacters: s.customCharacters.map((c) => (c.id === id ? updated : c)),
        editingCharacter: null,
      }));
    } catch {
      set({ error: 'Error al actualizar personaje.' });
    } finally {
      set({ isLoading: false });
    }
  },

  deleteCustomCharacter: async (id) => {
    try {
      await customCharactersApi.delete(id);
      set((s) => ({ customCharacters: s.customCharacters.filter((c) => c.id !== id) }));
    } catch {
      set({ error: 'Error al eliminar personaje.' });
    }
  },
}));
