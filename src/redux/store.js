import { configureStore } from '@reduxjs/toolkit';
import { testReducer } from './slices/testSlices';
import { userReducer } from './slices/userSlices';
import { applicationsReducer } from './slices/employeeSlices';

export const store = configureStore({
  reducer: {
    "test": testReducer,
    "user" : userReducer,
    "applications" : applicationsReducer
  },
}); 
