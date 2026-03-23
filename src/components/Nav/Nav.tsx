import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { useCharacterStore } from '../../stores/characterStore';
import SearchBar from '../SearchBar/SearchBar';
import styles from './Nav.module.css';

export default function Nav() {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const loadRandom = useCharacterStore((state) => state.loadRandom);

  function handleLogout(): void {
    logout();
    navigate('/');
  }

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
            className={({ isActive }) => `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
          >
            About
          </NavLink>
        </div>
        <div className={styles.searchArea}>
          <SearchBar />
        </div>
        <button className={styles.randomBtn} onClick={() => void loadRandom()}>Random</button>
        <button className={styles.logoutBtn} onClick={handleLogout}>Log out</button>
      </div>
    </nav>
  );
}
