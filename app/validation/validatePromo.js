const Joi = require("joi");

const validatePromoCode = data => {
  const schema = {
    codeName      : Joi.string().min(1).max(255),
    expirationDate: Joi.string().required(),
    percentOff    : Joi.string()
  };

  return Joi.validate(data, schema, { abortEarly: false });
};
module.exports = validatePromoCode;