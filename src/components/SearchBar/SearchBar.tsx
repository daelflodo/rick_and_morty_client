import { useState } from 'react';
import { useCharacterStore } from '../../stores/characterStore';
import styles from './SearchBar.module.css';

export default function SearchBar() {
  const [query, setQuery] = useState<string>('');
  const searchExplore = useCharacterStore((state) => state.searchExplore);

  function handleSearch(): void {
    if (!query.trim()) return;
    void searchExplore({ name: query.trim() });
    setQuery('');
  }

  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>Find a character</label>
      <form className={styles.row} onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
        <span className={styles.icon} aria-hidden="true">Search</span>
        <input
          type="search"
          className={styles.input}
          value={query}
          placeholder="Name or ID..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className={styles.button}>
          Search
        </button>
      </form>
    </div>
  );
}
