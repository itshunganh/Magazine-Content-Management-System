// Initialize Express
const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')

// JSON file transfer limit
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }))
app.use(express.json())

// Define Routes
app.use('/article', require('./routes/article'))
app.use('/issue', require('./routes/issue'))
app.use('/upload', require('./routes/upload'))
app.use('/', require('./routes/auth'))

// Production environment
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static(path.join(__dirname, 'build')))
    app.get('/*', function (req, res) {
        res.sendFile(path.join(__dirname, 'build', 'index.html'))
    })
}

// Port define
const PORT = 8080
app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`))
