const express       = require('express');
const contactRoutes = express.Router();
const auth          = require("../middleware/auth.middleware");

// require model contactController
const contactController = require('../controllers/contact.controller');

// Defined get data(index or listing) route

contactRoutes.route('/').get(contactController.getApiContact);

// Defined Store route 
contactRoutes.route('/content/save').post(auth, contactController.newContact);

// Defined get edit iddata route
contactRoutes.route('/content/:id').get(contactController.getIdData);

// Defined delete route
contactRoutes.route('/content/delete/:id').get(contactController.deleteData);

module.exports = contactRoutes;