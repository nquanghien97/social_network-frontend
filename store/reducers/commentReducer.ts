import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { FeedEntity } from '../../entities/Post.entities';
import { getAllPosts } from '../../services/post.services';
import { isAuthenticated } from '../../utils/isAuthenticated';

export interface CommentType {
  posts: FeedEntity[],
  loading: boolean,
}
const initialState: CommentType = {
  posts: [],
  loading: false,
};

export const getAllCommentsAsync = createAsyncThunk(
  'comment/getComments',
  async (_, thunkApi) => {
    try {
      if (isAuthenticated()) {
        const response = await getComment();
        return response.data.post;
      }
    } catch (err) {
      return thunkApi.rejectWithValue(err.response?.data);
    }
    return null;
  },
);

const commentsReducer = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCommentsAsync.pending, (state) => {
      state.posts = [];
      state.loading = true;
    });
    builder.addCase(getAllCommentsAsync.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loading = false;
    });
    builder.addCase(getAllCommentsAsync.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const getCommentSelector = createSelector((state) => ({
  posts: state.comment.comments,
  loading: state.comment.loading,
  error: state.comment.error,
}), (state) => state);

export default commentsReducer.reducer;
