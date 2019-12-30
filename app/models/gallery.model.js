const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

// Creat Schame anh model

const gallery = new Schema({
  nameFile: { type: String, required: true, unique: true },
  altFile : { type: String, },
  urlFile : { type: String },
});

const galleryChar = mongoose.model("gallery", gallery);

module.exports = galleryChar;
