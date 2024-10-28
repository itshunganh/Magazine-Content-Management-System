const express = require('express')
const router = express.Router()
const axios = require('axios')

// Import JWT authentication
const authenticateToken = require('../jwt/authenticateToken')
const generateToken = require('../jwt/generateToken')

// Access service strings
const EMAIL = 'https://epsservices-person.azurewebsites.net/person/SignInByEmail/'
const NAME = 'https://epsservices-person.azurewebsites.net/person/NameIdByAccount/'
const ROLE = 'https://epsservices-person.azurewebsites.net/person/UserAndRoles/'

// Multi-layer request to Person Service for login authentication
router.post('/auth', async (req, res) => {
    try {
        if (res.statusCode === 200) {
            await axios.post(`${EMAIL}`, req.body).then((resTwo) => {
                if (resTwo.data.success === true && resTwo.data.loginSuccessful === true) {
                    axios.get(`${NAME}?AccountId=${resTwo.data.userId}`).then((resThree) => {
                        if (resThree.data.success === true) {
                            axios.get(`${ROLE}${resThree.data.nameId}?roleName=Magazine%20Production`).then((resFour) => {
                                if (resFour.data.success === true) {
                                    resFour.data.roles.forEach((role) => {
                                        if (role.roleName === 'Magazine Production') {
                                            const user = { id: role.id }
                                            const token = generateToken(user)
                                            return res.json({ token: token })
                                        }
                                    })
                                }
                            })
                        }
                    })
                } else {
                    res.status(401).json({ errors: [{ msg: 'Invalid Credentials...' }] })
                }
            })
        }
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ errors: [{ msg: 'Something Went Wrong...' }] })
    }
})

// Get authenticated state
router.get('/auth', authenticateToken, async (req, res) => {
    try {
        if (res.statusCode === 200) return res.json()
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ errors: [{ msg: 'Something Went Wrong...' }] })
    }
})

module.exports = router
