import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import updateUserReducer from '../features/userUpdates/userUpdatesSlice';
import completedReducer from '../features/getCompleted/completedSlice';
import calendarReducer from '../features/calendar/calendarSlice';
import programsReducer from '../features/programs/programsSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  updateUser: updateUserReducer,
  completed: completedReducer,
  calendar: calendarReducer,
  programs: programsReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
} 

export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
