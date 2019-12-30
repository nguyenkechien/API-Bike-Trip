const express     = require("express");
const galleryRoute = express.Router();
const auth        = require("../middleware/auth.middleware");

const galleryController = require("../controllers/gallery.controoller");

// Defined get data(index or listing) route
galleryRoute.route("/").get(galleryController.getGallery);

// Defined Store route
galleryRoute
  .route("/content/save")
  .post(auth, galleryController.newGallerys);

// Defined Store route
galleryRoute
  .route("/content/delete/:id")
  .get(auth, galleryController.deleteData);

module.exports = galleryRoute;
