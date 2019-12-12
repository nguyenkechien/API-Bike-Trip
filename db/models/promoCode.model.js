const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

// Creat Schame anh model
const promoCode = new Schema({
  codeName: {
    type: String,
    minlength: 1,
    maxlength: 255,
    unique: true
  },
  expirationDate: {
    type: Date,
    required: true
  },
  percentOff: {
    type: Number,
    default: 10
  }
});

const promoCodesChar = mongoose.model("promoCode", promoCode);

const validatePromoCode = data => {
  const schema = {
    codeName: Joi.string()
      .min(1)
      .max(255),
    expirationDate: Joi.string().required(),
    percentOff: Joi.string()
  };

  return Joi.validate(data, schema);
};

module.exports = {
  promoCodesChar,
  validatePromoCode
};
