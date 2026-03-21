import { useState } from 'react';
import { validate } from './validation.js';
import styles from './Form.module.css';

export default function Form({ login }) {
  const [userData, setUserData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    const updated = { ...userData, [name]: value };
    setUserData(updated);
    setErrors(validate(updated));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const currentErrors = validate(userData);
    if (Object.keys(currentErrors).length > 0) {
      setErrors(currentErrors);
      return;
    }
    login(userData);
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.portalRing} />
          <h1 className={styles.title}>Rick &amp; Morty</h1>
          <p className={styles.subtitle}>Universe</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="email" className={styles.label}>Email</label>
            <input
              id="email"
              name="email"
              type="text"
              value={userData.email}
              onChange={handleChange}
              placeholder="ejemplo@gmail.com"
              className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
              autoComplete="off"
            />
            {errors.email && <p className={styles.error}>{errors.email}</p>}
          </div>

          <div className={styles.field}>
            <label htmlFor="password" className={styles.label}>Contraseña</label>
            <input
              id="password"
              name="password"
              type="password"
              value={userData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
            />
            {errors.password && <p className={styles.error}>{errors.password}</p>}
          </div>

          <button
            type="submit"
            className={styles.btn}
            disabled={Object.keys(errors).length > 0 && (userData.email !== '' || userData.password !== '')}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
