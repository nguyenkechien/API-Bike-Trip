const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Creat Schame anh model

const image = new Schema({
  nameImage: { type: String, required: true, unique: true },
  altImage: { type: String, },
  urlImage: { type: String },
});

const imagesChar = mongoose.model("image", image);

module.exports = imagesChar;
