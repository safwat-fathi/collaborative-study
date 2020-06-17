const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const userRoutes = require("./api/routes/user.route");
const roomRoutes = require("./api/routes/room.route");

app.use("/users", userRoutes);
app.use("/rooms", roomRoutes);

module.exports = app;
