const express = require("express");
const router = express.Router();
// DB driver & User model
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const { use } = require("bcrypt/promises");

// get all users
router.get("/", (req, res, next) => {
  User.find()
    .select("-__v")
    .exec()
    .then((users) => {
      console.info(users);
      res.status(200).json({
        message: "all registered users",
        users,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        error: err,
      });
    });

  next();
});

// register new user
router.post("/register", async (req, res, next) => {
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
      user,
    });
  } catch (err) {
    res.status(400).json({
      message: err,
    });
  }

  next();
});

// login current user
router.post("/login", async (req, res, next) => {
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

    res.status(200).json({
      message: "login success",
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server Error",
    });
  }

  next();
});

module.exports = router;

/* 
- create a route for editing user data (email, password, name).
*/
