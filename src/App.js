import './App.css';
import Cards from './components/Cards.jsx';
import Nav from './components/Nav.jsx';
import About from './components/About.jsx';
import Detail from './components/Detail.jsx';
import ErrorPage from './components/Error.jsx';
import Form from './components/Form.jsx';
import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

function App() {
   const navigate = useNavigate();
   const location = useLocation();
   const [access, setAccess] = useState(false);
   const [characters, setCharacters] = useState([]);
   const EMAIL = 'dael@gmail.com';
   const PASSWORD = 'dael123';

   function login(userData) {
      if (userData.email === EMAIL && userData.password === PASSWORD) {
         setAccess(true);
         navigate('/home');
      } else {
         window.alert('Email o contraseña incorrectos.');
      }
   }

   function logout() {
      setAccess(false);
   }

   useEffect(() => {
      const isProtected = ['/home', '/about'].includes(location.pathname)
         || location.pathname.startsWith('/detail/');
      if (!access && isProtected) navigate('/');
   }, [access, location.pathname]);


   function onSearch(id) {
      const numericId = Number(id);
      if (!numericId) return;
      if (characters.some(char => char.id === numericId)) {
         window.alert('¡Este personaje ya está en la lista!');
         return;
      }
      fetch(`https://rickandmortyapi.com/api/character/${numericId}`)
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
   }

   function loadRandom() {
      const ids = [];
      while (ids.length < 10) {
         const random = Math.floor(Math.random() * 826) + 1;
         if (!ids.includes(random)) ids.push(random);
      }
      fetch(`https://rickandmortyapi.com/api/character/${ids.join(',')}`)
         .then(res => res.json())
         .then(data => setCharacters(Array.isArray(data) ? data : [data]));
   }

   return (
      <div className='App'>
         {location.pathname !== '/' && <Nav onSearch={onSearch} logout={logout} onRandom={loadRandom} />}
         <Routes>
            <Route path='/' element={<Form login={login} />} />
            <Route path='/home' element={<Cards characters={characters} onClose={onClose} />} />
            <Route path='/about' element={<About />} />
            <Route path='/detail/:id' element={<Detail />} />
            <Route path='*' element={<ErrorPage />} />
         </Routes>
      </div>
   );
}

export default App;
 