const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creat Schame anh model
const gallerySchema = new Schema({
    img: String,
    alt: String
});

const products = new Schema({
    id: String,
    name : String,
    price: Number,
    sale_price : Number,
    image : String,
    gallerys : [gallerySchema],
    descrition: String,
    QR_code: String,
    catalog: String,
    status: String,
    color: String,
})

const productsChar = mongoose.model('products' , products);

module.exports = productsChar;