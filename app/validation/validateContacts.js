const Joi = require("joi");

const validateContacts = data => {
  const schema = {
    name: Joi.string()
      .min(1)
      .max(255),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    content: Joi.string()
  };

  return Joi.validate(data, schema, { abortEarly: false });
};
module.exports = validateContacts;