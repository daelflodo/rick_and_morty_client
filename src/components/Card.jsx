import { Link } from 'react-router-dom';
import styles from './Card.module.css';

export default function Card(props) {
   const statusClass =
      props.status === 'Alive'
         ? styles.alive
         : props.status === 'Dead'
            ? styles.dead
            : styles.unknown;

   return (
      <div className={styles.card}>
         <div className={styles.content}>

            {/* Back face — character image with spinning border */}
            <div className={styles.back}>
               <div className={styles.backContent}>
                  <span className={styles.idBadge}>#{props.id}</span>
                  <img src={props.image} alt={props.name} className={styles.backImage} />
                  <div className={styles.backOverlay} />
                  <Link to={`/detail/${props.id}`} className={styles.backNameLink}>
                  <strong className={styles.backName}>{props.name}</strong>
               </Link>
               </div>
            </div>

            {/* Front face — revealed on hover */}
            <div className={styles.front}>
               <div className={styles.img}>
                  <div className={styles.circle} />
                  <div className={`${styles.circle} ${styles.circleRight}`} />
                  <div className={`${styles.circle} ${styles.circleBottom}`} />
               </div>
               <div className={styles.frontContent}>
                  <small className={styles.badge}>{props.species}</small>
                  <div className={styles.description}>
                     <div className={styles.titleRow}>
                        <p className={styles.charName}><strong>{props.name}</strong></p>
                        <span className={`${styles.statusDot} ${statusClass}`} />
                     </div>
                     <p className={styles.cardFooter}>
                        {props.status}&nbsp;|&nbsp;{props.gender}
                     </p>
                     <p className={styles.origin}>{props.origin}</p>
                  </div>
               </div>
               <button className={styles.closeBtn} onClick={props.onClose}>✕</button>
            </div>

         </div>
      </div>
   );
}