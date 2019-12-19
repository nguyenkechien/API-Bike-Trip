const express     = require('express');
const cartsRoutes = express.Router();
const auth        = require("../middleware/auth.middleware");

// require model cartsController
const cartsController = require('../controllers/carts.controller');

// Defined get data(index or listing) route

cartsRoutes.route('/').get(cartsController.getCarts);

// Defined Store route 
cartsRoutes.route('/content/save').post(cartsController.newCart);

// Defined get edit iddata route
cartsRoutes.route('/content/:id').get(cartsController.getIdData);

//  Defined update route post
cartsRoutes.route('/content/update/:id').post(auth, cartsController.updateData)


// Defined delete route
cartsRoutes.route('/content/delete/:id').get(cartsController.deleteData);

module.exports = cartsRoutes;