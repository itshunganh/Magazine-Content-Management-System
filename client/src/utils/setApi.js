import axios from 'axios'
import store from '../store'
import { LOGOUT } from '../actions/types'

// Create an instance of axios
const api = axios.create({
    baseURL: '/',
    headers: {
        'Content-Type': 'application/json'
    }
})

// Log the user out if the token has expired
api.interceptors.response.use(
    (res) => res,
    (err) => {
        if (err.response.status === 401) {
            store.dispatch({ type: LOGOUT })
        }
        return Promise.reject(err)
    }
)

export default api
