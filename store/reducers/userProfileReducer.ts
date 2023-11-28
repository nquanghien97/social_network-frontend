import { createSlice } from '@reduxjs/toolkit';
import UserEntity from '../../entities/User.entities';

export const profileSlice = createSlice<UserEntity, {
  setProfile:(
  state: UserEntity,
  action: { type: string, payload: UserEntity }
  ) => void;
  updateProfile: (
    state: UserEntity,
    action: { type: string, payload: Partial<UserEntity> }
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
        friendQuantity: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      reducers: {
        setProfile(state, action: { type: string; payload: UserEntity }) {
          const user = action.payload;
          state.id = user?.id;
          state.email = user?.email;
          state.fullName = user?.fullName;
          state.location = user?.location;
          state.imageUrl = user.imageUrl || 'DefaultAvatar.svg';
          state.description = user?.description;
          state.job = user?.job;
          state.friendQuantity = user?.friendQuantity;
          state.createdAt = user?.createdAt;
          state.updatedAt = user?.updatedAt;
        },

        updateProfile(state, action: { type: string; payload: Partial<UserEntity> }) {
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
