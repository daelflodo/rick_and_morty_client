import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { validate } from '../../utils/validation';
import type { ValidationErrors } from '../../types';
import styles from './Login.module.css';

type AuthMode = 'login' | 'register';

interface FormData {
  username: string;
  email: string;
  password: string;
}

const DEMO_EMAIL = 'demo@rickmorty.com';
const DEMO_PASSWORD = 'Demo1234!';

export default function Login() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<AuthMode>('login');
  const [formData, setFormData] = useState<FormData>({ username: '', email: '', password: '' });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [apiError, setApiError] = useState<string>('');
  const [demoLoading, setDemoLoading] = useState(false);

  const login = useAuthStore((state) => state.login);
  const register = useAuthStore((state) => state.register);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);
    const toValidate = mode === 'register' ? updated : { email: updated.email, password: updated.password };
    setErrors(validate(toValidate));
    setApiError('');
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    const toValidate = mode === 'register' ? formData : { email: formData.email, password: formData.password };
    const currentErrors = validate(toValidate);
    if (Object.keys(currentErrors).length > 0) {
      setErrors(currentErrors);
      return;
    }
    try {
      if (mode === 'login') {
        await login({ email: formData.email, password: formData.password });
      } else {
        await register({ username: formData.username, email: formData.email, password: formData.password });
      }
      navigate('/home');
    } catch {
      setApiError(mode === 'login' ? 'Email o contrasena incorrectos.' : 'Error al registrarse. El email o username ya existe.');
    }
  }

  async function handleDemoLogin(): Promise<void> {
    setDemoLoading(true);
    setApiError('');
    try {
      await login({ email: DEMO_EMAIL, password: DEMO_PASSWORD });
      navigate('/home');
    } catch {
      setApiError('La cuenta demo no está disponible. Intentalo más tarde.');
    } finally {
      setDemoLoading(false);
    }
  }

  function toggleMode(): void {
    setMode((prev) => (prev === 'login' ? 'register' : 'login'));
    setErrors({});
    setApiError('');
    setFormData({ username: '', email: '', password: '' });
  }

  const hasErrors = Object.keys(errors).length > 0;
  const hasInput = formData.email !== '' || formData.password !== '';

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.portalRing} />
          <h1 className={styles.title}>Rick &amp; Morty</h1>
          <p className={styles.subtitle}>Universe</p>
        </div>
        <form onSubmit={(e) => void handleSubmit(e)} className={styles.form}>
          {mode === 'register' && (
            <div className={styles.field}>
              <input
                type="text"
                name="username"
                placeholder="Username"
                className={styles.input}
                value={formData.username}
                onChange={handleChange}
                autoComplete="username"
              />
              {errors.username && <span className={styles.error}>{errors.username}</span>}
            </div>
          )}
          <div className={styles.field}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className={styles.input}
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
            />
            {errors.email && <span className={styles.error}>{errors.email}</span>}
          </div>
          <div className={styles.field}>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className={styles.input}
              value={formData.password}
              onChange={handleChange}
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            />
            {errors.password && <span className={styles.error}>{errors.password}</span>}
          </div>
          {apiError && <span className={styles.error}>{apiError}</span>}
          <button type="submit" className={styles.btn} disabled={hasErrors && hasInput}>
            {mode === 'login' ? 'Sign In' : 'Register'}
          </button>
          <button type="button" className={styles.btn} onClick={toggleMode}>
            {mode === 'login' ? 'No tenes cuenta? Registrate' : 'Ya tenes cuenta? Inicia sesion'}
          </button>
          <div className={styles.divider}><span>o</span></div>
          <button
            type="button"
            className={styles.demoBtn}
            onClick={() => void handleDemoLogin()}
            disabled={demoLoading}
          >
            {demoLoading ? 'Entrando...' : '🚀 Entrar como Demo'}
          </button>
          <button
            type="button"
            className={styles.googleBtn}
            onClick={() => setApiError('Próximamente: configura VITE_GOOGLE_CLIENT_ID para activar Google Login.')}
          >
            <svg width="18" height="18" viewBox="0 0 48 48" style={{flexShrink:0}}>
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.37-8.16 2.37-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            Continuar con Google
          </button>
          <button type="button" className={styles.backBtn} onClick={() => navigate('/home')}>
            ← Explorar sin registrarse
          </button>
        </form>
      </div>
    </div>
  );
}
