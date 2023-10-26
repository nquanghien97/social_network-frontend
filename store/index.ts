import { configureStore } from '@reduxjs/toolkit';
import userProfileReducer from './reducers/userProfileReducer';
import postsReducer from './reducers/postsReducer';

const store = configureStore({
  reducer: {
    profile: userProfileReducer,
    posts: postsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
