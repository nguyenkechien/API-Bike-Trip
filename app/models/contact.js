const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

// Creat Schame anh model
const contacts = new Schema({
  name: {
    type     : String,
    minlength: 1,
    maxlength: 255
  },
  email: {
    type     : String,
    required : true,
    minlength: 5,
    maxlength: 255
  },
  content: {
    type   : String,
    default: null
  }
});

const contactsChar = mongoose.model("contacts", contacts);


module.exports = contactsChar;
