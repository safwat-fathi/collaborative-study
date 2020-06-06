const User = require("../../../models/user.model");
const mongoose = require("mongoose");

module.exports = (app) => {
  // home test
  app.get("/", (req, res) => {
    res.send("hello from server!");
  });

  // POST test
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
};
