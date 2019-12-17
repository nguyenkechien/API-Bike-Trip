const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
const Joi      = require("joi");

// Creat Schame anh model

const catalogs = new Schema({
  nameCatalog: {
    type     : String,
    required : true,
    minlength: 2,
    maxlength: 255,
    unique   : true
  },
  descriptionCatalog: {
    type: String
  }
});

const validateCatalog = data => {
  const schema = {
    nameCatalog: Joi.string()
      .required()
      .min(2)
      .max(255),
    descriptionCatalog: Joi.string()
  };

  return Joi.validate(data, schema);
};

const catalogChar = mongoose.model("catalogs", catalogs);

module.exports = {
  catalogChar,
  validateCatalog
};
