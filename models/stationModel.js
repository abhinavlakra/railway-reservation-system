import mongoose, { Schema } from "mongoose";

const stationSchema = new Schema(
  {
    code: {
      type: String,
      required: [true, "Please enetr the station code!"],
      unique: [true, "this code already exists!"],
      trim: true,
      uppercase: true,
    },
    name: {
      type: String,
      required: [true, "Please enter the name!"],
      unique: [true, "This station already exists!"],
      trim: true,
    },
    state: {
      type: String,
      required: [true, "please enter the State!"],
      trim: true,
    },
    city: {
      type: String,
      required: [true, "please enter the city name!"],
      trim: true,
    },
    coordinates: {
      type: [Number],
      required: [true, "please specify the coordinates!"],
    },
  },
  { timestamps: true },
);

export const Station = mongoose.model("Station", stationSchema);
