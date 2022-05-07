const express = require('express')
const router = express.Router()
const USERS = require('../models/BasicUser')

router
    .get('/', async (req, res) => {
        try {
            const users = await findFirstOrDefault(req.query.id)
            res.json(users)
        } catch (error) {
            res.redirect('/')
        }
    })
    .post('/create', (req, res) => {
        let data = req.body
        if (!data) return res.status(400).json({ message: `Error! No new user. ${data}` })

        let user = new USERS(data)
        user.save(error => {
            if (data && !error) return res.json({ message: 'You have successfully added a new user' })

            return res.status(500).json({ message: `Error! Internal server error. ${error}` })
        })
    })
    .put('/',  async (req, res) => {
        try {
            let user = await USERS.findByIdAndUpdate(req.query.id, req.body)
            res.json({ message: `update`, user })
        } catch (error) {
            res.status(500).json({ message: `Error! ${error}` })
        }
    })
    .delete('/', async (req, res) => {
        try {
            await USERS.findByIdAndDelete(req.query.id)
            res.json({ message: 'User deleted' })
        } catch (error) {
            res.status(500).json({ message: `Error! could not remove user ${req.query.id}. ${error}` })
        }
    })

async function findFirstOrDefault(id) {
    if (id) return await USERS.findById(id) 
    return await USERS.find({})
}

module.exports = router