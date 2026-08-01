import { Router } from "express";
import { registration } from "../controllers/userAuthController.js";

const router = Router();

console.log(registration);
router.route("/register").post(registration);

export default router;
