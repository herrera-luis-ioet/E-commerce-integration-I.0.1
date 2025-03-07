import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';
import filterReducer from './slices/filterSlice';

// PUBLIC_INTERFACE
/**
 * Redux store configuration using Redux Toolkit
 */
export const store = configureStore({
  reducer: {
    products: productReducer,
    filters: filterReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;