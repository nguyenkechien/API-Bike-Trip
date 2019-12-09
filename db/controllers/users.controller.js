const {
  usersChar,
  validateUser,
  validateLoginUser
} = require("../models/user.model");
const bcrypt = require("bcrypt");


module.exports = {
  getApiUsers: (req, res, next) => {
    if (req.user.isAdmin) {
      usersChar.find((err, users) => {
        if (err) {
          console.log(`Can't get API : ${err}`);
        } else {
          res.json(users);
        }
      });
    }
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
    newUser.password = await bcrypt.hashSync(newUser.password, 1);
    try {
      const user = await newUser.save();

      const _token = newUser.generateAuthToken();

      res.header("x-auth-token", _token).send({
        _id: user._id,
        fullname: user.fullname,
        location: user.location,
        email: user.email,
        isAdmin: user.isAdmin,
        avatar: user.avatar,
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

    const origin = req.headers.referer;

    const path = origin.split(/[/]/)

    if (path[3] === "login") {
      if (!user.isAdmin) {
        return res.status(400).send({
          message: "You do not have access."
        });
      }
    }

    const _token = user.generateAuthToken();

    res.header("x-auth-token", _token).send({
      _id: user._id,
      fullname: user.fullname,
      location: user.location,
      email: user.email,
      isAdmin: user.isAdmin,
      avatar: user.avatar,
      _token: _token
    });
    next();
  },

  getIdData: async (req, res, next) => {
    let id = req.params.id;
    const findByIdUser = await usersChar.findById(id, business => {
      return business;
    });

    try {
      res.status(200).json(findByIdUser);
    } catch (error) {
      res.status(400).send({
        message: `Error ID`
      });
      console.log(`Error _ID : ${error}`);
    }
  },

  updateData: async (req, res, next) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(401).send(error.details[0].message);
    let id = req.params.id;
    const findByIdUser = await usersChar.findById(
      id,
      (err, updateUser) => {
        if (!updateUser) {
          return res.status(404).send("data is not found");
        } else {
          updateUser.fullname = req.body.fullname;
          updateUser.user_name = req.body.user_name;
          updateUser.password = req.body.password;
          updateUser.email = req.body.email;
          updateUser.avatar = req.body.avatar;
          updateUser.address = req.body.address;
          updateUser.location = req.body.location;
          updateUser.phone = req.body.phone;
          updateUser.status = req.body.status;
          updateUser.isAdmin = req.body.isAdmin;
          
          updateUser.password = bcrypt.hashSync(updateUser.password, 1);
  
          updateUser.save();

          try {
            console.log(updateUser);
            res.status(200).json({
              message: "update complate",
              business: updateUser
            });
          } catch (error) {
            res.status(404).send("data is not found");
            console.log(error);
          }
          return updateUser;
        }
      }
    );
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
