const User = require("../../../models/user.model");
const mongoose = require("mongoose");

module.exports = (app) => {
  // home test
  app.get("/", (req, res) => {
    res.send("hello from server!");
  });

  // register new user
  app.post("/userReg", (req, res) => {
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
      message: "Handling POST requests to /userReg",
      createdUser: user,
    });
  });

  // login current user
  app.post("/userLogin", async (req, res) => {
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
        message: "Handling POST requests to /userLogin",
        queriedUser: user,
      });
    } catch (err) {
      console.log(err);

      res.status(500).json({
        message: "Server Error",
      });
    }
  });
};
