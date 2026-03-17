import SearchBar from './SearchBar.jsx';
import styles from './Nav.module.css';

export default function Nav(props) {
  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <div className={styles.portalRing} />
          <div className={styles.brandText}>
            <span className={styles.brandMain}>Rick &amp; Morty</span>
            <span className={styles.brandSub}>Universe</span>
          </div>
        </div>

        <div className={styles.searchArea}>
          <SearchBar onSearch={props.onSearch} />
        </div>
      </div>
    </nav>
  );
}
