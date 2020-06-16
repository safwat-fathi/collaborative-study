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
});
// compiling a model
const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
