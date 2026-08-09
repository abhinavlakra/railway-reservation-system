import { Router } from "express";
import {
  registration,
  login,
  logout,
} from "../controllers/userAuthController.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";

const router = Router();

router.route("/register").post(registration);
router.route("/login").post(login);
router.route("/logout").post(verifyJWT, logout);

export default router;
