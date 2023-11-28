import api from '../app/_config/api';

export const getAllFriends = async (userId: number) => {
  const res = await api.post(`${process.env.NEXT_PUBLIC_API_URL}/api/friend`, { userId });
  return res.data;
};

export const removeFriend = async (friendId: number) => api.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/friend`, { data: { friendId } });

export const getFriendsId = async () => {
  const res = await api.get(`${process.env.NEXT_PUBLIC_API_URL}/api/id-friend`);
  return res.data;
};

export const addFriend = async (friendId: number) => api.post(`${process.env.NEXT_PUBLIC_API_URL}/api/add-friend`, { friendId });
