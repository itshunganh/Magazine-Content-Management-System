import api from '../utils/setApi'
import { setAlert } from './alert'
import { UPLOAD_ADD, UPLOAD_ERROR, UPLOAD_REMOVE } from './types'

// Upload attachements
export const saveUpload =
    (FileName, FileDescription, FileLength, FileTitle, FileType, FileDate, AttachId, Category, SubCategory, ByteArr) => async (dispatch) => {
        const body = {
            file: { FileName, FileDescription, FileLength, FileTitle, FileType, FileDate, AttachId, Category, SubCategory },
            byte: { ByteArr }
        }
        try {
            const res = await api.post('/upload/save', body)

            if (res.status === 200) {
                dispatch({
                    type: UPLOAD_ADD,
                    payload: res.data
                })
                if (res.data.success === true) {
                    dispatch(setAlert('File Uploaded', 'success'))
                    setTimeout(() => window.location.reload(), 500)
                }
            }
        } catch (err) {
            const errors = err.response.data.errors

            if (errors) {
                errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
            }

            dispatch({
                type: UPLOAD_ERROR
            })
        }
    }

// Delete attachments
export const deleteUpload = (AttachmentId, ProductId) => async (dispatch) => {
    const data = {
        AttachmentId,
        ProductId
    }
    try {
        const res = await api.delete('/upload/delete', { data })

        if (res.status === 200) {
            dispatch({
                type: UPLOAD_REMOVE,
                payload: res.data
            })
            if (res.data.success === true) {
                dispatch(setAlert('File Removed', 'success'))
                setTimeout(() => window.location.reload(), 500)
            }
        }
    } catch (err) {
        const errors = err.response.data.errors

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
        }

        dispatch({
            type: UPLOAD_ERROR
        })
    }
}
