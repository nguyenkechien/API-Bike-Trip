const {
  usersChar,
  validateUser,
  validateLoginUser
} = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = {
  getApiUsers: (req, res, next) => {
    usersChar.find((err, users) => {
      if (err) {
        console.log(`Can't get API : ${err}`);
      } else {
        res.json(users);
      }
    });
  },

  newUsers: async (req, res, next) => {
    // ckeck validate
    const { error } = validateUser(req.body);
    if (error) return res.status(401).send(error.details[0].message);

    let emailExist = await usersChar.findOne({
      email: req.body.email
    });
    
    if (emailExist) return res.status(401).send("User already registered.");

    const newUser = new usersChar(req.body);
    // hash password
    // const slat = bcrypt
    newUser.password = await bcrypt.hashSync(newUser.password, 1);
    try {
      const user = await newUser.save();

      const _token = newUser.generateAuthToken();

      res.header("x-auth-token", _token).send({
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        user_name: user.user_name,
        _token: _token
      });
    } catch (error) {
      console.log(error);
      res.status(401).send(error);
    }
  },

  LoginUser: async (req, res, next) => {
    // ckeck validate
    const { error } = validateLoginUser(req.body);
    if (error) {
      console.log(error);
      return res.status(400).send(error.details[0].message);
    }

    let user = await usersChar.findOne({
      user_name: req.body.user_name
    });
    
    if (!user) {
      return res.status(400).send({
        message: "User Name is wrong."
      });
    }
    
    let validPassword = await bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(400).send({
        message: "Invalid password."
      });
    }

    console.log(`check password: ${validPassword}`);

    const _token = user.generateAuthToken();

    res.header("x-auth-token", _token).send({
      _id: user._id,
      fullname: user.fullname,
      isAdmin: user.isAdmin,
      avatar: user.avatar,
      _token: _token
    });
    next();
  },

  updateData: (req, res, next) => {
    usersChar.findById(req.params.id, function(err, newUser) {
      if (!newUser) {
        res.status(404).send("data is not found");
      } else {
        console.log(newUser);
        newUser.name = req.body.name;
        newUser.user_name = req.body.user_name;
        newUser.password = req.body.password;
        newUser.avatar = req.body.avatar;
        newUser.address = req.body.address;
        newUser.location = req.body.location;
        newUser.phone = req.body.phone;
        newUser.status = req.body.status;

        newUser
          .save()
          .then(business => {
            res.json("update complate");
          })
          .catch(err => {
            res.status(404).send("Can't update the database");
          });
      }
    });
  },
  deleteData: (req, res, next) => {
    usersChar.findByIdAndRemove(
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
