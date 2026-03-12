export default function SearchBar(props) {
   return (
      <div>
         <input type='search' />
         <button onClick={() => window.alert('Emulamos que se cierra la card')}>
            Agregar
         </button> 
      </div>
   );
}
