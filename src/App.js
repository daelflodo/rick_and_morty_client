import './App.css';
import Card from './components/Card.jsx';
import Cards from './components/Cards.jsx';
import SearchBar from './components/SearchBar.jsx';
import Nav from './components/Nav.jsx';
// import characters, { Rick } from './data.js';
import { useState } from 'react';

function App() {
   const [characters, setCharacters] = useState([]);
   const example = {
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      gender: 'Male',
      origin: {
         name: 'Earth (C-137)',
         url: 'https://rickandmortyapi.com/api/location/1',
      },
      image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
   };
   // const onSearch = ((id) => {
   //    setCharacters([...characters, example]);

   // });
   function onSearch(id) {
      // Convertir el ID a número una sola vez
      console.log("numericId", id);
      if (characters.some(char => char.id === id)) {
         window.alert('¡Este personaje ya está en la lista!');
         return;
      }
      fetch(`https://rickandmortyapi.com/api/character/${id}`)
         .then(response => response.json())
         .then(data => {
            if (data.name) {
               setCharacters((oldChars) => [...oldChars, data]);
            } else {
               window.alert('¡No hay personajes con este ID!');
            }
         });
   }
   const onClose = (id) => {
      setCharacters((oldChars) => oldChars.filter((char) => char.id !== id));
      // const filteredChars = characters.filter((char) => char.id !== id);
      // setCharacters(filteredChars);

   }
   console.log(characters);

   return (
      <div className='App'>
         <Nav onSearch={onSearch} />
         {/* <SearchBar onSearch={(characterID) => window.alert(characterID)} /> */}
         <Cards characters={characters} onClose={onClose} />
         {/* <Card
            id={Rick.id}
            name={Rick.name}
            status={Rick.status}
            species={Rick.species}
            gender={Rick.gender}
            origin={Rick.origin.name}
            image={Rick.image}
            onClose={() => window.alert('Emulamos que se cierra la card')}
         /> */}
      </div>
   );
}

export default App;
