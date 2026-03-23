import { Link } from 'react-router-dom';
import type { CardDisplay } from '../../types';
import styles from './Card.module.css';

interface CardProps {
  card: CardDisplay;
  onFavoriteToggle?: (id: number, isFavorite: boolean) => void;
  onEdit?: () => void;
  onDelete?: (id: number) => void;
}

export default function Card({ card, onFavoriteToggle, onEdit, onDelete }: CardProps) {
  const statusClass =
    card.status === 'Alive'
      ? styles.alive
      : card.status === 'Dead'
        ? styles.dead
        : styles.unknown;

  return (
    <div className={styles.card}>
      <div className={styles.content}>
        {/* Back face */}
        <div className={styles.back}>
          <div className={styles.backContent}>
            <span className={styles.idBadge}>#{card.id}</span>
            <img src={card.image} alt={card.name} className={styles.backImage} />
            <div className={styles.backOverlay} />
            {card.isCustom ? (
              <span className={styles.backNameLink}>
                <strong className={styles.backName}>{card.name}</strong>
              </span>
            ) : (
              <Link to={`/detail/${card.id}`} className={styles.backNameLink}>
                <strong className={styles.backName}>{card.name}</strong>
              </Link>
            )}
          </div>
        </div>

        {/* Front face */}
        <div className={styles.front}>
          <div className={styles.img}>
            <div className={styles.circle} />
            <div className={`${styles.circle} ${styles.circleRight}`} />
            <div className={`${styles.circle} ${styles.circleBottom}`} />
          </div>
          <div className={styles.frontContent}>
            <small className={styles.badge}>{card.species}</small>
            <div className={styles.description}>
              <div className={styles.titleRow}>
                <p className={styles.charName}><strong>{card.name}</strong></p>
                <span className={`${styles.statusDot} ${statusClass}`} />
              </div>
              <p className={styles.cardFooter}>
                {card.status}&nbsp;|&nbsp;{card.gender}
              </p>
              <p className={styles.origin}>{card.origin}</p>
            </div>
          </div>

          {/* Action buttons */}
          {card.isCustom ? (
            <div className={styles.actionBtns}>
              {onEdit && (
                <button className={styles.editBtn} onClick={onEdit} title="Editar">
                  ✏
                </button>
              )}
              {onDelete && (
                <button className={styles.deleteBtn} onClick={() => onDelete(card.id)} title="Eliminar">
                  ✕
                </button>
              )}
            </div>
          ) : (
            onFavoriteToggle && (
              <button
                className={`${styles.heartBtn} ${card.isFavorite ? styles.heartActive : styles.heartInactive}`}
                onClick={() => onFavoriteToggle(card.id, card.isFavorite)}
                title={card.isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
              >
                {card.isFavorite ? '♥' : '♡'}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}
