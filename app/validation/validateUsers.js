const Joi = require("joi");

//function to validate user
function validateUserRegistration(user) {
  const schema = {
    fullname: Joi.string(),
    user_name: Joi.string()
      .min(3)
      .max(50)
      .required(),
    password: Joi.string()
      .min(3)
      .max(255)
      .required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    phone: Joi.string()
      .min(6)
      .max(11)
      .required(),
    avatar: Joi.string(),
    address: Joi.string().required(),
    location: Joi.string(),
    isAdmin: Joi.boolean().required(),
    status: Joi.boolean()
  };

  return Joi.validate(user, schema, { abortEarly: false });
}

function validateUserLogin(user) {
  const schema = {
    user_name: Joi.string()
      .min(3)
      .max(50)
      .required(),
    password: Joi.string()
      .min(3)
      .max(255)
      .required(),
    remember: Joi.boolean()
  };

  return Joi.validate(user, schema);
}

module.exports = {
  validateUserRegistration,
  validateUserLogin
};