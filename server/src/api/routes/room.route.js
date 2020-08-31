const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const fs = require("fs");
const bcrypt = require("bcrypt");

// contorllers
const { getRooms, createRoom } = require("../controllers/room.controller");

// middleware
const auth = require("../middleware/auth");

// get all rooms
router.get("/", auth, getRooms);

// create room
router.post("/create", auth, createRoom);

// edit room
router.post("/edit", async (req, res, next) => {
  const { oldName, newName, desc } = req.body;

  let room = await Room.findOneAndUpdate(
    { name: oldName },
    { name: newName, desc: desc },
    { new: true, useFindAndModify: false }
  );

  if (!room) {
    return res.status(404).json({
      message: "no room found to edit",
    });
  }

  res.status(200).json({
    message: "room edited successfully",
    room,
  });

  next();
});

// change admin
router.post("/changeAdmin", async (req, res, next) => {
  const { oldAdminID, newAdminID } = req.body;

  let room = await Room.findOneAndUpdate(
    { adminID: oldAdminID },
    { adminID: newAdminID },
    { new: true, useFindAndModify: false }
  );

  if (!room) {
    return res.status(404).json({
      message: "no room found to edit",
    });
  }

  res.status(200).json({
    message: "room edited successfully",
    room,
  });

  next();
});

// -------------
// upload files
// -------------
router.post("/:id/uploads", auth, async (req, res, next) => {
  try {
    let room = await Room.findById(req.params.id);

    if (req.files === null || !room) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    let uploads = [];
    console.log(req.files);
    // if (req.files.uploads.length) {
    //   uploads = req.files.uploads;
    //   room.uploads = [...uploads, ...room.uploads];
    // } else {
    //   uploads = req.files.uploads;
    //   room.uploads = [uploads, ...room.uploads];
    // }

    // await room.save();

    // return res.status(200).send(room.uploads);
    return res.status(200).json({ message: "success" });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: err,
    });
  }

  next();
});

// -------------
// get uploaded files
// -------------
router.get("/:id/uploads", auth, async (req, res, next) => {
  try {
    let room = await Room.findById(req.params.id);

    if (!room || !room.uploads) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    return res.send(room.uploads);
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: err,
    });
  }

  next();
});

module.exports = router;
