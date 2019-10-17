const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creat Schame anh model
const contacts = new Schema({
    id: String,
    name : String,
    email: String,
    content: String,
})

const contactsChar = mongoose.model('contacts' , contacts);

module.exports = contactsChar;