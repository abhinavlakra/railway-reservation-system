import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const DB_Uri = process.env.DB;

const connect = async () => {
  try {
    await mongoose.connect(DB_Uri);
    console.log("Database connected sucessfully! ✅");
  } catch (err) {
    console.log(" Database connection failed! ❌", err);
    process.exit(1);
  }
};

export default connect;
