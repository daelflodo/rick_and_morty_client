import SearchBar from './SearchBar.jsx';
import { NavLink } from 'react-router-dom';
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

        <div className={styles.navLinks}>
          <NavLink
            to="/home"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
            }
          >
            About
          </NavLink>
        </div>

        <div className={styles.searchArea}>
          <SearchBar onSearch={props.onSearch} />
        </div>

        <button className={styles.randomBtn} onClick={props.onRandom}>
          Random
        </button>

        <button className={styles.logoutBtn} onClick={props.logout}>
          Log out
        </button>
      </div>
    </nav>
  );
}
