const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const decoded = jwt.verify(token, "aSuperSecret");
    const user = await User.findOne({ _id: decoded.userID });

    if (!user) {
      res.status(401).json({
        message: err,
      });
    }

    req.user = user.getPublicProfile();

    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err,
    });
  }
};

module.exports = auth;
