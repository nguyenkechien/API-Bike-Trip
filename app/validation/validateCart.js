const Joi = require("joi");

const cartType = {
  user: {},
  products: [],
  total_money: Number,
  discount_code: String,
  visaCard: {},
  order_date: Date,
  status: Boolean
}

/**
 *
 * @param {cartType} data
 * @return
 */
const validateCart = data => {
  const visaCardSchema = Joi.object().keys({
    cvv         : Joi.number().max(3).min(3),
    name_on_card: Joi.string(),
    card_number : Joi.number(),
    expiry_date : Joi.string()
  });

  const schema = {
    user         : Joi.object(),
    products     : Joi.array(),
    total_money  : Joi.number(),
    discount_code: Joi.string(),
    visaCard     : visaCardSchema,
    status       : Joi.boolean().required()
  };

  return Joi.validate(data, schema);
};
module.exports = validateCart;