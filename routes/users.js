const express = require('express')
const router = express.Router()

const USERS = require('../models/BasicUser')

router.get('/', async (req, res) => {
    try {
        const users = await USERS.find({})
        res.json(users)
    } catch (error) {
        res.redirect('/')
    }
})

router.get('/new', (req, res) => {
    res.send('Create new user')
})

module.exports = router