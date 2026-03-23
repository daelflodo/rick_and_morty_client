export interface CharacterOrigin {
  name: string;
  url: string;
}

export type CharacterStatus = 'Alive' | 'Dead' | 'unknown';
export type CharacterGender = 'Female' | 'Male' | 'Genderless' | 'unknown';

export interface Character {
  id: number;
  name: string;
  status: CharacterStatus;
  species: string;
  gender: CharacterGender;
  origin: CharacterOrigin;
  image: string;
}

export interface FavoriteCharacter {
  id: number;
  character_id: number;
  character_name: string;
  character_status: string;
  character_species: string;
  character_gender: string;
  character_origin: string;
  character_image: string;
}

export interface CustomCharacter {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  origin: string;
  image: string;
}

export interface CustomCharacterCreate {
  name: string;
  status: string;
  species: string;
  gender: string;
  origin: string;
  image: string;
}

export interface CharacterFilters {
  name: string;
  status: string;
  species: string;
  gender: string;
  sort: 'asc' | 'desc' | '';
}

/** Normalized display type consumed by the Card component */
export interface CardDisplay {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  origin: string;
  image: string;
  isFavorite: boolean;
  isCustom: boolean;
}

// ---------- Auth ----------
export interface UserCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export interface UserInfo {
  id: number;
  username: string;
  email: string;
}

export interface AuthTokenResponse {
  access_token: string;
  token_type: string;
  user: UserInfo;
}

export interface ValidationErrors {
  username?: string;
  email?: string;
  password?: string;
}
