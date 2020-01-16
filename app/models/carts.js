const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Creat Schame anh model

const visaCardSchema = new Schema({
  cvv: { type: Number, default: 000 },
  name_on_card: { type: String, default: '' },
  card_number: { type: Number, default: 0 },
  expiry_date: { type: String, default: '' }
});

/**
 * @type {Schema}
 */
const carts = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products'
      },
      quantity: {
        type: Number,
        required: true,
        default: 0
      }
    }
  ],
  total_money: { type: Number, required: true, default: 0 },
  discount_code: { type: String, default: '' },
  delivery_address: {
    address: {
      type: String, default: '', required: true
    },
    city: {
      type: String, default: '', required: true
    },
    state: {
      type: String, default: '', required: true
    },
  },
  visaCard: visaCardSchema,
  order_date: {
    type: Date,
    default: Date.now
  },
  status: { type: Boolean, required: true, default: false }
});

const cartsChar = mongoose.model("carts", carts);


module.exports = cartsChar;
