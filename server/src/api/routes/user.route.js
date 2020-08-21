const express = require("express");
const router = express.Router();
const multer = require("multer");
// DB driver & User model
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

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
router.post("/edit", auth, async (req, res, next) => {
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
});

// -------------
// upload files
// -------------

// multer configs
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("asdasd");
    cb(null, "./src/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

let upload = multer({ storage }).single("file");

router.post(
  "/uploads",
  /* auth, */ (req, res, next) => {
    try {
      upload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
          return res.status(500).json({
            message: err,
          });
        } else if (err) {
          return res.status(500).json({
            message: err,
          });
        }

        return res.status(200).send(req.file);
      });
    } catch (err) {
      res.status(400).json({
        message: err,
      });
    }

    next();
  }
);

module.exports = router;

/* 
- create a route for editing user data (email, password, name).
*/
