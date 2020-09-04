const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Room = require("../models/room.model");

const getRooms = async (req, res, next) => {
  let rooms = await Room.find({});

  if (rooms.length < 1) {
    return res.status(400).json({
      message: "no rooms",
    });
  }

  res.status(200).json({
    message: `success`,
    rooms,
  });

  next();
};

const createRoom = async (req, res, next) => {
  // - add validation for adminID does exist in users DB.
  // - add password for room.
  const { name, adminID, desc } = req.body;

  const room = new Room({
    _id: new mongoose.Types.ObjectId(),
    name,
    adminID,
    desc,
  });

  try {
    await room.save();
    res.status(200).json({
      message: "room created successfully",
      room,
    });
  } catch (err) {
    res.status(500).json({
      message: "room not created",
      error: err,
    });
  }

  next();
};

const editRoom = async (req, res, next) => {
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
};

const changeAdmin = async (req, res, next) => {
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
};

const uploadFiles = async (req, res, next) => {
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
};

const getFiles = async (req, res, next) => {
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
};

module.exports = {
  getRooms,
  createRoom,
  editRoom,
  changeAdmin,
  uploadFiles,
  getFiles,
};
