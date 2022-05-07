const mongoose = require('mongoose');

// Schema
const Schema = mongoose.Schema;
const user = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    hobbies: {
        type: String,
        required: false
    },
    date_of_birth: {
        type: Date,
        required: true
    }
})


// Model
module.exports = mongoose.model('users', user)