import { configureStore } from '@reduxjs/toolkit';
import userProfileReducer from './reducers/userProfileReducer';

const store = configureStore({
  reducer: {
    profile: userProfileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
