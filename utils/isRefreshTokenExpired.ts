import { getFromLocalStorage } from './localStorage';
import { parseJwt } from './parseJwt';

export default function isRefreshTokenExpired() {
  const refreshToken = getFromLocalStorage('refreshToken');
  try {
    if (!refreshToken) return null;
    const decodedToken = parseJwt(refreshToken);
    const expirationTime = decodedToken.exp * 1000;
    const isExpired = expirationTime < Date.now();

    return isExpired;
  } catch (err) {
    console.log(err);
  }
  return null;
}
