import api from '../app/_config/api';

export const getAllFriends = async () => {
  const res = await api.get(`${process.env.NEXT_PUBLIC_API_URL}/api/friend`);
  return res.data;
};

export const removeFriend = async (friendId: number) => api.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/friend`, { data: { friendId } });
