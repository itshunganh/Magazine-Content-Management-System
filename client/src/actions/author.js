import axios from 'axios'
import { AUTHOR_ADD, AUTHOR_ERROR } from './types'

// Get author id by search name
export const getAuthor = (fname, lname) => async (dispatch) => {
    try {
        const res = await axios.get(`https://epsservices-person.azurewebsites.net/person/FindPeople/?FirstName=${fname}&LastName=${lname}`)
        const data = await res.data.people
        dispatch({
            type: AUTHOR_ADD,
            payload: data
        })
    } catch (err) {
        dispatch({
            type: AUTHOR_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}
