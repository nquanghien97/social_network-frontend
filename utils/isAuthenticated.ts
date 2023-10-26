import { getFromLocalStorage } from './localStorage';
import { parseJwt } from './parseJwt';

export const isAuthenticated = () => {
  const token = getFromLocalStorage('accessToken');

  if (!token) return false;

  const data = parseJwt(token);
  return !!data?.userId;
};
