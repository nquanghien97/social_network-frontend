import { getFromLocalStorage } from './localStorage';
import { parseJwt } from './parseJwt';

export const isAuthenticated = () => {
  const token = getFromLocalStorage('accessToken');

  if (!token) return false;

  const data = parseJwt(token);
  const expirationTime = data.exp * 1000;
  const isExpired = expirationTime < Date.now();
  return !isExpired;
};
