import { Schema, model } from "mongoose";

const criminalSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    CNIC: {
      type: String,
      required: true,
      unique: true,
    },
    age: {
      type: Number,
      required: true,
    },
    image: {
      url: {
        type: String,
        required: true,
      },
      public_id: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

export const Criminal = model("Criminal", criminalSchema);
