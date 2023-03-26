import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './redux/slices/login/loginSlice'

// Automatically adds the thunk middleware and the Redux DevTools extension
export const store = configureStore({
    // Automatically calls `combineReducers`
    reducer: {
      logins: loginReducer,
    }
  })