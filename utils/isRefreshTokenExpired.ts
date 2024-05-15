import { getFromLocalStorage } from './localStorage';
import { parseJwt } from './parseJwt';

export default function isRefreshTokenExpired() {
  const refreshToken = getFromLocalStorage('refreshToken');
  if (!refreshToken) return null;
  const decodedToken = parseJwt(refreshToken);
  const expirationTime = decodedToken.exp * 1000;
  const isExpired = expirationTime < Date.now();

  return isExpired;
}
