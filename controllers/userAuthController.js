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
