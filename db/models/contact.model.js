const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

// Creat Schame anh model
const contacts = new Schema({
  name: {
    type: String,
    minlength: 1,
    maxlength: 255
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
  },
  content: {
    type: String,
    default: null
  }
});

const contactsChar = mongoose.model("contacts", contacts);

const validateContacts = data => {
  const schema = {
    name: Joi.string()
      .min(1)
      .max(255),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    content: Joi.string()
  };

  return Joi.validate(data, schema);
};

module.exports = {
  contactsChar,
  validateContacts
};
