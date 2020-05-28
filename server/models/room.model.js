const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
		name: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			minlength: 3,
		}
		roomID: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			minlength: 3,
		}
	},
  {
    timestamps: true,
  }
);
// compiling a model
const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
