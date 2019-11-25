const { productsChar, validateProducts } = require("../models/products.model");

module.exports = {
  getProducts: async (req, res, next) => {
    const findProducts = await productsChar.find(products => {
      return products;
    });

    try {
      res.status(200).json(findProducts);
    } catch (error) {
      res.status(400).send({
        message: `Can't get API`
      });
      console.log(`Can't get API : ${error}`);
    }
  },

  newProduct: async (req, res, next) => {
    const { error } = validateProducts(req.body);
    if (error) return res.status(401).send(error.details[0].message);

    const newProduct = new productsChar(req.body);
    let newProductSave = await newProduct.save();

    try {
      res.status(200).send(newProductSave);
      console.log(newProductSave);
    } catch (error) {
      res.status(400).send("unable to save to database");
      console.log(error);
    }
  },

  getIdData: async (req, res, next) => {
    let id = req.params.id;
    const findByIdProduct = await productsChar.findById(id, business => {
      return business;
    });

    try {
      res.status(200).json(findByIdProduct);
    } catch (error) {
      res.status(400).send({
        message: `Error ID`
      });
      console.log(`Error _ID : ${error}`);
    }
  },

  updateData: async (req, res, next) => {
    const { error } = validateProducts(req.body);
    if (error) return res.status(401).send(error.details[0].message);
    let id = req.params.id;
    const findByIdProduct = await productsChar.findById(
      id,
      (err, updateProduct) => {
        if (!updateProduct) {
          return res.status(404).send("data is not found");
        } else {
          updateProduct.name = req.body.name;
          updateProduct.price = req.body.price;
          updateProduct.sale_price = req.body.sale_price;
          updateProduct.image = req.body.image;
          updateProduct.gallerys = req.body.gallerys;
          updateProduct.descrition = req.body.descrition;
          updateProduct.QR_code = req.body.QR_code;
          updateProduct.catalog = req.body.catalog;
          updateProduct.hot = req.body.hot;
          updateProduct.status = req.body.status;
          updateProduct.color = req.body.color;
          updateProduct.save();
          try {
            res.status(200).json({
              message: "update complate",
              business: updateProduct
            });
          } catch (error) {
            res.status(404).send("data is not found");
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
      function(err, person) {
        if (err) res.json(err);
        else res.json("Successfully removed");
      }
    );
  }
};
