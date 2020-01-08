const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

// Creat Schame anh model
const promoCode = new Schema({
  codeName: {
    type     : String,
    minlength: 1,
    maxlength: 255,
    unique   : true
  },
  expirationDate: {
    type    : Date,
    required: true
  },
  percentOff: {
    type   : Number,
    default: 0
  },
  number_of_entries: {
    type: Number,
    default: 0
  },
  days_added: {
    type: Date,
    default: Date.now
  }
});

const promoCodesChar = mongoose.model("promoCode", promoCode);



module.exports = promoCodesChar;
