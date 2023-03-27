import { LOGIN_REGISTERLOGIN } from "../../types/loginType";

const initialState = {
  loggedUser: ""
};

const registerLogin = (state, action) => {
  return {
    ...state,
    loggedUser: action.payload,
  };
};

export default function loginReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_REGISTERLOGIN: {
      return registerLogin(state, action);
    }
    default:
      return state;
  }
}
