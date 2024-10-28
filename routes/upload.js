const express = require('express')
const router = express.Router()
const axios = require('axios')

// Access service strings
const ID = 'https://epsservices-file.azurewebsites.net/GetPartialUploadId/'
const PARTIAL = 'https://epsservices-file.azurewebsites.net/PartialUpload/'
const CLOSE = 'https://epsservices-file.azurewebsites.net/CloseUpload/'
const DELETE = 'https://epsservices-file.azurewebsites.net/FileAttachment/'

// Multi-layer request to File Service for file upload
router.post('/save', async (req, res) => {
    try {
        if (res.statusCode === 200) {
            await axios.post(`${ID}`, req.body.file).then((resTwo) => {
                if (resTwo.data.success === true && resTwo.data.uploadId) {
                    const bodyTwo = {
                        UniqueUploadId: resTwo.data.uploadId,
                        BatchNumber: 0,
                        Bytes: req.body.byte.ByteArr
                    }

                    axios.post(`${PARTIAL}`, bodyTwo).then((resThree) => {
                        if (resThree.data.success === true) {
                            const bodyThree = {
                                BatchId: resTwo.data.uploadId
                            }

                            axios.post(`${CLOSE}`, bodyThree).then((resFour) => {
                                if (resFour.data.success === true) {
                                    return res.json(resFour.data)
                                } else {
                                    res.status(404).json({ errors: [{ msg: 'Error In Stage 3 - CloseUpload' }] })
                                }
                            })
                        } else {
                            res.status(404).json({ errors: [{ msg: 'Error In Stage 2 - PartialUpload' }] })
                        }
                    })
                } else {
                    res.status(404).json({ errors: [{ msg: 'Error In Stage 1 - GetPartialUploadId' }] })
                }
            })
        }
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ errors: [{ msg: 'Unable To Upload...' }] })
    }
})

// Delete file attachments
router.delete('/delete', async (req, res) => {
    try {
        const data = req.body
        await axios.delete(`${DELETE}`, { data }).then((resTwo) => {
            return res.json(resTwo.data)
        })
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ errors: [{ msg: 'Unable To Remove File...' }] })
    }
})

module.exports = router
