const usersChar = require("../models/user");
const bcrypt    = require("bcrypt");
const {
  validateUserRegistration,
  validateUserLogin
} = require('./../validation/validateUsers')
const config = require('./../../config');
const jwt    = require('jsonwebtoken');


module.exports = {
  getApiUsers: async (req, res, next) => {
    const findUsers = await usersChar.find(users => {
      return users;
    });

    try {
      if (req.user.isAdmin) {
        res.status(200).send({
          message: 'Connect API Success',
          data   : findUsers
        });
      } else {
        res.status(404).send({
          message: 'You are not the administrator',
        });
      }
    } catch (error) {
      res.status(400).send({
        message: `Can't get API`
      });
      console.log(`Can't get API : ${error.message}`);
    }

  },

  newUsers: async (req, res, next) => {
    const { error } = validateUserRegistration(req.body);

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

    let emailExist = await usersChar.findOne({
      email: req.body.email
    });

    let userName = await usersChar.findOne({
      user_name: req.body.user_name
    });

    let userPhone = await usersChar.findOne({
      phone: req.body.phone
    });

    if (emailExist) {
      return res.status(401).send({
        message: "Email already registered."
      });
    }
    if (userName) {
      return res.status(401).send({
        message: "User already registered."
      });
    }
    if (userPhone) {
      return res.status(401).send({
        message: "Number phone already registered."
      });
    }

    const newUser = new usersChar(req.body);
    // hash password
    newUser.password = await bcrypt.hashSync(newUser.password, 1);

    try {
      const user = await newUser.save();

      const _token = newUser.generateAuthToken();

      res.header("x-auth-token", _token).send({
        _id     : user._id,
        fullname: user.fullname,
        location: user.location,
        email   : user.email,
        avatar  : user.avatar,
        phone   : user.phone,
        token   : _token
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        message: 'unable to save to database'
      });
    }
  },


  LoginUser: async (req, res, next) => {
    // ckeck validate
    const { error } = validateUserLogin(req.body);
    
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


    let user = await usersChar.findOne({
      user_name: req.body.user_name
    });

    if (!user) {
      return res.status(404).send({
        message: "User Name is wrong."
      });
    }

    let validPassword = await bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      return res.status(404).send({
        message: "Invalid password."
      });
    }

    console.log(`check password: ${validPassword}`);

    if (config.NODE_ENV === 'production') {
      const origin = req.headers.host;
      if (origin === config.DOMAIN_API) {
        if (!user.isAdmin) {
          return res.status(400).send({
            message: "You do not have access."
          });
        }
      }
    }

    const _token = user.generateAuthToken();

    res.header("x-auth-token", _token).send({
      _id     : user._id,
      fullname: user.fullname,
      location: user.location,
      email   : user.email,
      avatar  : user.avatar,
      phone   : user.phone,
      token   : _token
    });
    next();
  },

  getIdData: async (req, res, next) => {
    let   id           = req.params.id;
    const findByIdUser = await usersChar.findById(id, business => {
      return business;
    });

    try {
      res.status(200).send({
        message: 'Get data success',
        data   : {
          _id     : findByIdUser._id,
          fullname: findByIdUser.fullname,
          location: findByIdUser.location,
          email   : findByIdUser.email,
          avatar  : findByIdUser.avatar,
          phone   : findByIdUser.phone,
        }
      });

    } catch (error) {
      res.status(400).send({
        message: `Error ID`
      });
      console.log(`Error _ID : ${error}`);
    }
  },

  updateData: async (req, res, next) => {

    const { error } = validateUserRegistration(req.body);

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

    const findByIdUser = await usersChar.findById(id);

    if (!findByIdUser) {
      console.log(error);

      return res.status(404).send({
        message: "data is not found"
      });
    }
        findByIdUser.fullname  = req.body.fullname;
        findByIdUser.user_name = req.body.user_name;
        findByIdUser.password  = req.body.password;
        findByIdUser.email     = req.body.email;
        findByIdUser.avatar    = req.body.avatar;
        findByIdUser.address   = req.body.address;
        findByIdUser.location  = req.body.location;
        findByIdUser.phone     = req.body.phone;
        findByIdUser.status    = req.body.status;
        findByIdUser.isAdmin   = req.body.isAdmin;
        findByIdUser.password  = await bcrypt.hashSync(findByIdUser.password, 1);
    let saveData               = await findByIdUser.save();

    try {
      res.status(200).send({
        message : "update complate",
        business: saveData
      });
    } catch (error) {
      console.log(error);
    }

  },

  deleteData: (req, res, next) => {
    usersChar.findByIdAndRemove(
      {
        _id: req.params.id
      },
      function (err, person) {
        if (err) res.send(err);
        else res.send("Successfully removed");
      }
    );
  }
};
