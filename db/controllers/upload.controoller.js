const multer = require("multer");
const imagesChar = require("../models/images.model");
const myURL = new URL(process.env.URL);

module.exports = {
  getImages: async (req, res, next) => {
    const findImages = await imagesChar.find(images => {
      return images;
    });

    try {
      res.status(200).json(findImages);
    } catch (error) {
      res.status(400).send({
        message: `Can't get API`
      });
      console.log(`Can't get API : ${error}`);
    }
  },
  newImage: async (req, res, next) => {
    var storage = multer.diskStorage({
      destination: function(req, file, cb) {
        cb(null, __dirname + "/uploads/images");
      },

      filename: function(req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
      }
    });

    const upload = multer({ storage: storage }).single("images");

    upload(req, res, function(err) {
      if (err instanceof multer.MulterError) {
        console.log(err);
        return res.status(500).json(err);
      } else if (err) {
        console.log(err);
        return res.status(500).json(err);
      }
      return res.status(200).send(req.file);
    });
  }
};
