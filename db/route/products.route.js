const express = require('express');
const productsRoutes = express.Router();

// require model productsController
const productsController = require('../controllers/products.controller');

// Defined get data(index or listing) route

productsRoutes.route('/').get(productsController.getApiProducs);

// Defined Store route 
productsRoutes.route('/content/save').post(productsController.newProducs);

// Defined get edit iddata route
productsRoutes.route('/content/:productsId').get(productsController.getIdData);

//  Defined update route post
productsRoutes.route('/content/update/:id').post(productsController.updateData)

// Defined delete route
productsRoutes.route('/content/delete/:id').get(productsController.deleteData);

module.exports = productsRoutes;