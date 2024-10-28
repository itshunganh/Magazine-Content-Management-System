import { ALERT_ADD, ALERT_REMOVE } from '../actions/types'

const initialState = []

function alertReducer(state = initialState, action) {
    const { type, payload } = action

    switch (type) {
        case ALERT_ADD:
            return [...state, payload]
        case ALERT_REMOVE:
            return state.filter((alert) => alert.id !== payload)
        default:
            return state
    }
}

export default alertReducer
