const express = require("express");
const router = express.Router();
// DB driver & User model
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

// testing JWT token
// router.get("/room", auth, (req, res, next) => {
//   try {
//     console.log("authenticated");
//     res.status(200).json({
//       message: "success",
//     });
//   } catch (err) {
//     console.error("not authenticated");
//     res.status(200).json({
//       message: "failed",
//       error: err,
//     });
//   }
// });

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
});

// edit user data
router.post("/edit", auth, (req, res, next) => {
  // get user ID.
  // search DB by ID.
  // get old & new password (confirmed) - email - name.
  // update DB with these new entries.
  next();
});

module.exports = router;

/* 
- create a route for editing user data (email, password, name).
*/
