import dotenv from "dotenv";
import app from "./app.js";
import connect from "./database/connect.js";

dotenv.config({ path: "./.env" });
const port = process.env.PORT;

// database connection.
connect();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
