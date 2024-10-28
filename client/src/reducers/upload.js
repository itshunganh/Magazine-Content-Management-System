import { UPLOAD_ADD, UPLOAD_ERROR, UPLOAD_REMOVE } from '../actions/types'

const initialState = {
    error: {},
    upload: null,
    delete: null
}

function uploadReducer(state = initialState, action) {
    const { type, payload } = action

    switch (type) {
        case UPLOAD_ADD:
            return {
                ...state,
                upload: payload
            }
        case UPLOAD_ERROR:
            return {
                ...state,
                upload: null,
                error: payload
            }
        case UPLOAD_REMOVE:
            return {
                ...state,
                delete: payload
            }
        default:
            return state
    }
}

export default uploadReducer
