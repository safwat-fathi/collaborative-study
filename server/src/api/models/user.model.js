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

// attach static method to User model
// userSchema.statics.findByCredentials = async (email, password) => {
//   const user = await User.findOne({ email });

//   if (!user) {
//     return {
//       message: "Unable to login, Please check email or password",
//     };
//     // throw new Error("Unable to login, Please check email or password");
//   }

//   bcrypt.compare(password, user.password, (err, result) => {
//     if (err) {
//       return {
//         message: "Unable to login, Please check email or password",
//       };
//     }

//     return {
//       message: "login success",
//       user: result,
//     };
//   });
// };

userSchema.methods.comparePassword = function (candidatePassword, cb) {
  const user = this;

  bcrypt.compare(candidatePassword, user.password, function (err, isMatch) {
    if (err) {
      return cb(err);
    }

    cb(null, isMatch);
  });
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
