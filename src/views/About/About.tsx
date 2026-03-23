import avatar from '../../assets/dael-avatar.png';
import styles from './About.module.css';

export default function About() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.avatarWrapper}>
          <div className={styles.avatarRing} />
          <img src={avatar} alt="Dael" className={styles.avatar} />
        </div>
        <h1 className={styles.name}>Dael</h1>
        <p className={styles.role}>Full Stack Developer</p>
        <div className={styles.divider} />
        <p className={styles.bio}>
          Hola! Soy un apasionado del desarrollo web y fan de Rick and Morty. Este proyecto fue
          construido con React para explorar el universo de Rick and Morty a traves de su API
          publica.
        </p>
        <div className={styles.tags}>
          <span>Nest.js</span><span>TypeScript</span><span>Node.js</span>
          <span>Express.js</span><span>JavaScript</span><span>CSS</span>
          <span>HTML</span><span>React</span><span>Java</span>
          <span>Spring Boot</span><span>MySQL</span><span>Docker</span>
          <span>Prisma</span><span>FastAPI</span><span>Python</span><span>PostgreSQL</span>
        </div>
      </div>
    </div>
  );
}
