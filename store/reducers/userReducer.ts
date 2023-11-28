import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { isAuthenticated } from '../../utils/isAuthenticated';
import UserEntity from '../../entities/User.entities';
import { findUser } from '../../services/findUser';

export interface UserType {
  user: UserEntity,
  loading: boolean,
}
const initialState: UserType = {
  user: {
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
  loading: false,
};

export const getUserAsync = createAsyncThunk(
  'user/getUser',
  async (userId: number, thunkApi) => {
    try {
      if (isAuthenticated()) {
        const response = await findUser(userId);
        return response;
      }
    } catch (err) {
      return thunkApi.rejectWithValue(err.response?.data);
    }
    return null;
  },
);

const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserAsync.pending, (state) => {
      state.user = {
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
      };
      state.loading = true;
    });
    builder.addCase(getUserAsync.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(getUserAsync.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const getUserSelector = createSelector((state) => {
  console.log(state);
  return {
    user: state.user.user,
    loading: state.user.loading,
    error: state.user.error,
  };
}, (state) => state);

export default userReducer.reducer;
