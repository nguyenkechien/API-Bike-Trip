const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
const jwt      = require("jsonwebtoken");
const Joi      = require("joi");
const config   = require("../../config");
// Creat Schame anh model

const users = new Schema({
  fullname: {
    type: String
  },
  user_name: {
    type     : String,
    required : true,
    minlength: 3,
    maxlength: 50,
    unique   : true
  },
  password: {
    type     : String,
    required : true,
    minlength: 3,
    maxlength: 255
  },
  email: {
    type     : String,
    required : true,
    minlength: 5,
    maxlength: 255,
    unique   : true
  },
  avatar: {
    type     : String,
    minlength: 1,
    maxlength: 255
  },
  address: {
    type     : String,
    required : true,
    minlength: 1,
    maxlength: 255
  },
  location: {
    type: String
  },
  phone: {
    type     : String,
    minlength: 6,
    maxlength: 11,
    unique   : true
  },
  date: {
    type   : Date,
    default: Date.now
  },
  isAdmin: {
    type    : Boolean,
    required: true
  },
  status: Boolean
});

users.methods.generateAuthToken = function () {
  const _toke = jwt.sign(
    {
      _id      : this._id,
      user_name: this.user_name,
      isAdmin  : this.isAdmin
    },
    config.PRIVATEKEY,
    {
      expiresIn: 60 * 60 * 24  // expires in 24 hours
    }
  );
  return _toke;
};
const usersChar = mongoose.model("users", users);

//function to validate user
function validateUser(user) {
  const schema = {
    fullname : Joi.string(),
    user_name: Joi.string()
      .min(3)
      .max(50)
      .required(),
    password: Joi.string()
      .min(3)
      .max(255)
      .required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    phone: Joi.string()
      .min(6)
      .max(11)
      .required(),
    avatar  : Joi.string(),
    address : Joi.string(),
    location: Joi.string(),
    isAdmin : Joi.boolean().required(),
    status  : Joi.boolean()
  };

  return Joi.validate(user, schema);
}

function validateLoginUser(user) {
  const schema = {
    user_name: Joi.string()
      .min(3)
      .max(50)
      .required(),
    password: Joi.string()
      .min(3)
      .max(255)
      .required()
  };

  return Joi.validate(user, schema);
}

module.exports = {
  usersChar,
  validateUser,
  validateLoginUser
};
