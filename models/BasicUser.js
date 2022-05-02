const mongoose = require('mongoose');

// Schema
const Schema = mongoose.Schema;

// Model
module.exports = mongoose.model('users', new Schema({
    name: String,
    age: Number,
    hobbies: String,
    date_of_birth: Date
}))