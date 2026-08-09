import express from "express";
import cookieParser from "cookie-parser";

const app = express();

app.get("/", (req, res) => {
  res.status(200).send(" welcome to the server! ");
});

app.use(express.json());
app.use(cookieParser());

import authRoute from "./routes/userAuthRoutes.js";
import userRoute from "./routes/userRoutes.js";

app.use("/api/v1/auth/", authRoute);
app.use("/api/v1/users/", userRoute);

export default app;
