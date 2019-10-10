const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creat Schame anh model

const products = new Schema({
    name : String,
    price: Number,
    sale_price : Number,
    image : String,
    descrition: String,
    QR_code: String,
    catalog: String,
    status: String,
    color: String,
})

const productsChar = mongoose.model('products' , products);

module.exports = productsChar;