import { Router } from "express";
import {
  registration,
  login,
  logout,
  forgotPassword,
  resetPassword,
  changePassword,
} from "../controllers/userAuthController.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";

const router = Router();

router.route("/register").post(registration);
router.route("/forgotPassword").post(forgotPassword);
router.route("/resetPassword/:token").patch(resetPassword);
router.route("/changePassword").patch(verifyJWT, changePassword);
router.route("/login").post(login);
router.route("/logout").post(verifyJWT, logout);

export default router;
