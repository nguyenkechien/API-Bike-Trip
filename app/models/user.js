const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
const jwt      = require("jsonwebtoken");
const config   = require("../../config");
// Creat Schame anh model

const users = new Schema({
  fullname: {
    type   : String,
    default: ''
  },
  user_name: {
    type     : String,
    required : true,
    minlength: 3,
    maxlength: 50,
    unique   : true,
    lowercase: true,
  },
  password: {
    type     : String,
    required : true,
    minlength: 3,
    maxlength: 255,
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
    maxlength: 255,
    default  : ''
  },
  address: {
    type     : String,
    required : true,
    minlength: 1,
    maxlength: 255,
    default  : ''
  },
  location: {
    type: String
  },
  phone: {
    type     : String,
    minlength: 6,
    maxlength: 11,
    unique   : true,
    default  : ''
  },
  date: {
    type   : Date,
    default: Date.now
  },
  isAdmin: {
    type    : Boolean,
    required: true,
    default : false
  },
  status: {
    type   : Boolean,
    default: false
  },
});

users.methods.generateAuthToken = function () {
  const today = new Date();
  let   exp   = new Date(today);
  const seft  = this;
  exp.setDate(today.getDate() + 60);


  const _toke = jwt.sign(
    {
      _id      : seft._id,
      user_name: seft.user_name,
      isAdmin  : seft.isAdmin,
    },
    config.PRIVATEKEY,
    {
      expiresIn: '2h'
    }
  );
  return _toke;
};
const usersChar = mongoose.model("users", users);

module.exports = usersChar;
