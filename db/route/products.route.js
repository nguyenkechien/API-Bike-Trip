const express = require('express');
const productsRoutes = express.Router();

// require model productsController
const productsController = require('../controllers/products.controller');

// Defined get data(index or listing) route

productsRoutes.route('/').get(productsController.getApiProducs);

// Defined Store route 
productsRoutes.route('/add').post(productsController.newProducs);

// Defined get edit iddata route
productsRoutes.route('/edit/:productsId').get(productsController.getIdData);

//  Defined update route post
productsRoutes.route('/update/:id').post(productsController.updateData)

// Defined delete route
productsRoutes.route('/delete/:id').get(productsController.deleteData);

module.exports = productsRoutes;