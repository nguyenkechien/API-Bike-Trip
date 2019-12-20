const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// Creat Schame anh model
const specificationsSchema = new Schema({
  inches: {
    type: Number,
    default: ''
  },
  knile: {
    type: Number,
    default: ''
  },
  speed: {
    type: Number,
    default: ''
  },
  seatPost: {
    type: String,
    default: ''
  },
  fork: {
    type: String,
    default: ''
  },
  gear: {
    type: String,
    default: ''
  },
  deraill: {
    type: String,
    default: ''
  },
  chainwheel: {
    type: String,
    default: ''
  },
  brakes: {
    type: String,
    default: ''
  },
  tires: {
    type: String,
    default: ''
  },
  handlebar: {
    type: String,
    default: ''
  },
});

const products = new Schema({
  name: {
    type: String,
  },
  price: {
    type: Number,
    default: 0,
    required: true
  },
  sale_price: {
    type: Number,
    default: 0,
    required: true
  },
  image: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'images'
  },
  gallerys: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'images'
    }
  ],
  descrition: {
    type: Array,
    default: []
  },
  qr_code: {
    type: String,
    default: '',
  },
  catalog: {
    type: Schema.Types.ObjectId,
    ref: 'catalogs'
  },
  show_home: {
    type: Boolean,
    default: false,
    required: true
  },
  status: {
    type: Boolean,
    default: false,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  param: specificationsSchema
});

const productsChar = mongoose.model("products", products);


module.exports = productsChar;
