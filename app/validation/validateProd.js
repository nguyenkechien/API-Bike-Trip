const Joi = require("joi");

const validateProducts = data => {

  const specificationsSchema = Joi.object().keys({
    inches    : Joi.number(),
    knile     : Joi.number(),
    speed     : Joi.number(),
    seatPost  : Joi.string(),
    fork      : Joi.string(),
    gear      : Joi.string(),
    deraill   : Joi.string(),
    chainwheel: Joi.string(),
    brakes    : Joi.string(),
    tires     : Joi.string(),
    handlebar : Joi.string()
  });

  const schema = {
    name      : Joi.string(),
    price     : Joi.number(),
    sale_price: Joi.number(),
    image     : Joi.string(),
    gallerys  : Joi.array(),
    descrition: Joi.array(),
    qr_code   : Joi.string(),
    catalog   : Joi.string(),
    show_home : Joi.boolean(),
    status    : Joi.boolean(),
    color     : Joi.string(),
    param     : specificationsSchema
  };

  return Joi.validate(data, schema, { abortEarly: false });
};

module.exports = validateProducts;