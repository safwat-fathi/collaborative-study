const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

// contorllers
const { register, edit, login } = require("../controllers/user.controller");

// register new user
router.post("/register", register);

// login current user
router.post("/login", login);

// edit user data
router.post("/edit", auth, edit);

module.exports = router;
