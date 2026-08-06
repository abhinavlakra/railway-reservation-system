import mongoose, { Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
    select: false,
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
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  refreshToken: {
    type: String,
  },
});

// password encryption prehook.
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return;
  }

  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
});

// user access token.
userSchema.methods.getAccessToken = function () {
  return jwt.sign(
    {
      id: this._id,
      role: this.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    },
  );
};

// user refresh token.
userSchema.methods.getRefreshToken = function () {
  return jwt.sign(
    {
      id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    },
  );
};

// user pasword verification.
userSchema.methods.comparePasswords = function (enteredPassword) {
  const check = bcrypt.compare(enteredPassword, this.password);
  return check;
};

export const User = mongoose.model("User", userSchema);
