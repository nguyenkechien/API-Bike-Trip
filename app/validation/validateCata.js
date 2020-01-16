const Joi = require("joi");

const validateCatalog = data => {
  const schema = {
    nameCatalog: Joi.string()
      .required()
      .min(2)
      .max(255),
    descriptionCatalog: Joi.string()
  };

  return Joi.validate(data, schema, { abortEarly: false });
};

module.exports = validateCatalog;