export function validate(userData) {
  const errors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!userData.email) {
    errors.email = 'El email es obligatorio.';
  }
  if (!emailRegex.test(userData.email)) {
    errors.email = 'Ingresa un email válido.';
  }
  if (userData.email && userData.email.length > 35) {
    errors.email = 'El email no puede superar los 35 caracteres.';
  }

  if (!userData.password) {
    errors.password = 'La contraseña es obligatoria.';
  }
  if (userData.password.length < 6 || userData.password.length > 10) {
    errors.password = 'La contraseña debe tener entre 6 y 10 caracteres.';
  }
  if (!/\d/.test(userData.password)) {
    errors.password = 'La contraseña debe contener al menos un número.';
  }

  return errors;
}
