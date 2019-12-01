const express = require("express");
const uploadRoute = express.Router();
const auth = require("../middleware/auth.middleware");

const uploadController = require("../controllers/upload.controoller");

// Defined get data(index or listing) route
uploadRoute.route("/").get(uploadController.getImages);

// Defined Store route
uploadRoute
  .route("/content/save")
  .post(auth, uploadController.newImage);

  // Defined Store route
uploadRoute
  .route("/content/save/gallerys")
  .post(auth, uploadController.newGallerys);
 
// Defined Store route
uploadRoute
  .route("/content/delete/:id")
  .get(auth, uploadController.deleteData);

module.exports = uploadRoute;
