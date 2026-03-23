import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { charactersApi } from '../../services/api';
import type { Character } from '../../types';
import styles from './Detail.module.css';

export default function Detail() {
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<Character | null>(null);

  useEffect(() => {
    if (!id) return;
    charactersApi
      .getById(Number(id))
      .then(setCharacter)
      .catch(() => setCharacter(null));
    return () => setCharacter(null);
  }, [id]);

  if (!character) return null;

  const statusClass =
    character.status === 'Alive'
      ? styles.alive
      : character.status === 'Dead'
        ? styles.dead
        : styles.unknown;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <img src={character.image} alt={character.name} className={styles.image} />
        <div className={styles.info}>
          <h1 className={styles.name}>{character.name}</h1>
          <div className={styles.details}>
            <div className={styles.detailItem}>
              <span className={styles.label}>Status</span>
              <span className={`${styles.value} ${statusClass}`}>{character.status}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.label}>Species</span>
              <span className={styles.value}>{character.species}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.label}>Gender</span>
              <span className={styles.value}>{character.gender}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.label}>Origin</span>
              <span className={styles.value}>{character.origin.name}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
