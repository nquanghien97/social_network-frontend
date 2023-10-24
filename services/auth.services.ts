import axios from 'axios';
import store from '../store';
import { setProfile } from '../store/reducers/userProfileReducer';
import { createUserFromUserResponse } from '@/entities/User.entities';
import { getFromLocalStorage, removeFromLocalStorage, setToLocalStorage } from '../utils/localStorage';
import { parseJwt } from '../utils/parseJwt';
import api from '../app/_config/api';

export const signIn = async (data: { email: string, password: string }) => {
  const dataResponse = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, data);
  const user = createUserFromUserResponse(dataResponse.data.data.user);
  store.dispatch(setProfile(user));
  setToLocalStorage('accessToken', dataResponse?.data?.data?.accessToken);
  setToLocalStorage('refreshToken', dataResponse?.data?.data?.refreshToken);
};

export const signUp = async (data: { email: string, password: string }) => {
  const dataResponse = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, data);
  const user = createUserFromUserResponse(dataResponse.data);
  store.dispatch(setProfile(user));
  setToLocalStorage('accessToken', dataResponse.data.accessToken);
  setToLocalStorage('refreshToken', dataResponse.data.refreshToken);
};

export const refreshTokenServices = async (payload: string | null) => {
  const res = await api.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/refreshToken`, { payload });
  return {
    accessToken: res.data.accessToken,
    refreshToken: res.data.refreshToken,
  };
};

export const isAuthenticated = () => {
  const token = getFromLocalStorage('accessToken');

  if (!token) return false;

  const data = parseJwt(token);
  return !!data?.userId;
};

export const logOut = () => {
  removeFromLocalStorage('accessToken');
  removeFromLocalStorage('refreshToken');
};
