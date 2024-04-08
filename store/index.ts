import { configureStore } from '@reduxjs/toolkit';
import newFeedReducer from './reducers/newFeedReducer';

const store = configureStore({
  reducer: {
    newfeed: newFeedReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
