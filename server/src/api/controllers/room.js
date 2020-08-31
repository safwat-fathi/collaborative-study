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

module.exports = { getRooms, createRoom };
