const express = require('express');
const usersRoutes = express.Router();

// require model usersController
const usersController = require('../controllers/users.controller');

// Defined get data(index or listing) route

usersRoutes.route('/').get(usersController.getApiUsers);

// Defined Store route 
usersRoutes.route('/content/save').post(usersController.newUsers);

// Defined get edit iddata route
usersRoutes.route('/content/:id').get(usersController.getIdData);

//  Defined update route post
usersRoutes.route('/content/update/:id').post(usersController.updateData)

// Defined delete route
usersRoutes.route('/content/delete/:id').get(usersController.deleteData);

module.exports = usersRoutes;