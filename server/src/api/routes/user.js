const express = require("express");
const router = express.Router();
// DB driver & User model
const mongoose = require("mongoose");
const User = require("../../../models/user.model");

// home test
router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Handling requests to /user",
  });
});

// register new user
router.post("/register", (req, res, next) => {
  console.log(req.body);

  const { name, email, password } = req.body;

  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    name,
    email,
    password,
  });

  user
    .save()
    .then((result) => console.log(result))
    .catch((err) => console.log(err));

  res.status(201).json({
    message: "Handling POST requests to /user/register",
    createdUser: user,
  });
});

// login current user
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({
      email,
    });

    // user not existed
    if (!user) {
      return res.status(400).json({
        message: "User Does Not Exist!",
      });
    }

    // user existed & checking password
    const isMatch = password === user.password;

    if (!isMatch) {
      return res.status(400).json({
        message: "Incorrect Password!",
      });
    }

    res.status(200).json({
      message: "Handling POST requests to /user/login",
      queriedUser: user,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

module.exports = router;
