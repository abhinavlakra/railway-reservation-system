import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.status(200).send(" welcome to the server! ");
});

app.use(express.json());

import authRoute from "./routes/userAuthRoutes.js";

app.use("/api/v1/auth/", authRoute);

export default app;
