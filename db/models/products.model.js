const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Creat Schame anh model
const gallerySchema = new Schema({
    img: String,
    alt: String
});
let i = 0;
const products = new Schema({
    // index: ObjectId('a'),
    name : String,
    price: Number,
    sale_price : Number,
    image : String,
    gallerys : [gallerySchema],
    descrition: String,
    QR_code: String,
    catalog: String,
    hot: Boolean,
    status: Boolean,
    color: String,
})

const productsChar = mongoose.model('products' , products);

module.exports = productsChar;