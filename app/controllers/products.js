const productsChar = require("../models/products");
const validateProducts = require("../validation/validateProd");

module.exports = {
  getProducts: async (req, res, next) => {
    const findProducts = await productsChar.find(products => {
      return products;
    });

    try {
      res.status(200).send({
        message: "Connect API Success",
        data: findProducts
      });
    } catch (error) {
      res.status(400).send({
        message: `Can't get API`
      });
      console.log(`Can't get API : ${error.message}`);
    }
  },

  newProduct: async (req, res, next) => {
    const {
      error
    } = validateProducts(req.body);

    if (error) {
      let messages = [];
      for (let i = 0; i < error.details.length; i++) {
        const item = error.details[i];
        messages.push(item.message);
      }
      return res.status(401).send({
        message: messages
      });
    }

    const newProduct = new productsChar(req.body);
    let newProductSave = await newProduct.save();

    try {
      res.status(200).send({
        message: "Save to database success",
        data: newProductSave
      });
    } catch (error) {
      res.status(400).send({
        message: "unable to save to database"
      });
      console.log(error);
    }
  },

  getIdData: async (req, res, next) => {
    let id = req.query.watch;

    const findByIdProduct = await productsChar.findById(id, business => {
      return business;
    });

    try {
      if (findByIdProduct) {
        res.status(200).send({
          message: "Get data success",
          data: findByIdProduct
        });
      }else {
        res.status(404).send({
          message: `Error ID`
        });
      }
    } catch (error) {
      res.status(400).send({
        message: `Error ID`
      });
      console.log(`Error _ID : ${error}`);
    }
  },

  updateData: async (req, res, next) => {
    const {
      error
    } = validateProducts(req.body);
    if (error) {
      let messages = [];
      for (let i = 0; i < error.details.length; i++) {
        const item = error.details[i];
        messages.push(item.message);
      }
      return res.status(401).send({
        message: messages
      });
    }

    let id = req.query.update;

    const findByIdProduct = await productsChar.findById(id);
    if (!findByIdProduct) {
      return res.status(404).send({
        message: "data is not found"
      });
    }

    findByIdProduct.name = req.body.name;
    findByIdProduct.price = req.body.price;
    findByIdProduct.sale_price = req.body.sale_price;
    findByIdProduct.image = req.body.image;
    findByIdProduct.gallerys = req.body.gallerys;
    findByIdProduct.descrition = req.body.descrition;
    findByIdProduct.QR_code = req.body.QR_code;
    findByIdProduct.catalog = req.body.catalog;
    findByIdProduct.hot = req.body.hot;
    findByIdProduct.status = req.body.status;
    findByIdProduct.color = req.body.color;
    findByIdProduct.param = req.body.param;
    let saveData = await findByIdProduct.save();

    try {
      res.status(200).send({
        message: "Update to database success",
        business: saveData
      });
    } catch (error) {
      res.status(400).send({
        message: "Server error"
      });
      console.log(error);
    }

  },

  deleteData: (req, res, next) => {
    productsChar.findByIdAndRemove({
        _id: req.params.id
      },
      function (err, person) {
        if (err) res.send(err);
        else
          res.send({
            message: "Successfully removed"
          });
      }
    );
  }
};