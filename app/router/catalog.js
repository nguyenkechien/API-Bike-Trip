const express       = require('express');
const catalogRoutes = express.Router();
const auth          = require("../middleware/auth.middleware");

// require model catalogController
const catalogController = require('../controllers/catalog');

// Defined get data(index or listing) route

catalogRoutes.route('/').get(catalogController.getApiCatalog);

// Defined Store route 
catalogRoutes.route('/content/save').post(catalogController.newCatalog);

// Defined get edit iddata route
catalogRoutes.route('/content/:id').get(catalogController.getIdData);

//  Defined update route post
catalogRoutes.route('/content/update/:id').post(catalogController.updateData)

// Defined delete route
catalogRoutes.route('/content/delete/:id').get(catalogController.deleteData);

module.exports = catalogRoutes;