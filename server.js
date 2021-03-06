if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const bodyParser = require('body-parser')

// import routes
const usersRoutes = require('./routes/users')

// connect to database
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

// use functions
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/users', usersRoutes)

app.listen(process.env.PORT || 8080)