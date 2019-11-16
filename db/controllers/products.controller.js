const productsChar = require('../models/products.model');

module.exports = {
  getApiProducs: (req, res, next) => {
    productsChar.find((err, products) => {
      if (err) {
        console.log(`Can't get API : ${err}`);
      } else {
        res.json(products);
      }
    });
  },

  newProducs: (req, res, next) => {
    const newProduct = new productsChar(req.body);
    newProduct.save()
    .then(product => {
        res.status(200).send(newProduct);
        console.log(newProduct)
      })
      .catch(err => {
        res.status(400).send('unable to save to database');
        console.log(err)
      });
  },

  getIdData: (req, res, next) => {
    let id = req.params.id;
    productsChar.findById(id, (err, business) => {
      res.json(business);
    });
  },

  updateData : (req, res, next) => {
    productsChar.findById(req.params.id, function (err, newProduct) {
      if (!newProduct) {
        res.status(404).send('data is not found');
      } else {
        console.log(newProduct);
        newProduct.name = req.body.name;
        newProduct.price = req.body.price;
        newProduct.sale_price = req.body.sale_price;
        newProduct.image = req.body.image;
        newProduct.descrition = req.body.descrition;
        newProduct.QR_code = req.body.QR_code;
        newProduct.catalog = req.body.catalog;
        newProduct.status = req.body.status;
        newProduct.color = req.body.color;
  
        newProduct.save().then(business => {
            res.json('update complate');
          })
          .catch(err => {
            res.status(404).send("Can't update the database");
          })
      }
    });
  },
  
  deleteData: (req, res , next) => {
    productsChar.findByIdAndRemove({
      _id: req.params.id
    }, function (err, person) {
      if (err) res.json(err);
      else res.json('Successfully removed');
    });
  }
}