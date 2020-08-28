const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
  },
  adminID: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: false,
  },
  desc: {
    type: String,
    required: false,
    trim: true,
  },
  members: [
    {
      id: String,
      name: String,
    },
  ],
  uploads: [],
});
// compiling a model
const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
