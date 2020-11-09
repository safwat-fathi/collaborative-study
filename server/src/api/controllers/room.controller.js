const mongoose = require("mongoose");
// const validator = require("validator");

const Room = require("../models/room.model");
const User = require("../models/user.model");

const getRooms = async (req, res, next) => {
  let rooms = await Room.find({});

  if (rooms.length < 1) {
    res.status(200).json({
      message: "no rooms found",
    });
  } else {
    res.status(200).json({
      message: `success`,
      data: rooms,
    });
  }

  next();
};

const createRoom = async (req, res, next) => {
  // - add validation for adminID does exist in users DB.
  // - add password for room.
  try {
    const { name, admin_id, desc, is_private, password } = req.body;

    // check is room already created
    let roomFromDB = await Room.findOne({ name });
    // check is owner exist
    let roomOwner = await User.findOne({ _id: admin_id });

    // room not created and user exist
    if (!roomFromDB && roomOwner) {
      const newRoom = new Room({
        _id: new mongoose.Types.ObjectId(),
        name,
        admin_id,
        desc,
        is_private,
        password,
      });

      await newRoom.save();

      // update roomOwner document and push newRoom to rooms_created
      roomOwner.rooms_created.push(newRoom);

      await roomOwner.save();

      res.status(201).json({
        message: "room created successfully",
        data: { newRoom, roomOwner },
      });
    } else {
      res.status(400).json({
        message: "room does exist or username is not correct",
        data: roomFromDB,
      });
    }
  } catch (err) {
    console.log(err);
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
    data: room,
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
    data: room,
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
