import { create } from 'zustand';
import { isAuthenticated } from '../utils/isAuthenticated';
import UserEntity from '@/entities/User.entities';
import { getAllFriends } from '@/services/friend.services';

interface Friends {
  getListFriends: (userId: string) => Promise<void>;
  listFriends: UserEntity[];
  loadingFriends: boolean;
}

export const useFriends = create<Friends>()((set) => ({
  loadingFriends: false,
  listFriends: [],
  getListFriends: async (userId: string) => {
    set(() => ({ loadingFriends: true }));
    try {
      if (isAuthenticated()) {
        const response = await getAllFriends(userId);
        set(() => ({ listFriends: response.listFriends as UserEntity[] }));
      }
    } catch (err) {
      console.log(err.message);
    } finally {
      set(() => ({ loadingFriends: false }));
    }
  },
}));
