import { LOGIN_REGISTERLOGIN } from "../types/loginType";

function registerLogin(login) {
    return {
        type: LOGIN_REGISTERLOGIN,
        payload: login
    }
}

const actionCreators = {
    registerLogin
}

export { actionCreators }