import type { ValidationErrors } from '../types';

interface FormData {
  username?: string;
  email: string;
  password: string;
}

export function validate(userData: FormData): ValidationErrors {
  const errors: ValidationErrors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (userData.username !== undefined) {
    if (!userData.username) {
      errors.username = 'El nombre de usuario es obligatorio.';
    } else if (userData.username.length < 3 || userData.username.length > 50) {
      errors.username = 'El username debe tener entre 3 y 50 caracteres.';
    }
  }

  if (!userData.email) {
    errors.email = 'El email es obligatorio.';
  } else if (!emailRegex.test(userData.email)) {
    errors.email = 'Ingresa un email valido.';
  } else if (userData.email.length > 35) {
    errors.email = 'El email no puede superar los 35 caracteres.';
  }

  if (!userData.password) {
    errors.password = 'La contrasena es obligatoria.';
  } else if (userData.password.length < 6 || userData.password.length > 10) {
    errors.password = 'La contrasena debe tener entre 6 y 10 caracteres.';
  } else if (!/\d/.test(userData.password)) {
    errors.password = 'La contrasena debe contener al menos un numero.';
  }

  return errors;
}
