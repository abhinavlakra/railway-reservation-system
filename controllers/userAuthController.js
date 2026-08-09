import { User } from "../models/userModel.js";
import { AppError } from "../utils/appError.js";
import { catchAsync } from "../utils/asyncHandler.js";

// User registration controller.
export const registration = catchAsync(async (req, res) => {
  const { name, email, password, confirmPassword, phone, role } = req.body;

  if (!name || !email || !password || !confirmPassword || !phone) {
    throw new AppError(
      "Missing required Fields❗, please enter all the fields.",
      400,
    );
  }

  const userExist = await User.findOne({ $or: [{ email }, { phone }] });
  if (userExist) {
    throw new AppError("A user with this email or phone already exists! ", 409);
  }

  const user = await User.create({
    name,
    email,
    phone,
    password,
    confirmPassword,
    role,
  });

  const accessToken = user.getAccessToken();
  const refreshToken = user.getRefreshToken();

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  const createdUser = await User.findById(user._id).select(
    " -password -refreshToken",
  );

  const cookieOptions = {
    httpOnly: true,
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  };

  res
    .status(201)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json({
      status: "success",
      user: createdUser,
      message: "User registered succesfully!",
    });
});

// user login controller
export const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new AppError("please enter all the fields!", 400);
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new AppError("Invalid email or password! ❌", 401);
  }

  const isPasswordCorrect = await user.comparePasswords(password);
  if (!isPasswordCorrect) {
    throw new AppError("Invalid email or password! ❌", 401);
  }

  const accessToken = user.getAccessToken();
  const refreshToken = user.getRefreshToken();

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  const loggedinUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );

  const cookieOptions = {
    httpOnly: true,
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  };

  res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json({
      status: "success",
      user: loggedinUser,
      message: "User logged in succesfully!",
    });
});

// user logout controller
export const logout = catchAsync(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.refreshToken = undefined;
    await user.save({ validateBeforeSave: false });
  }

  const cookieOptions = {
    httpOnly: true,
    secure: true,
  };

  res.clearCookie("accessToken", cookieOptions);
  res.clearCookie("refreshToken", cookieOptions);

  res.status(200).json({
    status: "Success",
    message: "Logged Out succesfully",
  });
});

// user forgot password controller.
export const forgotPassword = catchAsync(async (req, res) => {});

// user reset password controller.
export const resetPassword = catchAsync(async (req, res) => {});

// user change password controller.
export const changePassword = catchAsync(async (req, res) => {});
