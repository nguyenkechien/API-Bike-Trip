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
    const storage = multer.diskStorage({
      destination: function(req, file, cb) {
        cb(null, process.env.Domain + "/uploads/images");
      },

      filename: function(req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
      }
    });

    const Upload = multer({
      storage: storage,
      limits: { fileSize: 1000000 }
    }).single("images");

    Upload(req, res, async function(err) {
      if (err instanceof multer.MulterError) {
        console.log(err);
        return res.status(500).json(err);
      } else if (err) {
        console.log(err);
        return res.status(500).json(err);
      }

      let newImg = {
        nameImage: req.file.filename,
        altImage: req.file.originalname,
        urlImage: process.env.URL + "images/" + req.file.filename
      };

      const newImage = new imagesChar(newImg);
      let newImageSave = await newImage.save();
      try {
        return res.status(200).send(newImageSave);
      } catch (error) {
        res.status(400).send("unable to save to database");
      }
    });
  },
  newGallerys: async (req, res, next) => {
    const storage = multer.diskStorage({
      destination: function(req, file, cb) {
        cb(null, process.env.Domain + "/uploads/images");
      },

      filename: function(req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
      }
    });

    const Upload = multer({
      storage: storage,
      limits: { fileSize: 1000000 }
    }).array("files");

    Upload(req, res, async function(err) {
      if (err instanceof multer.MulterError) {
        console.log(err);
        return res.status(500).json(err);
      } else if (err) {
        console.log(err);
        return res.status(500).json(err);
      }
      let files = [];
      for (let i = 0; i < req.files.length; i++) {
        const element = req.files[i];
        let newImg = {
          nameImage: element.filename,
          altImage: element.originalname,
          urlImage: process.env.URL + "images/" + element.filename
        };
        const newImage = new imagesChar(newImg);
        let newImageSave = await newImage.save();
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
    imagesChar.findByIdAndRemove(
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
