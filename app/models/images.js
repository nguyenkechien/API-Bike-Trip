const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

// Creat Schame anh model

const images = new Schema({
  nameImage: { type: String, required: true, unique: true },
  altImage : { type: String, },
  urlImage : { type: String },
});

const imagesChar = mongoose.model("images", images);

module.exports = imagesChar;
