const mongoose = require("mongoose");
const validator = require("validator");
// eslint-disable-next-line import/no-extraneous-dependencies
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name!"],
    trim: true,
    minlenght: [6, "A user name must have more or equalt than 6 characters"],
    maxlenght: [40, "A user name must have less or equalt than 40 characters"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email!"],
    trim: true,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provida a valid email!"],
  },
  photo: String,
  role: {
    type: String,
    enum: ["user", "guide", "lead-guide", "admin"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "Please provide a password!"],
    minlenght: [8, "A user name must have more or equal than 8 characters"],
    trim: true,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: true,
    minlenght: [8, "A user name must have more or equal than 8 characters"],
    trim: true,
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Password and confirm password must match!",
    },
    savedSearches: {
      type: String,
    },
  },
  passwordChangedAt: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    console.log(changedTimeStamp);

    return JWTTimestamp < changedTimeStamp;
  }

  return false;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
