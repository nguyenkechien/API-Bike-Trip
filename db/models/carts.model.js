const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

// Creat Schame anh model

const cartType = {
  user: [],
  products: [],
  total_money: {},
  discount_code: {},
  visaCard: [],
  order_date: {},
  status: {}
};

const productsSchema = new Schema({
  _id: String,
  name_product: String,
  quantity: Number,
  price: String,
  color: String,
  catalog: String
});

const userSchema = new Schema({
  _id: String,
  user_name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
  },
  address: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 255
  },
  location: {
    type: String
  },
  phone: {
    type: String,
    minlength: 6,
    maxlength: 11
  }
});

const visaCardSchema = new Schema({
  cvv: String,
  name_on_card: String,
  card_number: String,
  expiry_date: String
});

/**
 * @type {Schema}
 */
const carts = new Schema({
  user: userSchema,
  products: [productsSchema],
  total_money: { type: String },
  discount_code: { type: String },
  visaCard: [visaCardSchema],
  order_date: {
    type: Date,
    default: Date.now
  },
  status: { type: Boolean }
});

const cartsChar = mongoose.model("carts", carts);

/**
 *
 * @param {cartType} data
 * @return
 */
const validateCart = data => {
  const productsSchema = Joi.object().keys({
    name_product: Joi.string(),
    quantity: Joi.string(),
    price: Joi.string(),
    color: Joi.string(),
    catalog: Joi.string()
  });

  const userSchema = Joi.object().keys({
    user_name: Joi.string(),
    email: Joi.string(),
    address: Joi.string(),
    location: Joi.string(),
    phone: Joi.string()
  });

  const visaCardSchema = Joi.object().keys({
    cvv: Joi.string(),
    name_on_card: Joi.string(),
    card_number: Joi.string(),
    expiry_date: Joi.string()
  });

  const schema = {
    user: userSchema,
    products: Joi.array().items(productsSchema),
    total_money: Joi.number(),
    discount_code: Joi.number(),
    visaCard: Joi.array().items(visaCardSchema),
    status: Joi.boolean()
  };

  return Joi.validate(data, schema);
};

module.exports = { cartsChar, validateCart };
