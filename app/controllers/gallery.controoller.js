const multer     = require("multer");
const galleryChar = require("../models/gallery.model");
const config     = require("./../../config");

module.exports = {
  getGallery: async (req, res, next) => {
    const findGallery = await galleryChar.find(gallery => {
      return gallery;
    });

    try {
      res.status(200).json(findGallery);
    } catch (error) {
      res.status(400).send({
        message: `Can't get API`
      });
      console.log(`Can't get API : ${error}`);
    }
  },

  newGallerys: async (req, res, next) => {
    const storage = multer.diskStorage({
      destination: function(req, file, cb) {
        cb(null, config.DRIVE + "/uploads/images");
      },

      filename: function(req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
      }
    });

    const Upload = multer({
      storage: storage,
      limits : { fileSize: 1000000 }
    }).array("gallery");

    Upload(req, res, async function(err) {
      if (err instanceof multer.MulterError) {
        console.log(`501${err}`);
        return res.status(501).json(err);
      } else if (err) {
        console.log(err);
        return res.status(500).json(err);
      }
      let files = [];
      for (let i = 0; i < req.files.length; i++) {
        const element = req.files[i];
        let   newImg  = {
          nameFile: element.filename,
          altFile : element.originalname,
          urlFile : config.DOMAIN_API + "images/" + element.filename
        };
        const newImage     = new galleryChar(newImg);
        let   newImageSave = await newImage.save();
        try {
          files.push(newImageSave);
        } catch (error) {
          res.status(400).send("unable to save to database");
        }
      }
      return res.status(200).send(files);
    });
  },
  
  deleteData: (req, res, next) => {
    galleryChar.findByIdAndRemove(
      {
        _id: req.params.id
      },
      function(err, person) {
        if (err) res.json(err);
        else res.json("Successfully removed");
      }
    );
  }
};
