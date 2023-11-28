import api from '../app/_config/api';

export const findUser = async (userId: number) => {
  const res = await api.post(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, { userId });
  return res.data.user;
};
