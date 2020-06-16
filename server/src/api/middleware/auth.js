const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const decoded = jwt.verify(token, "aSuperSecret");
    req.user = decoded;

    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({
      message: "login failed",
      error: err,
    });
  }
};
