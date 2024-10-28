import { AUTHOR_ADD, AUTHOR_ERROR } from '../actions/types'

const initialState = {
    author: [],
    error: {}
}

function authorReducer(state = initialState, action) {
    const { type, payload } = action

    switch (type) {
        case AUTHOR_ADD:
            return {
                ...state,
                author: payload
            }
        case AUTHOR_ERROR:
            return {
                ...state,
                author: [],
                error: payload
            }
        default:
            return state
    }
}

export default authorReducer
