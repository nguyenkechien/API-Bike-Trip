const promoCodesChar    = require("../models/promoCode");
const validatePromoCode = require('../validation/validatePromo')

module.exports = {
  getApiPromo: async (req, res, next) => {
    const findPromos = await promoCodesChar.find(promo => {
      return promo;
    });

    try {
      res.status(200).send({
        message: 'Connect API Success',
        data   : findPromos
      });
    } catch (error) {
      res.status(400).send({
        message: `Can't get API`
      });
      console.log(`Can't get API : ${error}`);
    }
  },

  newPromo: async (req, res, next) => {
    const { error } = validatePromoCode(req.body);

    if (error) {
      return res.status(401).send({
        message: error.details[0].message
      });
    }

    const newPromo     = new promoCodesChar(req.body);
    let   newPromoSave = await newPromo.save();

    try {
      res.status(200).send({
        message: 'Save to database success',
        data   : newPromoSave
      });
      console.log(newPromoSave);
    } catch (error) {
      res.status(400).send({
        message: 'unable to save to database'
      });
      console.log(error);
    }
  },

  getIdData: async (req, res, next) => {

    let code = req.params.id;

    const findByCodePromo = await promoCodesChar.findOne({
      codeName: code
    });

    try {
      if (!findByCodePromo) {
        return res.status(400).send({
          message: "Invalid Code."
        });
      }
      res.status(200).send({
        message : "Success Promo",
        business: findByCodePromo
      });
    } catch (error) {
      res.status(400).send({
        message: `Error ID`
      });
      console.log(`Error _ID : ${error}`);
    }
  },

  deleteData: (req, res, next) => {
    promoCodesChar.findByIdAndRemove(
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
