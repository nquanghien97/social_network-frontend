import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { FeedEntity } from '../../entities/Post.entities';
import { getNewFeed } from '../../services/post.services';
import { isAuthenticated } from '../../utils/isAuthenticated';
import { getFriendsId } from '@/services/friend.services';

export interface PostType {
  posts: FeedEntity[],
  loading: boolean,
}
const initialState: PostType = {
  posts: [],
  loading: false,
};

export const getNewFeedAsync = createAsyncThunk(
  'feed/getNewFeed',
  async ({ limit, offset }: { limit: number, offset: number }, thunkApi) => {
    try {
      if (isAuthenticated()) {
        const listFriendsId = await getFriendsId();
        const res = await getNewFeed({ listFriendsId: listFriendsId.listFriendsId, offset, limit });
        return res.data.posts;
      }
    } catch (err) {
      return thunkApi.rejectWithValue(err.response?.data);
    }
    return null;
  },
);

const newFeedReducer = createSlice({
  name: 'newfeed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNewFeedAsync.pending, (state) => {
      state.posts = [];
      state.loading = true;
    });
    builder.addCase(getNewFeedAsync.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loading = false;
    });
    builder.addCase(getNewFeedAsync.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const getNewFeedSelector = createSelector((state) => ({
  posts: state.newfeed.posts,
  loading: state.newfeed.loading,
  error: state.newfeed.error,
}), (state) => state);

export default newFeedReducer.reducer;
