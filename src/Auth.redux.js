export const LOGIN = 'LOGIN'
export const LOGIN_OUT = 'LOGIN_OUT'

export function login(state={isAuth: false, username: '李云龙'}, action) {
    switch (action.type) {
        case LOGIN:
            return {...state, isAuth: true}
        case LOGIN_OUT:
            return {...state, isAuth: false}
        default:
            return state
    }
}

export function loginIn() {
    return {
        type: LOGIN
    }
}

export function loginOut() {
    return {
        type: LOGIN_OUT
    }
}