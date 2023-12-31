import { configureStore } from '@reduxjs/toolkit';
import userProfileReducer from './reducers/userProfileReducer';
import postsReducer from './reducers/postsReducer';
import newFeedReducer from './reducers/newFeedReducer';
import userReducer from './reducers/userReducer';

const store = configureStore({
  reducer: {
    profile: userProfileReducer,
    newfeed: newFeedReducer,
    posts: postsReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
