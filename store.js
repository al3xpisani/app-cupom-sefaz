import { configureStore, applyMiddleware } from '@reduxjs/toolkit'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import loginReducer from './redux/slices/login/loginSlice'

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))

const getDefaultMiddleware = (getDefaultMiddleware) =>
getDefaultMiddleware({
  serializableCheck: false,
})

// Automatically adds the thunk middleware and the Redux DevTools extension
export const store = configureStore({
    // Automatically calls `combineReducers`
    reducer: {
      logins: loginReducer,
      middleware: [composedEnhancer, getDefaultMiddleware]
    }
  })