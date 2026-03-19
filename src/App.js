import './App.css';
import Cards from './components/Cards.jsx';
import Nav from './components/Nav.jsx';
import About from './components/About.jsx';
import Detail from './components/Detail.jsx';
import ErrorPage from './components/Error.jsx';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

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
         <Routes>
            <Route path='/home' element={<Cards characters={characters} onClose={onClose} />} />
            <Route path='/about' element={<About />} />
            <Route path='/detail/:id' element={<Detail />} />
            <Route path='*' element={<ErrorPage />} />
         </Routes>
      </div>
   );
}

export default App;
