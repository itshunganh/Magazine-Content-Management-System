import api from '../utils/setApi'
import { setAlert } from './alert'
import { ARTICLE_ADD, ARTICLE_EDIT, ARTICLE_ERROR, ARTICLE_SAVE } from './types'

// Get new article by article id
export const addArticle = (id) => async (dispatch) => {
    try {
        const res = await api.get(`/article/add/${id}`)

        dispatch({
            type: ARTICLE_ADD,
            payload: res.data
        })
    } catch (err) {
        const errors = err.response.data.errors

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'dark')))
        }

        dispatch({
            type: ARTICLE_ERROR
        })
    }
}

// Get editable article by article id
export const editArticle = (id) => async (dispatch) => {
    try {
        const res = await api.get(`/article/edit/${id}`)

        dispatch({
            type: ARTICLE_EDIT,
            payload: res.data
        })
    } catch (err) {
        const errors = err.response.data.errors

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'dark')))
        }

        dispatch({
            type: ARTICLE_ERROR
        })
    }
}

// Save editable article by article details
export const saveArticle =
    (IssueId, Id, Title, QuickId, XmlBody, Abstract, AuthorNameId, AuthorNameId2, AuthorNameId3, AuthorNameId4, CoverType, Optional, Categories) =>
    async (dispatch) => {
        const body = {
            IssueId,
            Id,
            Title,
            QuickId,
            XmlBody,
            Abstract,
            AuthorNameId,
            AuthorNameId2,
            AuthorNameId3,
            AuthorNameId4,
            CoverType,
            Optional,
            Categories
        }

        try {
            const res = await api.post('/article/save', body)

            if (res.status === 200) {
                dispatch({
                    type: ARTICLE_SAVE,
                    payload: res.data
                })
                dispatch(setAlert('Article Saved', 'success'))
                setTimeout(() => window.location.reload(), 500)
            }
        } catch (err) {
            const errors = err.response.data.errors

            if (errors) {
                errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
            }

            dispatch({
                type: ARTICLE_ERROR
            })
        }
    }
