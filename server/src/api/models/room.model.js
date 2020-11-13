const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 20,
  },
  admin_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  is_private: {
    type: Boolean,
    default: false,
    required: false,
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
