import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  characterToDisplay,
  customToDisplay,
  favoriteToDisplay,
  useCharacterStore,
} from '../../stores/characterStore';
import { useAuthStore } from '../../stores/authStore';
import type { CustomCharacterCreate } from '../../types';
import Card from '../Card/Card';
import styles from './Cards.module.css';

const STATUS_OPTIONS = ['', 'Alive', 'Dead', 'unknown'];
const GENDER_OPTIONS = ['', 'Female', 'Male', 'Genderless', 'unknown'];

const EMPTY_FORM: CustomCharacterCreate = {
  name: '',
  status: 'Alive',
  species: '',
  gender: 'Female',
  origin: '',
  image: '',
};

export default function Cards() {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const {
    exploreCharacters,
    favorites,
    customCharacters,
    activeTab,
    filters,
    isLoading,
    error,
    showCreateForm,
    editingCharacter,
    favoriteIds,
    setActiveTab,
    setFilters,
    resetFilters,
    loadRandom,
    searchExplore,
    loadFavorites,
    addFavorite,
    removeFavorite,
    loadCustomCharacters,
    createCustomCharacter,
    updateCustomCharacter,
    deleteCustomCharacter,
    setShowCreateForm,
    setEditingCharacter,
    clearError,
  } = useCharacterStore();

  const [formData, setFormData] = useState<CustomCharacterCreate>(EMPTY_FORM);

  useEffect(() => {
    if (isAuthenticated) void loadFavorites();
    void loadRandom();
  }, [loadFavorites, loadRandom, isAuthenticated]);

  useEffect(() => {
    if (activeTab === 'custom') void loadCustomCharacters();
  }, [activeTab, loadCustomCharacters]);

  useEffect(() => {
    if (editingCharacter) {
      setFormData({
        name: editingCharacter.name,
        status: editingCharacter.status,
        species: editingCharacter.species,
        gender: editingCharacter.gender,
        origin: editingCharacter.origin,
        image: editingCharacter.image,
      });
    } else {
      setFormData(EMPTY_FORM);
    }
  }, [editingCharacter]);

  function handleFormChange(field: keyof CustomCharacterCreate, value: string): void {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function handleFormSubmit(e: React.FormEvent): void {
    e.preventDefault();
    if (editingCharacter) {
      void updateCustomCharacter(editingCharacter.id, formData);
    } else {
      void createCustomCharacter(formData);
    }
  }

  function handleFavoriteToggle(id: number, isFavorite: boolean): void {
    if (!isAuthenticated) { navigate('/login'); return; }
    if (isFavorite) void removeFavorite(id);
    else void addFavorite(id);
  }

  function handleFilterSearch(): void {
    if (activeTab === 'explore') void searchExplore(filters);
    else void loadCustomCharacters(filters);
  }

  function closeForm(): void {
    setShowCreateForm(false);
    setEditingCharacter(null);
  }

  const favIds = favoriteIds();
  const exploreCards = exploreCharacters.map((c) => characterToDisplay(c, favIds));
  const favoriteCards = favorites.map(favoriteToDisplay);
  const customCards = customCharacters.map(customToDisplay);
  const isFormOpen = showCreateForm || !!editingCharacter;

  return (
    <main className={styles.container}>
      <header>
        <p className={styles.heading}>Rick and Morty Universe</p>
        <h1 className={styles.title}>Characters</h1>
        <p className={styles.subtitle}>Explore every character across the multiverse</p>
      </header>

      {/* Tabs */}
      <div className={styles.tabs}>
        {(['explore', 'favorites', 'custom'] as const).map((tab) => (
          <button
            key={tab}
            className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'explore'
              ? 'Explore'
              : tab === 'favorites'
                ? `Favorites (${favorites.length})`
                : 'My Characters'}
          </button>
        ))}
      </div>

      {/* Filters bar */}
      {(activeTab === 'explore' || activeTab === 'custom') && (
        <div className={styles.filterBar}>
          <input
            className={styles.filterInput}
            type="text"
            placeholder="Name..."
            value={filters.name}
            onChange={(e) => setFilters({ name: e.target.value })}
          />
          <select
            className={styles.filterSelect}
            value={filters.status}
            onChange={(e) => setFilters({ status: e.target.value })}
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>{s || 'All Status'}</option>
            ))}
          </select>
          <input
            className={styles.filterInput}
            type="text"
            placeholder="Species..."
            value={filters.species}
            onChange={(e) => setFilters({ species: e.target.value })}
          />
          <select
            className={styles.filterSelect}
            value={filters.gender}
            onChange={(e) => setFilters({ gender: e.target.value })}
          >
            {GENDER_OPTIONS.map((g) => (
              <option key={g} value={g}>{g || 'All Gender'}</option>
            ))}
          </select>
          <select
            className={styles.filterSelect}
            value={filters.sort}
            onChange={(e) => setFilters({ sort: e.target.value as '' | 'asc' | 'desc' })}
          >
            <option value="">Default order</option>
            <option value="asc">A → Z</option>
            <option value="desc">Z → A</option>
          </select>
          <button className={styles.filterBtn} onClick={handleFilterSearch}>Search</button>
          <button className={styles.filterBtnSecondary} onClick={resetFilters}>Clear</button>
        </div>
      )}

      {/* My Characters header with create button */}
      {activeTab === 'custom' && isAuthenticated && (
        <div className={styles.createRow}>
          <button className={styles.createBtn} onClick={() => setShowCreateForm(true)}>
            + New Character
          </button>
        </div>
      )}

      {/* Status messages */}
      {isLoading && <p className={styles.statusMsg}>Loading...</p>}
      {error && (
        <p className={styles.errorMsg} onClick={clearError}>
          {error} &mdash; click to close
        </p>
      )}

      {/* Grids */}
      {activeTab === 'explore' && (
        <ul className={styles.grid}>
          {exploreCards.map((card) => (
            <li key={card.id}>
              <Card card={card} onFavoriteToggle={handleFavoriteToggle} />
            </li>
          ))}
        </ul>
      )}

      {activeTab === 'favorites' && (
        isAuthenticated ? (
          <ul className={styles.grid}>
            {favoriteCards.map((card) => (
              <li key={card.id}>
                <Card card={card} onFavoriteToggle={handleFavoriteToggle} />
              </li>
            ))}
          </ul>
        ) : (
          <div className={styles.authMsg}>
            <p>❤️ Iniciá sesión para ver tus favoritos</p>
            <button className={styles.authBtn} onClick={() => navigate('/login')}>
              Ir al Login
            </button>
          </div>
        )
      )}

      {activeTab === 'custom' && (
        isAuthenticated ? (
          <ul className={styles.grid}>
            {customCards.map((card) => {
              const original = customCharacters.find((c) => c.id === card.id)!;
              return (
                <li key={card.id}>
                  <Card
                    card={card}
                    onEdit={() => setEditingCharacter(original)}
                    onDelete={(id) => void deleteCustomCharacter(id)}
                  />
                </li>
              );
            })}
          </ul>
        ) : (
          <div className={styles.authMsg}>
            <p>✏️ Iniciá sesión para crear y gestionar tus personajes</p>
            <button className={styles.authBtn} onClick={() => navigate('/login')}>
              Ir al Login
            </button>
          </div>
        )
      )}

      {/* Create / Edit modal */}
      {isFormOpen && (
        <div className={styles.modalOverlay} onClick={closeForm}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2 className={styles.modalTitle}>
              {editingCharacter ? 'Edit Character' : 'New Character'}
            </h2>
            <form className={styles.form} onSubmit={handleFormSubmit}>
              <input
                className={styles.formInput}
                type="text"
                placeholder="Name *"
                value={formData.name}
                onChange={(e) => handleFormChange('name', e.target.value)}
                required
              />
              <select
                className={styles.formSelect}
                value={formData.status}
                onChange={(e) => handleFormChange('status', e.target.value)}
              >
                <option value="Alive">Alive</option>
                <option value="Dead">Dead</option>
                <option value="unknown">Unknown</option>
              </select>
              <input
                className={styles.formInput}
                type="text"
                placeholder="Species *"
                value={formData.species}
                onChange={(e) => handleFormChange('species', e.target.value)}
                required
              />
              <select
                className={styles.formSelect}
                value={formData.gender}
                onChange={(e) => handleFormChange('gender', e.target.value)}
              >
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Genderless">Genderless</option>
                <option value="unknown">Unknown</option>
              </select>
              <input
                className={styles.formInput}
                type="text"
                placeholder="Origin *"
                value={formData.origin}
                onChange={(e) => handleFormChange('origin', e.target.value)}
                required
              />
              <input
                className={styles.formInput}
                type="url"
                placeholder="Image URL *"
                value={formData.image}
                onChange={(e) => handleFormChange('image', e.target.value)}
                required
              />
              <div className={styles.formActions}>
                <button type="submit" className={styles.submitBtn}>
                  {editingCharacter ? 'Save Changes' : 'Create'}
                </button>
                <button type="button" className={styles.cancelBtn} onClick={closeForm}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
