const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");

const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    name,
    email,
    password,
    timestamps: {
      created_at: Date.now(),
    },
  });

  try {
    await user.save();
    res.status(201).json({
      message: "user registered successfully",
    });
  } catch (err) {
    res.status(400).json({
      message: err,
    });
  }

  next();
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "login failed",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "login failed",
      });
    }

    const token = jwt.sign(
      {
        userID: user._id,
        userName: user.name,
        userEmail: user.email,
      },
      "aSuperSecret",
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({
      message: "login success",
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server Error",
    });
  }

  next();
};

const edit = async (req, res, next) => {
  try {
    const { email, type, name, oldPassword, newPassword } = req.body;

    switch (type) {
      case "name":
        // finding by email and changing Document name with given name
        // in the req.body
        await User.findOneAndUpdate(
          { email },
          { name },
          {
            new: true,
          }
        );
        break;
      // ===================
      // ===================
      case "password":
        // find user
        let user = await User.findOne({ email });
        // check old password
        let isMatch = await bcrypt.compare(oldPassword, user.password);

        if (!isMatch) {
          return res.status(400).json({
            message: "password not matched",
          });
        }

        // update password
        user.password = newPassword;
        await user.save();
        console.log(user);
        break;
      default:
        break;
    }
    //
    res.status(201).json({
      message: "success",
    });
  } catch (err) {
    res.status(400).json({
      message: err,
    });
  }

  next();
};

module.exports = {
  register,
  login,
  edit,
};
