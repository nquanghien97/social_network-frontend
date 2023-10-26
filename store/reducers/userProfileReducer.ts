import { createSlice } from '@reduxjs/toolkit';
import User from '../../entities/User.entities';

export const profileSlice = createSlice<User, {
  setProfile:(
  state: User,
  action: { type: string, payload: User }
  ) => void;
  updateProfile: (
    state: User,
    action: { type: string, payload: Partial<User> }
  ) => void;
}
>({
      name: 'Profile',
      initialState: {
        id: -1,
        email: '',
        fullName: '',
        location: '',
        imageUrl: '',
        description: '',
        job: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      reducers: {
        setProfile(state, action: { type: string; payload: User }) {
          const user = action.payload;
          state.id = user?.id;
          state.email = user?.email;
          state.fullName = user?.fullName;
          state.location = user?.location;
          state.imageUrl = user.imageUrl || 'DefaultAvatar.svg';
          state.description = user?.description;
          state.job = user?.job;
          state.createdAt = user?.createdAt;
          state.updatedAt = user?.updatedAt;
        },

        updateProfile(state, action: { type: string; payload: Partial<User> }) {
          const userInfo = action.payload;
          state.email = userInfo.email ?? '';
          state.fullName = userInfo.fullName ?? '';
          state.imageUrl = userInfo.imageUrl ?? '';
        },
      },
    },
    );

export const { setProfile, updateProfile } = profileSlice.actions;
export default profileSlice.reducer;
