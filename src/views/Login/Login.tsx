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

export default function Login() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<AuthMode>('login');
  const [formData, setFormData] = useState<FormData>({ username: '', email: '', password: '' });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [apiError, setApiError] = useState<string>('');

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
        </form>
      </div>
    </div>
  );
}
