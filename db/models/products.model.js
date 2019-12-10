const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

// Creat Schame anh model
const gallerySchema = new Schema({
  _id: String,
  img: String,
  alt: String
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
  color: String
});

const productsChar = mongoose.model("products", products);

const validateProducts = data => {
    const gallerySchema = Joi.object().keys({
        img: Joi.string(),
        alt: Joi.string()
      })
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
    color: Joi.string()
  };

  return Joi.validate(data, schema);
};

module.exports = { productsChar, validateProducts };
