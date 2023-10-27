import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { PostEntity } from '../../entities/Post.entities';
import { getAllPosts } from '../../services/post.services';
import { isAuthenticated } from '../../utils/isAuthenticated';

export interface PostType {
  posts: PostEntity[],
  loading: boolean,
}
const initialState: PostType = {
  posts: [],
  loading: false,
};

export const getAllPostsAsync = createAsyncThunk(
  'post/getPosts',
  async (_, thunkApi) => {
    try {
      if (isAuthenticated()) {
        const response = await getAllPosts();
        return response.data.post;
      }
    } catch (err) {
      return thunkApi.rejectWithValue(err.response?.data);
    }
    return null;
  },
);

const postsReducer = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllPostsAsync.pending, (state) => {
      state.posts = [];
      state.loading = true;
    });
    builder.addCase(getAllPostsAsync.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loading = false;
    });
    builder.addCase(getAllPostsAsync.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const getPostSelector = createSelector((state) => ({
  posts: state.posts.posts,
  loading: state.posts.loading,
  error: state.posts.error,
}), (state) => state);

export default postsReducer.reducer;
