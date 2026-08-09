import { Router } from "express";
import { getUser } from "../controllers/userController.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";

const router = Router();

router.route("/getUser").get(verifyJWT, getUser);

export default router;
