const cartsChar    = require("../models/carts");
const validateCart = require("../validation/validateCart");

module.exports = {
  getCarts: async (req, res, next) => {
    const findCarts = await cartsChar.find(carts => {
      return carts;
    });

    try {
      res.status(200).send({
        message: 'Connect API Success',
        data   : findCarts
      });
    } catch (error) {
      res.status(400).send({
        message: `Can't get API`
      });
      console.log(`Can't get API : ${error.message}`);
    }
  },

  newCart: async (req, res, next) => {
    const { error } = validateCart(req.body);

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

    const newCart     = new cartsChar(req.body);
    let   newCartSave = await newCart.save();

    try {
      res.status(200).send({
        message: 'Save to database success',
        data   : newCartSave
      });
      console.log(newCartSave);
    } catch (error) {
      res.status(400).send({
        message: 'unable to save to database'
      });
      console.log(error);
    }
  },

  getIdData: async (req, res, next) => {
    let   id           = req.params.id;
    const findByIdCart = await cartsChar.findById(id, business => {
      return business;
    });

    try {
      res.status(200).send({
        message: 'Get data success',
        data   : findByIdCart
      });
    } catch (error) {
      res.status(400).send({
        message: `Error ID`
      });
      console.log(`Error _ID : ${error}`);
    }
  },

  updateData: async (req, res, next) => {
    let id = req.params.id;

    const findByIdCart = await cartsChar.findById(id, (err, updateCart) => {
      if (!updateCart) {
        return res.status(404).send("data is not found");
      } else {
        updateCart.status = req.body.status;
        updateCart.save();
        try {
          res.status(200).send({
            message : "update complate",
            business: updateCart
          });
        } catch (error) {
          res.status(404).send({
            message: "data is not found"
          });
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
      function (err, person) {
        if (err) res.send(err);
        else res.send({
          message: "Successfully removed"
        });
      }
    );
  },

};
