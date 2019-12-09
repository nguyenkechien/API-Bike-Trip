const { catalogChar, validateCatalog } = require("../models/catalog.model");

module.exports = {
  getApiCatalog: async (req, res, next) => {
    const findCatalog = await catalogChar.find(catalogs => {
      return catalogs;
    });

    try {
      res.status(200).json(findCatalog);
    } catch (error) {
      res.status(400).send({
        message: `Can't get API`
      });
      console.log(`Can't get API : ${error}`);
    }
  },

  newCatalog: async (req, res, next) => {
    const { error } = validateCatalog(req.body);
    if (error) return res.status(401).send(error.details[0].message);

    const newCata = new catalogChar(req.body);
    let newCataSave = await newCata.save();

    try {
      res.status(200).send(newCataSave);
    } catch (error) {
      res.status(400).send("unable to save to database");
    }
  },

  getIdData: async (req, res, next) => {
    let id = req.params.id;
    const findByIdCatalog = await catalogChar.findById(id, business => {
      return business;
    });

    try {
      res.status(200).json(findByIdCatalog);
    } catch (error) {
      res.status(400).send({
        message: `Error ID`
      });
      console.log(`Error _ID : ${error}`);
    }
  },

  updateData: async (req, res, next) => {
    let id = req.params.id;
    const findByIdCatalog = await catalogChar.findById(
      id,
      (err, updateCata) => {
        if (!updateCata) {
          res.status(404).send("data is not found");
        } else {
          updateCata.nameCatalog = req.body.nameCatalog;
          updateCata.descriptionCatalog = req.body.descriptionCatalog;
          updateCata.save();
          return updateCata;
        }
      }
    );
    try {
      res.status(200).json({
        message: "update complate",
        
      });
    } catch (error) {
      res.status(404).send("data is not found");
      console.log(error);
    }
  },

  deleteData: (req, res, next) => {
    catalogChar.findByIdAndRemove(
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
