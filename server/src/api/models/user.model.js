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

// attach static method to User model
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Unable to login, Please check email or password");
  }

  const isMatch = bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Unable to login, Please check email or password");
  }
};

// hash plain text password before saving
userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10, (err, hash) => {
      if (err) {
        return next(err);
      }
      return hash;
    });
  }

  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
