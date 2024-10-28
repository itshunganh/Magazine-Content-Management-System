import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import setAuthToken from './utils/setAuthToken'

const initialState = {}

const middleware = [thunk]

const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

let currState = store.getState()

store.subscribe(() => {
    let prevState = currState
    currState = store.getState()
    // If the token changes then set the value in local storage and axios headers
    if (prevState.auth.token !== currState.auth.token) {
        const token = currState.auth.token
        setAuthToken(token)
    }
})

export default store
