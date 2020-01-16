const productsChar     = require("../models/products");
const validateProducts = require('../validation/validateProd');

module.exports = {
  getProducts: async (req, res, next) => {
    const findProducts = await productsChar.find(products => {
      return products;
    });

    try {
      res.status(200).send({
        message: 'Connect API Success',
        data   : findProducts
      });
    } catch (error) {
      res.status(400).send({
        message: `Can't get API`
      });
      console.log(`Can't get API : ${error.message}`);
    }
  },

  newProduct: async (req, res, next) => {
    const { error } = validateProducts(req.body);

   if (error) {
      let messages = [];
      for (let i = 0; i < error.details.length; i++) {
        const item = error.details[i];
        messages.push(item.message)
      }
      return res.status(401).send({
        message: messages
      });
    }

    const newProduct     = new productsChar(req.body);
    let   newProductSave = await newProduct.save();

    try {
      res.status(200).send({
        message: 'Save to database success',
        data   : newProductSave
      });
    } catch (error) {
      res.status(400).send({
        message: 'unable to save to database'
      });
      console.log(error);
    }
  },

  getIdData: async (req, res, next) => {

    let id = req.params.id;

    const findByIdProduct = await productsChar.findById(id, business => {
      return business;
    });

    try {
      res.status(200).send({
        message: 'Get data success',
        data   : findByIdProduct
      });
    } catch (error) {
      res.status(400).send({
        message: `Error ID`
      });
      console.log(`Error _ID : ${error}`);
    }
  },

  updateData: async (req, res, next) => {
    const { error } = validateProducts(req.body);

   if (error) {
      let messages = [];
      for (let i = 0; i < error.details.length; i++) {
        const item = error.details[i];
        messages.push(item.message)
      }
      return res.status(401).send({
        message: messages
      });
    }

    let id = req.params.id;

    const findByIdProduct = await productsChar.findById(
      id,
      (err, updateProduct) => {
        if (!updateProduct) {
          return res.status(404).send({
            message: "data is not found"
          });
        } else {
          updateProduct.name       = req.body.name;
          updateProduct.price      = req.body.price;
          updateProduct.sale_price = req.body.sale_price;
          updateProduct.image      = req.body.image;
          updateProduct.gallerys   = req.body.gallerys;
          updateProduct.descrition = req.body.descrition;
          updateProduct.QR_code    = req.body.QR_code;
          updateProduct.catalog    = req.body.catalog;
          updateProduct.hot        = req.body.hot;
          updateProduct.status     = req.body.status;
          updateProduct.color      = req.body.color;
          updateProduct.param      = req.body.param;
          updateProduct.save();
          try {
            res.status(200).send({
              message : "Update to database success",
              business: updateProduct
            });
          } catch (error) {
            res.status(404).send({
              message: "data is not found"
            });
            console.log(error);
          }
          return updateProduct;
        }
      }
    );
  },

  deleteData: (req, res, next) => {
    productsChar.findByIdAndRemove(
      {
        _id: req.params.id
      },
      function (err, person) {
        if (err) res.send(err);
        else res.send({
          message: "Successfully removed"
        });
      }
    );
  }
};
