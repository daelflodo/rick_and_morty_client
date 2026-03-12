import styles from './SearchBar.module.css';

export default function SearchBar(props) {
   return (
      <search className={styles.wrapper}>
         <label className={styles.label}>Find a character</label>
         <form className={styles.row} onSubmit={(e) => e.preventDefault()}>
            <span className={styles.icon} aria-hidden='true'>🔍</span>
            <input
               type='search'
               className={styles.input}
               placeholder='e.g. Rick Sanchez...'
            />
            <button
               type='submit'
               className={styles.button}
               onClick={() => window.alert('Emulamos que se busca el personaje')}
            >
               Search
            </button>
         </form>
      </search>
   );
}
