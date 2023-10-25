import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import avatarSlice from './slices/avatarSlice';
import checkInsSlice from './slices/checkInsSlice';
import plansSlice from './slices/plansSlice';
import reviewSlice from './slices/reviewSlice';

export const store = configureStore({
  reducer: {
    checkIns: checkInsSlice,
    plans: plansSlice,
    avatars: avatarSlice,
    review: reviewSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
