const express = require('express')
const router = express.Router()
const BasicUser = require('../models/BasicUser')

router
    .get('/', async (req, res) => {
        try {
            const users = await BasicUser.find({})
            res.json(users)
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    })
    .get('/:id', findUser, async (req, res) => {
        try {
            res.json(res.user)
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    })
    .patch('/:id',  findUser, async (req, res) => {
        if (req.body.name) res.user.name = req.body.name
        if (req.body.age) res.user.age = req.body.age
        if (req.body.hobbies) res.user.hobbies = req.body.hobbies
        if (req.body.date_of_birth) res.user.date_of_birth = req.body.date_of_birth

        try {
            await res.user.save()
            res.json({ message: `user updated` })
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    })
    .delete('/:id', findUser, async (req, res) => {
        try {
            await res.user.remove()
            res.json({ message: 'User deleted' })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    })
    .post('/create', async (req, res) => {
        try {
            let user = new BasicUser(req.body)
            await user.save()
            res.json({ message: 'You have successfully created a new user' })
        } catch (error) {
            return res.status(400).json({ message: error.message })
        }
    })

async function findUser(req, res, next) {
    let user

    try {
        user = await BasicUser.findById(req.params.id) 
        if (!user) return res.status(404).json({ message: "cannot find user"})
    } catch (error) {
        return res.status(500).json({ message: `Internal server error. ${error.message}` })
    }

    res.user = user
    next()
}

module.exports = router