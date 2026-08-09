import { Router } from "express";
import { registration, login } from "../controllers/userAuthController.js";

const router = Router();

router.route("/register").post(registration);
router.route("/login").post(login);

export default router;
