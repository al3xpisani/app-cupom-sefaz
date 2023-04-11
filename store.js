import { configureStore, applyMiddleware } from '@reduxjs/toolkit'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import loginReducer from './redux/slices/login/login.slice'

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))

const getDefaultMiddleware = (getDefaultMiddleware) =>
getDefaultMiddleware({
  serializableCheck: false,
})

export const store = configureStore({
    reducer: {
      logins: loginReducer,
      middleware: [composedEnhancer, getDefaultMiddleware]
    }
  })