import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './Detail.module.css';

export default function Detail() {
  const { id } = useParams();
  const [character, setCharacter] = useState({});

  useEffect(() => {
   fetch(`https://rickandmortyapi.com/api/character/${id}`)
      .then((res) => res.json())
      .then((data) => {
         if (data.name) {
            setCharacter(data);
         } else {
            window.alert('No hay personajes con ese ID');
         }
      });
   
   return () => setCharacter({});
}, [id]);

  return (
    <div className={styles.container}>
      {character.name && (
        <div className={styles.card}>
          <img
            src={character.image}
            alt={character.name}
            className={styles.image}
          />
          <div className={styles.info}>
            <h1 className={styles.name}>{character.name}</h1>
            <div className={styles.details}>
              <div className={styles.item}>
                <span className={styles.label}>Status</span>
                <span
                  className={`${styles.value} ${
                    character.status === 'Alive'
                      ? styles.alive
                      : character.status === 'Dead'
                      ? styles.dead
                      : styles.unknown
                  }`}
                >
                  {character.status}
                </span>
              </div>
              <div className={styles.item}>
                <span className={styles.label}>Species</span>
                <span className={styles.value}>{character.species}</span>
              </div>
              <div className={styles.item}>
                <span className={styles.label}>Gender</span>
                <span className={styles.value}>{character.gender}</span>
              </div>
              <div className={styles.item}>
                <span className={styles.label}>Origin</span>
                <span className={styles.value}>{character.origin?.name}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
