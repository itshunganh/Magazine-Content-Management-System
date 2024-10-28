import { combineReducers } from 'redux'
import alert from './alert'
import article from './article'
import auth from './auth'
import author from './author'
import issues from './issues'
import upload from './upload'

export default combineReducers({
    alert,
    article,
    auth,
    author,
    issues,
    upload
})
