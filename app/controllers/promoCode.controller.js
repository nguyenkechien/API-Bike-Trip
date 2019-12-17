const {
  promoCodesChar,
  validatePromoCode
} = require("../models/promoCode.model");

module.exports = {
  getApiPromo: async (req, res, next) => {
    const findPromos = await promoCodesChar.find(promo => {
      return promo;
    });

    try {
      res.status(200).json(findPromos);
    } catch (error) {
      res.status(400).send({
        message: `Can't get API`
      });
      console.log(`Can't get API : ${error}`);
    }
  },

  newPromo: async (req, res, next) => {
    const { error } = validatePromoCode(req.body);
    if (error) return res.status(401).send(error.details[0].message);

    const newPromo     = new promoCodesChar(req.body);
    let   newPromoSave = await newPromo.save();

    try {
      res.status(200).send(newPromoSave);
      console.log(newPromoSave);
    } catch (error) {
      res.status(400).send("unable to save to database");
      console.log(error);
    }
  },

  getIdData: async (req, res, next) => {
    // const { error } = validatePromoCode(req.body);
    // if (error) return res.status(400).send(error.details[0].message);

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
      res.status(200).json(findByCodePromo);
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
      function(err, person) {
        if (err) res.json(err);
        else res.json("Successfully removed");
      }
    );
  }
};