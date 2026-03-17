import styles from './SearchBar.module.css';
import { useState } from 'react';

export default function SearchBar(props) {
   const [id, setId] = useState('');
   const handleChange = (event) => {
      setId(event.target.value);
   }
   const handleSearch = () => {
      props.onSearch(id);
      setId(''); // Opcional: limpiar el input después de buscar
   }
   return (
      <search className={styles.wrapper}>
         <label className={styles.label}>Find a character</label>
         <form className={styles.row} onSubmit={(e) => e.preventDefault()}>
            <span className={styles.icon} aria-hidden='true'>🔍</span>
            <input
               type='search'
               className={styles.input}
               placeholder='e.g. Rick Sanchez...'
               onChange={handleChange}
            // value={id}
            />
            <button
               type='submit'
               className={styles.button}
               onClick={handleSearch}
            // onClick={() => window.alert('Emulamos que se busca el personaje')}

            >
               Search
            </button>
         </form>
      </search>
   );
}
