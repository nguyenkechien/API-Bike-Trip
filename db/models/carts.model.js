const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creat Schame anh model
const productsSchema = new Schema({
    name_product: String,
    amount: Number,
    price: String,
    color: String
});

const carts = new Schema({
    id: String,
    user_name : String,
    total_money: String,
    discount_code : String,
    cvv: String,
    name_on_card: String,
    card_number: String,
    expiry_date: String,
    status: String,
    products : [productsSchema],
})

const cartsChar = mongoose.model('carts' , carts);

module.exports = cartsChar;