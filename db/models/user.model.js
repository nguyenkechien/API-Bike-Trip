const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creat Schame anh model

const users = new Schema({
    id: String,
    name : String,
    user_name: String,
    password : String,
    avata : String,
    address: String,
    location: String,
    phone: Number,
    status: String,
    _toke: String,
})

const usersChar = mongoose.model('users' , users);

module.exports = usersChar;