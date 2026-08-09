import { User } from "../models/userModel.js";
import { AppError } from "../utils/appError.js";
import { catchAsync } from "../utils/asyncHandler.js";

export const getUser = catchAsync(async (req, res, next) => {
  const thisUser = req.user;
  if (!thisUser) {
    throw new AppError("no user found!", 400);
  }

  res.status(200).json({
    status: "success",
    user: thisUser,
    message: "user retrieved succesfully",
  });
});
