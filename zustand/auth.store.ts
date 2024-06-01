import { create } from 'zustand';
import UserEntity from '@/entities/User.entities';
import { isAuthenticated } from '@/utils/isAuthenticated';
import { findUser } from '@/services/findUser';

interface Auth {
  getUser: (userId: string) => Promise<void>;
  loading: boolean;
  user: UserEntity,
  setProfile: (user: UserEntity) => void
}

const initialValue: UserEntity = {
  id: '',
  email: '',
  fullName: '',
  location: '',
  imageUrl: '',
  description: '',
  job: '',
  friendQuantity: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const useAuth = create<Auth>()((set) => ({
  loading: false,
  user: initialValue,
  getUser: async (userId: string) => {
    set(() => ({ loading: true }));
    try {
      if (isAuthenticated()) {
        const response = await findUser(userId);
        set(() => ({ user: response }));
      }
    } catch (err) {
      console.log(err.message);
    } finally {
      set(() => ({ loading: false }));
    }
  },
  setProfile: (user: UserEntity) => {
    set({ user });
  },
}));
