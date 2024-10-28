const jwt = require('jsonwebtoken')

// Access JWT secret
const SECRET = 'NcTqF8Rth6yyHsPe2uUwlb3NXjspA35poxzb7GEiVj9mSLwRTfzLp8JvAJjldedm'

const generateToken = (user) => {
    return jwt.sign(user, SECRET, { expiresIn: '30d' })
}

module.exports = generateToken
