const jwt = require('jsonwebtoken')

// Access JWT secret
const SECRET = 'NcTqF8Rth6yyHsPe2uUwlb3NXjspA35poxzb7GEiVj9mSLwRTfzLp8JvAJjldedm'

// Authenticate JWT
const authenticateToken = (req, res, next) => {
    // Get token from header
    const token = req.header('x-auth-token')

    // Check if not token
    if (!token) {
        return res.status(401).json({ errors: [{ msg: 'No token, authorization denied!' }] })
    }

    // Verify token
    try {
        jwt.verify(token, SECRET, (error, decoded) => {
            if (error) {
                return res.status(401).json({ errors: [{ msg: 'Token is not valid!' }] })
            } else {
                req.user = decoded.user
                next()
            }
        })
    } catch (err) {
        console.error('Authentication Error')
        res.status(500).json({ errors: [{ msg: 'Something Went Wrong...' }] })
    }
}

module.exports = authenticateToken
