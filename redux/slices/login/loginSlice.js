import { LOGIN_REGISTERLOGIN } from "../../types/loginType"

const initialState = {
    loggedUser: ''
  }
  
  export default function loginReducer(state = initialState, action) {
    switch (action.type) {
      case LOGIN_REGISTERLOGIN: {
        console.log('slice.... ', state, action)
        return {
          // Again, one less level of nesting to copy
          ...state,
          loggedUser: action.payload
        }
      }
      default:
        return state
    }
  }