import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { PostEntity } from '../../entities/Post.entities';
import { getAllPosts } from '@/services/post.services';

export interface PostType {
  posts: PostEntity[],
  loading: boolean,
  error: string,
}
const initialState: PostType = {
  posts: [],
  loading: false,
  error: '',
};

export const getAllPostsAsync = createAsyncThunk(
  'post/getPosts',
  async (_, thunkApi) => {
    try {
      const response = await getAllPosts();
      return response.data.post;
    } catch (err) {
      return thunkApi.rejectWithValue(err.response?.data);
    }
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
    builder.addCase(getAllPostsAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || '';
    });
  },
});

export const getPostSelector = createSelector((state) => ({
  posts: state.posts.posts,
  loading: state.posts.loading,
  error: state.posts.error,
}), (state) => state);

export default postsReducer.reducer;
