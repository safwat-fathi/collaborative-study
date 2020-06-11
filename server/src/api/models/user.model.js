const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    unique: false,
  },
  rooms: [
    {
      name: String,
      desc: String,
    },
  ],
  timestamps: {
    created_at: Date,
    updated_at: {
      type: Date,
      default: Date.now,
    },
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
