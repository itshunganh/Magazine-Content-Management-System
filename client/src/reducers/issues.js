import { ISSUES, ISSUES_ERROR } from '../actions/types'

const initialState = {
    issues: [],
    error: {}
}

function issuesReducer(state = initialState, action) {
    const { type, payload } = action

    switch (type) {
        case ISSUES:
            return {
                ...state,
                issues: payload
            }
        case ISSUES_ERROR:
            return {
                ...state,
                issues: [],
                error: payload
            }
        default:
            return state
    }
}

export default issuesReducer
