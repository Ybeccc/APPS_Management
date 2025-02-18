import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice'; // Adjust the path if necessary

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});