const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Creat Schame anh model
const productsSchema = new Schema({
  name_product: String,
  amount: Number,
  price: String,
  color: String
});
const userSchema = new Schema({
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
    maxlength: 11,
    unique: true
  }
});

const carts = new Schema({
  id: String,
  user: [userSchema],
  total_money: String,
  discount_code: String,
  cvv: String,
  name_on_card: String,
  card_number: String,
  expiry_date: String,
  status: String,
  products: [productsSchema]
});

const cartsChar = mongoose.model("carts", carts);

module.exports = cartsChar;
