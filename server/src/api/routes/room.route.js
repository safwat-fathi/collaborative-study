const express = require("express");
const router = express.Router();

// contorllers
const {
  getRooms,
  createRoom,
  editRoom,
  changeAdmin,
  uploadFiles,
  getFiles,
} = require("../controllers/room.controller");

// middleware
const auth = require("../middleware/auth");

// -------------
// get all rooms
// -------------
router.get("/", auth, getRooms);

// -------------
// create room
// -------------
router.post("/create", auth, createRoom);

// -------------
// edit room
// -------------
router.post("/edit", auth, editRoom);

// -------------
// change admin
// -------------
router.post("/changeAdmin", auth, changeAdmin);

// -------------
// upload files
// -------------
router.post("/:id/uploads", auth, uploadFiles);

// -------------
// get uploaded files
// -------------
router.get("/:id/uploads", auth, getFiles);

module.exports = router;
