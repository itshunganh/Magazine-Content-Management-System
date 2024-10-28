import { LOGIN, LOGIN_ERROR, LOGIN_SUCCESS, LOGOUT } from '../actions/types'

const initialState = {
    error: {},
    isAuthenticated: null,
    loading: true,
    token: localStorage.getItem('token'),
    user: null
}

function authReducer(state = initialState, action) {
    const { type, payload } = action

    switch (type) {
        case LOGIN:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            }
        case LOGIN_ERROR:
            return {
                ...state,
                token: null,
                isAuthenticated: null,
                loading: false,
                error: payload
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            }
        case LOGOUT:
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null
            }
        default:
            return state
    }
}

export default authReducer
