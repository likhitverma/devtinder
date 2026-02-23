const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email Address");
        }
      },
    },
    photoUrl: {
      type: String,
      validate(value) {
        if (!validator.isURL) {
          throw new Error("Invalid Photo URL");
        }
      },
      default:
        "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png",
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
      validate: function validate(value) {
        const allowed = ["Male", "Female", "Others"];
        if (!allowed.includes(value)) {
          throw new Error("Enter a valid gender among: Male, Female, Others");
        }
      },
    },
    about: {
      type: String,
      default: "This is a default about of User.",
    },
    skills: {
      type: [String],
      default: ["JavaScript", "NodeJS"],
    },
  },
  { timestamps: true },
);

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = jwt.sign({ id: user._id }, "DevTinder@123", {
    expiresIn: "1h",
  });
  return token;
};

userSchema.methods.validatePassword = async function (passwordByUser) {
  const user = this;
  const isPasswordValid = await bcrypt.compare(passwordByUser, user.password);
  return isPasswordValid;
};

module.exports = mongoose.model("Users", userSchema);
