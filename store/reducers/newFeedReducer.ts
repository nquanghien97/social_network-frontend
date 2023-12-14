import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { FeedEntity } from '../../entities/Post.entities';
import { getNewFeed } from '../../services/post.services';
import { isAuthenticated } from '../../utils/isAuthenticated';
import { getFriendsId } from '@/services/friend.services';

export interface PostType {
  deletedPost?: FeedEntity,
  posts: FeedEntity[],
  loading: boolean,
}
const initialState: PostType = {
  deletedPost: undefined,
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
  reducers: {
    setPosts(state, action: { type: string, payload: FeedEntity[] }) {
      state.posts = action.payload;
    },
    deletedPost(state, action: { type: string, payload: FeedEntity }) {
      state.deletedPost = action.payload;
    },
  },
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
  deletedPost: state.newfeed.deletedPost,
  loading: state.newfeed.loading,
  error: state.newfeed.error,
}), (state) => state);

export const { setPosts, deletedPost } = newFeedReducer.actions;

export default newFeedReducer.reducer;
