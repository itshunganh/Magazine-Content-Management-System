const express = require('express')
const router = express.Router()
const axios = require('axios')

// Access service strings
const SAVE = 'https://epsservices-magazine.azurewebsites.net/SaveArticle/'

// Get new article by article id
router.get('/add/:id', async (req, res) => {
    try {
        if (res.statusCode === 200) return res.json()
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ errors: [{ msg: 'Something Went Wrong...' }] })
    }
})

// Get editable article by article id
router.get('/edit/:id', async (req, res) => {
    try {
        if (res.statusCode === 200) return res.json()
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ errors: [{ msg: 'Something Went Wrong...' }] })
    }
})

// Save editable article by article details
router.post('/save', async (req, res) => {
    try {
        if (res.statusCode === 200) {
            await axios.post(`${SAVE}`, req.body).then((resTwo) => {
                if (resTwo.data.success === true) return res.json()
            })
        }
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ errors: [{ msg: 'Unable To Save...' }] })
    }
})

// Get author info by first and last name
router.get('/author', async (req, res) => {
    try {
        if (res.statusCode === 200) return res.json()
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ errors: [{ msg: 'Something Went Wrong...' }] })
    }
})

module.exports = router
