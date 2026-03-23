import './App.css';
import { type ReactNode } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import { useAuthStore } from './stores/authStore';
import About from './views/About/About';
import Detail from './views/Detail/Detail';
import ErrorPage from './views/Error/Error';
import Login from './views/Login/Login';
import Cards from './components/Cards/Cards';

function ProtectedRoute({ children }: { children: ReactNode }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? <>{children}</> : <Navigate to="/" replace />;
}

function App() {
  const location = useLocation();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <div className="App">
      {location.pathname !== '/' && isAuthenticated && <Nav />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<ProtectedRoute><Cards /></ProtectedRoute>} />
        <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
        <Route path="/detail/:id" element={<ProtectedRoute><Detail /></ProtectedRoute>} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
