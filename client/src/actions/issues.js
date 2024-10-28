import axios from 'axios'
import { ISSUES, ISSUES_ERROR } from './types'

// Get all issues
export const getIssues = () => async (dispatch) => {
    try {
        const res = await axios.get('https://epsservices-magazine.azurewebsites.net/AllIssues/')
        const data = await res.data.issues
        dispatch({
            type: ISSUES,
            payload: data
        })
    } catch (err) {
        dispatch({
            type: ISSUES_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}
