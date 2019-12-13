const express = require('express');
const promoRoutes = express.Router();
const auth = require("../middleware/auth.middleware");

// require model promoCodesController
const promoCodesController = require('../controllers/promoCde.controller');

// Defined get data(index or listing) route

promoRoutes.route('/').get(promoCodesController.getApiPromo);

// Defined Store route 
promoRoutes.route('/content/save').post(auth, promoCodesController.newPromo);

// Defined get edit iddata route
promoRoutes.route('/content/:id').get(promoCodesController.getIdData);

// Defined delete route
promoRoutes.route('/content/delete/:id').get(promoCodesController.deleteData);

module.exports = promoRoutes;