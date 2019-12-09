const { cartsChar, validateCart } = require("../models/carts.model");

module.exports = {
  getCarts: async (req, res, next) => {
    const findCarts = await cartsChar.find(carts => {
      return carts;
    });

    try {
      res.status(200).json(findCarts);
    } catch (error) {
      res.status(400).send({
        message: `Can't get API`
      });
      console.log(`Can't get API : ${error}`);
    }
  },

  newCart: async (req, res, next) => {
    const { error } = validateCart(req.body);

    if (error) {
      return res.status(401).send(error.details[0].message);
    }

    const newCart = new cartsChar(req.body);
    let newCartSave = await newCart.save();

    try {
      res.status(200).send(newCartSave);
      console.log(newCartSave);
    } catch (error) {
      res.status(400).send("unable to save to database");
      console.log(error);
    }
  },

  getIdData: async (req, res, next) => {
    let id = req.params.id;
    const findByIdCart = await cartsChar.findById(id, business => {
      return business;
    });

    try {
      res.status(200).json(findByIdCart);
    } catch (error) {
      res.status(400).send({
        message: `Error ID`
      });
      console.log(`Error _ID : ${error}`);
    }
  },

  updateData: async (req, res, next) => {
    const { error } = validateCart(req.body);
    if (error) return res.status(401).send(error.details[0].message);
    let id = req.params.id;

    const findByIdCart = await cartsChar.findById(id, (err, updateCart) => {
      if (!updateCart) {
        return res.status(404).send("data is not found");
      } else {
        updateCart.user = req.body.user;
        updateCart.products = req.body.products;
        updateCart.total_money = req.body.total_money;
        updateCart.discount_code = req.body.discount_code;
        updateCart.visaCard = req.body.visaCard;
        updateCart.status = req.body.status;
        updateCart.save();
        try {
          res.status(200).json({
            message: "update complate",
            business: updateCart
          });
        } catch (error) {
          res.status(404).send("data is not found");
          console.log(error);
        }
        return updateCart;
      }
    });
  },

  deleteData: (req, res, next) => {
    cartsChar.findByIdAndRemove(
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
