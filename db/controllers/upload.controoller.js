const multer = require("multer");
const imagesChar = require("../models/images.model");

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
        cb(null, process.env.Domain + "/uploads/images");
      },
    
      filename: function(req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
      }
    });

    const Upload = multer({ storage: storage }).single("images");

    Upload(req, res, async function(err) {
      if (err instanceof multer.MulterError) {
        console.log(err);
        return res.status(500).json(err);
      } else if (err) {
        console.log(err);
        return res.status(500).json(err);
      }
      let newImg = {
        nameImage : req.file.filename,
        altImage : req.file.originalname,
        urlImage : process.env.URL + "uploads/images/" + req.file.filename
      }
      const newImage = new imagesChar(newImg);
      let newImageSave = await newImage.save();
      
      return res.status(200).send(newImageSave);
    });
  }
};
