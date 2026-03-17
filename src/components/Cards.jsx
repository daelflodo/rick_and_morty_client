import Card from './Card';
import styles from './Cards.module.css';

export default function Cards(props) {
   return (
      <main className={styles.container}>
         <header>
            <p className={styles.heading}>Rick & Morty Universe</p>
            <h1 className={styles.title}>Characters</h1>
            <p className={styles.subtitle}>Explore every character across the multiverse</p>
         </header>

         <ul className={styles.grid}>
            {props.characters.map((character) => (
               <li key={character.id}>
                  <Card
                     id={character.id}
                     name={character.name}
                     status={character.status}
                     species={character.species}
                     gender={character.gender}
                     origin={character.origin.name}
                     image={character.image}
                     // onClose={() => window.alert('Emulamos que se cierra la card')}
                     onClose={() => props.onClose(character.id)}
                  />
               </li>
            ))}
         </ul>
      </main>
   );
}
