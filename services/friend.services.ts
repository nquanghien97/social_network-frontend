import api from '@/config/api';

export const getAllFriends = async (userId: string) => {
  const res = await api.post(`${process.env.NEXT_PUBLIC_API_URL}/api/friend`, { userId });
  return res.data;
};

export const getFriendsOfUser = async (friendId: string) => {
  const res = await api.post(`${process.env.NEXT_PUBLIC_API_URL}/api/friend-user`, { friendId });
  return res.data;
};

export const removeFriend = async (friendId: string) => api.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/friend`, { data: { friendId } });

export const getFriendsId = async () => {
  const res = await api.get(`${process.env.NEXT_PUBLIC_API_URL}/api/id-friend`);
  return res.data.listFriendsId;
};

export const addFriend = async (friendId: string) => api.post(`${process.env.NEXT_PUBLIC_API_URL}/api/add-friend`, { friendId });

export const findFriend = async (friendId: string) => api.post(`${process.env.NEXT_PUBLIC_API_URL}/api/find-friend`, { friendId });
