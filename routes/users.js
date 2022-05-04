const express = require('express')
const router = express.Router()

const USERS = require('../models/BasicUser')

router.get('/', async (req, res) => {
    try {
        const users = await findFirstOrDefault(req.query.id)
        res.json(users)
    } catch (error) {
        res.redirect('/')
    }
})

router.get('/new', (req, res) => {
    res.send('Create new user')
})

async function findFirstOrDefault(id) {
    if (id) return await USERS.findById(id) 
    return await USERS.find({})
}

module.exports = router