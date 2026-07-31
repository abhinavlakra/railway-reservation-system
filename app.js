import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.status(200).send(" welcome to the server! ");
});

export default app;
