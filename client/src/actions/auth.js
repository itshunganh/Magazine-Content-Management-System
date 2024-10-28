import api from '../utils/setApi'
import { setAlert } from './alert'
import { LOGIN_SUCCESS, LOGIN_ERROR, LOGIN, LOGOUT } from './types'

// Login
export const login = () => async (dispatch) => {
    try {
        const res = await api.get('/auth')

        dispatch({
            type: LOGIN,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: LOGIN_ERROR
        })
    }
}

// Login User
export const loginUser = (Email, PasswordUnencrypted, Source) => async (dispatch) => {
    const body = { Email, PasswordUnencrypted, Source }

    try {
        const res = await api.post('/auth', body)

        if (res.status === 200) {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
            dispatch(setAlert('Login Successful', 'success'))
            dispatch(login())
        }
    } catch (err) {
        const errors = err.response.data.errors

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
        }

        dispatch({
            type: LOGIN_ERROR
        })
    }
}

// Logout
export const logout = () => ({ type: LOGOUT })
