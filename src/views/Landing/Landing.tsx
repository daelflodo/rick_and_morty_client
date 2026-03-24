import { useNavigate } from 'react-router-dom';
import styles from './Landing.module.css';

const FEATURES = [
  {
    icon: '🔍',
    title: 'Explorador de Personajes',
    desc: 'Buscá y filtrá por nombre, estado, especie y género entre cientos de personajes del multiverso.',
  },
  {
    icon: '❤️',
    title: 'Favoritos',
    desc: 'Guardá tus personajes favoritos y accedé a ellos en cualquier momento desde tu cuenta.',
  },
  {
    icon: '✏️',
    title: 'Personajes Propios',
    desc: 'Creá, editá y eliminá tus propios personajes con toda la información que quieras.',
  },
  {
    icon: '🎲',
    title: 'Modo Random',
    desc: 'Descubrí 10 personajes aleatorios del multiverso con un solo click.',
  },
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.portalWrapper}>
          <div className={styles.portalOuter} />
          <div className={styles.portalInner} />
        </div>
        <div className={styles.heroText}>
          <span className={styles.badge}>🌀 Multiverso Rick &amp; Morty</span>
          <h1 className={styles.heroTitle}>
            Explorá el <span className={styles.accent}>Universo</span>
          </h1>
          <p className={styles.heroSub}>
            Buscá personajes, guardá favoritos y creá los tuyos. Sin necesidad de registrarte para explorar.
          </p>
          <div className={styles.heroBtns}>
            <button className={styles.btnPrimary} onClick={() => navigate('/home')}>
              Explorar ahora →
            </button>
            <button className={styles.btnOutline} onClick={() => navigate('/login')}>
              Login / Registrarse
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className={styles.features}>
        <h2 className={styles.featuresTitle}>¿Qué podés hacer?</h2>
        <div className={styles.featuresGrid}>
          {FEATURES.map((f) => (
            <div key={f.title} className={styles.featureCard}>
              <span className={styles.featureIcon}>{f.icon}</span>
              <h3 className={styles.featureName}>{f.title}</h3>
              <p className={styles.featureDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA bottom */}
      <section className={styles.cta}>
        <p className={styles.ctaText}>¿Ya tenés cuenta?</p>
        <button className={styles.btnPrimary} onClick={() => navigate('/login')}>
          Iniciar sesión
        </button>
      </section>

      <footer className={styles.footer}>
        Rick &amp; Morty Universe &mdash; Built with FastAPI &amp; React
      </footer>
    </div>
  );
}
