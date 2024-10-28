const express = require('express')
const router = express.Router()

// All issues selection page
router.get('/', async (req, res) => {
    try {
        if (res.statusCode === 200) return res.json()
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ errors: [{ msg: 'Something Went Wrong...' }] })
    }
})

// Specific issue page
router.get('/:id', async (req, res) => {
    try {
        if (res.statusCode === 200) return res.json()
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ errors: [{ msg: 'Something Went Wrong...' }] })
    }
})

module.exports = router
