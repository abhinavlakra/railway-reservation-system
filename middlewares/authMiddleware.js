import jwt from "jsonwebtoken";
import { catchAsync } from "../utils/asyncHandler.js";
import { AppError } from "../utils/appError.js";
import { User } from "../models/userModel.js";

export const verifyJWT = catchAsync(async (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return next(
      new AppError("No authentication token provided! please login.", 401),
    );
  }

  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  const user = await User.findById(decoded.id).select(
    "+password +refreshToken",
  );

  if (!user) {
    return next(new AppError("User no longer exists!", 401));
  }

  req.user = user;
  console.log(user.name);
  next();
});
