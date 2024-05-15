import api from '../config/api';

export const findUser = async (userId: string) => {
  const res = await api.post(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, { userId });
  return res.data.user;
};
