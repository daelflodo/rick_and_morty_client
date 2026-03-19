import styles from './About.module.css';
import logo from '../assets/logo.jpg';
import avatar from '../assets/dael-avatar.png';

export default function About() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* <div className={styles.logoWrapper}>
          <img
            src={logo}
            alt="Dael Logo"
            className={styles.logo}
          />
        </div> */}

        <div className={styles.avatarWrapper}>
          <div className={styles.avatarRing} />
          <img
            src={avatar}
            alt="Dael"
            className={styles.avatar}
          />
        </div>

        <h1 className={styles.name}>Dael</h1>
        <p className={styles.role}>Full Stack Developer</p>
        <div className={styles.divider} />
        <p className={styles.bio}>
          ¡Hola! Soy un apasionado del desarrollo web y fan de Rick &amp; Morty.
          Este proyecto fue construido con React para explorar el universo de
          Rick &amp; Morty a través de su API pública.
        </p>
        <div className={styles.tags}>
          <span className={styles.tag}>React</span>
          <span className={styles.tag}>TypeScript</span>
          <span className={styles.tag}>Node.js</span>
          <span className={styles.tag}>Java</span>
          <span className={styles.tag}>Express.js</span>
          <span className={styles.tag}>MySQL</span>
          <span className={styles.tag}>Docker</span>
          <span className={styles.tag}>Prisma</span>
        </div>
      </div>
    </div>
  );
}

