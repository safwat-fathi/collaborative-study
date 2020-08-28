const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const { use } = require("bcrypt/promises");

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
    validator(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  password: {
    type: String,
    required: true,
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

userSchema.methods.getPublicProfile = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;

  return userObject;
};

// hash plain text password before saving
userSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) {
    return next();
  }

  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});

const User = mongoose.model("User", userSchema);

module.exports = User;
