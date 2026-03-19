import styles from './Error.module.css';

export default function Error() {
  return (
    <div className={styles.container}>
      <div className={styles.glitch} data-text="404">404</div>
      <h2 className={styles.title}>Dimensión no encontrada</h2>
      <p className={styles.subtitle}>
        Parece que Rick te mandó a la dimensión equivocada.
        <br />
        Esta ruta no existe en ningún universo conocido.
      </p>
    </div>
  );
}
