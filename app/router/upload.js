const express     = require("express");
const uploadRoute = express.Router();
const auth        = require("../middleware/auth.middleware");

const uploadController = require("../controllers/upload");

// Defined get data(index or listing) route
uploadRoute.route("/").get(uploadController.getImages);

// Defined Store route
uploadRoute
  .route("/content/save")
  .post(uploadController.newImage);

  // Defined Store route
uploadRoute
  .route("/content/save/gallerys")
  .post(uploadController.newGallerys);
 
// Defined Store route
uploadRoute
  .route("/content/delete/:id")
  .get(uploadController.deleteData);

module.exports = uploadRoute;
