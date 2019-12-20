const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

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


const catalogChar = mongoose.model("catalogs", catalogs);

module.exports = catalogChar;
