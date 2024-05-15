import { getFromLocalStorage } from '../utils/localStorage';
import api from '../config/api';
import { parseJwt } from '../utils/parseJwt';
import { UpdateUserDTO } from '@/dto/User.dto';
import { useAuth } from '@/zustand/auth.store';

export const getUserId = (): string => {
  const token = getFromLocalStorage('accessToken');
  if (!token) return '';
  const data = parseJwt(token);

  return data.userId;
};

export const getUser = async () => {
  const res = await api.get(`${process.env.NEXT_PUBLIC_API_URL}/api/current-user`);
  return res.data.user;
};

export const updateUser = async (data: UpdateUserDTO) => {
  const res = await api.post(`${process.env.NEXT_PUBLIC_API_URL}/api/update-user`, data);
  useAuth.getState().setProfile(res.data.user);
};

export const getSuggestionsUser = async (limit: number, offset = 1) => {
  const res = await api.post(`${process.env.NEXT_PUBLIC_API_URL}/api/suggestions-user`, { offset, limit });
  return res.data;
};

export const searchUsers = async (searchText: string) => {
  const res = await api.post(`${process.env.NEXT_PUBLIC_API_URL}/api/search-users`, { searchText });
  return res.data;
};

export const updateAvatarUser = async (data: FormData) => {
  const res = await api.post(`${process.env.NEXT_PUBLIC_API_URL}/api/update-avatar`, data);
  useAuth.getState().setProfile(res.data.user);
};

export const updatePassword = async ({ oldPassword, newPassword } : { oldPassword: string, newPassword: string }) => {
  await api.post(`${process.env.NEXT_PUBLIC_API_URL}/api/update-password`, { oldPassword, newPassword });
};
