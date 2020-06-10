const express = require("express");
const router = express.Router();
// DB driver & User model
const mongoose = require("mongoose");
const User = require("../../../models/user");

// home test
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
});

// register new user
router.post("/register", (req, res, next) => {
  const { name, email, password } = req.body;

  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    name,
    email,
    password,
  });

  user
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Handling POST requests to /user/register",
        createdUser: result,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        error: err,
      });
    });

  // next();
});

// login current user
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({
    email,
  })
    .select("-__v")
    .exec()
    .then((user) => {
      console.info(`From DB: ${user}`);
      // user does not exist
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
      // user existed
      res.status(200).json({
        message: "Handling POST requests to /user/login",
        queriedUser: user,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err,
      });
    });
});

module.exports = router;
