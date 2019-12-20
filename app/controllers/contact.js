const contactsChar     = require("../models/contact");
const validateContacts = require("../validation/validateContacts");


module.exports = {
  getApiContact: async (req, res, next) => {
    const findContact = await contactsChar.find(contacts => {
      return contacts;
    });

    try {
      res.status(200).send({
        message: 'Connect API Success',
        data   : findContact
      });
    } catch (error) {
      res.status(400).send({
        message: `Can't get API`
      });
      console.log(`Can't get API : ${error}`);
    }
  },

  newContact: async (req, res, next) => {
    const { error } = validateContacts(req.body);

    if (error) {
      return res.status(401).send({
        message: error.details[0].message
      });
    }

    const newContact     = new contactsChar(req.body);
    let   newContactSave = await newContact.save();

    try {
      res.status(200).send({
        message: 'Save to database success',
        data   : newContactSave
      });
      console.log(newContactSave);
    } catch (error) {
      res.status(400).send({
        message: 'unable to save to database'
      });
      console.log(error);
    }
  },

  getIdData: async (req, res, next) => {
    let id = req.params.id;
    
    const findByIdContact = await contactsChar.findById(id, business => {
      return business
    });

    try {
      res.status(200).send({
        message: 'Get data success',
        data   : findByIdContact
      });
    } catch (error) {
      res.status(400).send({
        message: `Error ID`
      });
      console.log(`Error _ID : ${error}`);
    }
  },

  deleteData: (req, res, next) => {
    contactsChar.findByIdAndRemove(
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
