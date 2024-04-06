import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './reducers/postsReducer';
import newFeedReducer from './reducers/newFeedReducer';

const store = configureStore({
  reducer: {
    newfeed: newFeedReducer,
    posts: postsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
