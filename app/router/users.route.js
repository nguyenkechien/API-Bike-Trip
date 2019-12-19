const express     = require('express');
const usersRoutes = express.Router();
const auth        = require("../middleware/auth.middleware");

// require model usersController
const usersController = require('../controllers/users.controller');

// Defined get data(index or listing) route

usersRoutes.route('/').get(auth, usersController.getApiUsers);

// Defined Store route 
usersRoutes.route('/registration').post(usersController.newUsers);

// Defined get edit iddata route
usersRoutes.route('/login').post(usersController.LoginUser);

//  Defined update route post
usersRoutes.route('/content/:id').get(usersController.getIdData);

//  Defined update route post
usersRoutes.route('/content/update/:id').post(auth,usersController.updateData)

// Defined delete route
usersRoutes.route('/content/delete/:id').get(auth,usersController.deleteData);

module.exports = usersRoutes;