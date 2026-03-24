import './App.css';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import About from './views/About/About';
import Detail from './views/Detail/Detail';
import ErrorPage from './views/Error/Error';
import Landing from './views/Landing/Landing';
import Login from './views/Login/Login';
import Cards from './components/Cards/Cards';

function App() {
  const location = useLocation();
  const hideNav = location.pathname === '/' || location.pathname === '/login';

  return (
    <div className="App">
      {!hideNav && <Nav />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Cards />} />
        <Route path="/about" element={<About />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
