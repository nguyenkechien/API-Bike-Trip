const express = require('express');
const productsRoutes = express.Router();
const auth = require("../middleware/auth.middleware");

// require model productsController
const productsController = require('../controllers/products.controller');
// Defined get data(index or listing) route

productsRoutes.route('/').get(productsController.getProducts);

// Defined Store route 
productsRoutes.route('/content/save').post(auth, productsController.newProduct);

// Defined get edit iddata route
productsRoutes.route('/content/:id').get(productsController.getIdData);

//  Defined update route post
productsRoutes.route('/content/update/:id').post(auth, productsController.updateData)

// Defined delete route
productsRoutes.route('/content/delete/:id').get(productsController.deleteData);

module.exports = productsRoutes;
