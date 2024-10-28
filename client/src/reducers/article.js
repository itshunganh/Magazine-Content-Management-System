import { ARTICLE_ADD, ARTICLE_EDIT, ARTICLE_ERROR, ARTICLE_SAVE } from '../actions/types'

const initialState = {
    article: null,
    error: {},
    save: null
}

function articleReducer(state = initialState, action) {
    const { type, payload } = action

    switch (type) {
        case ARTICLE_ADD:
            return {
                ...state,
                article: payload
            }
        case ARTICLE_EDIT:
            return {
                ...state,
                article: payload
            }
        case ARTICLE_ERROR:
            return {
                ...state,
                article: null,
                error: payload
            }
        case ARTICLE_SAVE:
            return {
                ...state,
                save: payload
            }
        default:
            return state
    }
}

export default articleReducer
