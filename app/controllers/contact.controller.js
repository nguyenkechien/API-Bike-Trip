const { contactsChar, validateContacts } = require("../models/contact.model");

module.exports = {
  getApiContact: async (req, res, next) => {
    const findContact = await contactsChar.find(contacts => {
      return contacts;
    });

    try {
      res.status(200).json(findContact);
    } catch (error) {
      res.status(400).send({
        message: `Can't get API`
      });
      console.log(`Can't get API : ${error}`);
    }
  },

  newContact: async (req, res, next) => {
    const { error } = validateContacts(req.body);
    if (error) return res.status(401).send(error.details[0].message);

    const newContact = new contactsChar(req.body);
    let newContactSave = await newContact.save();

    try {
      res.status(200).send(newContactSave);
      console.log(newContactSave);
    } catch (error) {
      res.status(400).send("unable to save to database");
      console.log(error);
    }
  },

  getIdData: async (req, res, next) => {
    let id = req.params.id;
    const findByIdContact = await contactsChar.findById(id, business => {
      return business
    });

    try {
      res.status(200).json(findByIdContact)
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
      function(err, person) {
        if (err) res.json(err);
        else res.json("Successfully removed");
      }
    );
  }
};
