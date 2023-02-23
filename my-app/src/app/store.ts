import { configureStore, ThunkAction, Action, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import updateUserReducer from '../features/userUpdates/userUpdatesSlice';
import completedReducer from '../features/getCompleted/completedSlice';
import calendarReducer from '../features/calendar/calendarSlice';
import programsReducer from '../features/programs/programsSlice';
import { exercisesAPI } from '../features/exercises/exercisesService';

const rootReducer = combineReducers({
  auth: authReducer,
  updateUser: updateUserReducer,
  completed: completedReducer,
  calendar: calendarReducer,
  programs: programsReducer,
  [exercisesAPI.reducerPath]: exercisesAPI.reducer
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(exercisesAPI.middleware)
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
