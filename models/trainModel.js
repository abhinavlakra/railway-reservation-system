import mongoose, { Schema } from "mongoose";

const trainSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "please specify the name !"],
      unique: [true, "This train already exists!"],
      trim: true,
    },
    trainNumber: {
      type: String,
      required: [true, "please specify the train number!"],
      unique: [true, "this train number already exists!"],
    },
    startStation: {
      type: Schema.Types.ObjectId,
      ref: "Station",
      required: [true, "source station is required!"],
    },
    destination: {
      type: Schema.Types.ObjectId,
      ref: "Station",
      required: [true, "destination is required!"],
    },
    stops: {
      type: [Schema.Types.ObjectId],
      ref: "Station",
    },
    status: {
      type: String,
      enum: ["Running", "not Running"],
      default: "not Running",
    },
  },
  { timestamps: true },
);

export const Train = mongoose.model("Train", trainSchema);
