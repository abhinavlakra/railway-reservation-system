import mongoose, { Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "please enter your username"],
    unique: [true, "username already taken! "],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "please enter your email!"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "please provide a valid email! "],
  },
  phone: {
    type: String,
    required: [true, "please enter your phone number!"],
  },
  password: {
    type: String,
    required: [true, "please enter your password!"],
  },
  confirmPassword: {
    type: String,
    required: [true, "please confirm your password!"],
    validate: {
      validator: function (x) {
        return x === this.password;
      },
      message: "Passwords does not match!",
    },
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

export const User = mongoose.model("User", userSchema);
