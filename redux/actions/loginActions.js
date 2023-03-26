import { LOGIN_REGISTERLOGIN } from "../types/loginType";

function registerLogin() {
    return {
        type: LOGIN_REGISTERLOGIN
    }
}

const actionCreators = {
    registerLogin
}

export { actionCreators }