const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

// Creat Schame anh model
const gallerySchema = new Schema({
  _id: String,
  img: String,
  alt: String
});
const specificationsSchema = new Schema({
  _id: String,
  inches: String,
  knile: String,
  speed: String,
  seatPost: String,
  fork: String,
  gear: String,
  deraill: String,
  chainwheel: String,
  brakes: String,
  tires: String,
  handlebar: String
});

const products = new Schema({
  name: String,
  price: Number,
  sale_price: Number,
  image: String,
  gallerys: [gallerySchema],
  descrition: String,
  QR_code: String,
  catalog: String,
  hot: Boolean,
  status: Boolean,
  color: String,
  param: specificationsSchema
});

const productsChar = mongoose.model("products", products);

const validateProducts = data => {
  const gallerySchema = Joi.object().keys({
    img: Joi.string(),
    alt: Joi.string()
  });
  const specificationsSchema = Joi.object().keys({
    inches: Joi.string(),
    knile: Joi.string(),
    speed: Joi.string(),
    seatPost: Joi.string(),
    fork: Joi.string(),
    gear: Joi.string(),
    deraill: Joi.string(),
    chainwheel: Joi.string(),
    brakes: Joi.string(),
    tires: Joi.string(),
    handlebar: Joi.string()
  });
  const schema = {
    name: Joi.string(),
    price: Joi.number(),
    sale_price: Joi.number(),
    image: Joi.string(),
    gallerys: Joi.array().items(gallerySchema),
    descrition: Joi.string(),
    QR_code: Joi.string(),
    catalog: Joi.string(),
    hot: Joi.boolean(),
    status: Joi.boolean(),
    color: Joi.string(),
    param: specificationsSchema
  };

  return Joi.validate(data, schema);
};

module.exports = { productsChar, validateProducts };
