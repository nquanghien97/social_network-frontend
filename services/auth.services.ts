import axios from 'axios';
import { createUserFromUserResponse } from '@/entities/User.entities';
import { removeFromLocalStorage, setToLocalStorage } from '../utils/localStorage';
import api from '../config/api';
import { useAuth } from '@/zustand/auth.store';

export const signIn = async (data: { email: string, password: string }) => {
  const dataResponse = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, data);
  const user = createUserFromUserResponse(dataResponse.data.data.user);
  setToLocalStorage('accessToken', dataResponse?.data?.data?.accessToken);
  setToLocalStorage('refreshToken', dataResponse?.data?.data?.refreshToken);
  useAuth.getState().setProfile(user);
};

export const signUp = async (data: { fullName: string, email: string, password: string }) => {
  const dataResponse = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, data);
  const user = createUserFromUserResponse(dataResponse.data.data.user);
  setToLocalStorage('accessToken', dataResponse.data.data.accessToken);
  setToLocalStorage('refreshToken', dataResponse.data.data.refreshToken);
  useAuth.getState().setProfile(user);
};

export const refreshTokenServices = async (payload: string | null) => {
  const res = await api.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/refreshToken`, { payload });
  return {
    accessToken: res.data.accessToken,
    refreshToken: res.data.refreshToken,
  };
};

export const sendRequestPasswordResetServices = async (email: string) => {
  await api.post(`${process.env.NEXT_PUBLIC_API_URL}/api/reset-password`, { email });
};

export const passwordResetServices = async (password: string, id: string, token: string) => {
  await api.post(`${process.env.NEXT_PUBLIC_API_URL}/api/${id}/${token}`, { password });
};

export const logOut = () => {
  removeFromLocalStorage('accessToken');
  removeFromLocalStorage('refreshToken');
};
