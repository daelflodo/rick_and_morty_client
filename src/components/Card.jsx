// import styles from './Card.module.css';
import styles from './Card.module.css';

export default function Card(props) {
   const statusClass =
      props.status === 'Alive'
         ? styles.alive
         : props.status === 'Dead'
            ? styles.dead
            : styles.unknown;

   return (
      <main className={styles.card}>
         <div className={styles.imageWrapper}>
            <img src={props.image} alt={props.name} className={styles.image} />
            <div className={styles.imageOverlay} />
            <button className={styles.closeBtn} onClick={props.onClose}>
               ✕
            </button>
         </div>

         <div className={styles.body}>
            <h2 className={styles.name}>{props.name}</h2>

            <div className={styles.statusRow}>
               <span className={`${styles.statusDot} ${statusClass}`} />
               <span className={styles.statusText}>
                  {props.status} — {props.species}
               </span>
            </div>

            <hr className={styles.divider} />

            <div className={styles.infoGrid}>
               <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Gender</span>
                  <span className={styles.infoValue}>{props.gender}</span>
               </div>
               <div className={`${styles.infoItem} ${styles.fullRow}`}>
                  <span className={styles.infoLabel}>Origin</span>
                  <span className={styles.infoValue}>{props.origin}</span>
               </div>
            </div>
         </div>
      </main>
   );
}