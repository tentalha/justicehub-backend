import { Schema, model } from "mongoose";

const evidenceSchema = new Schema(
  {
    url: {
      type: String,
      required: true,
      trim: true,
    },
    format: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Evidence = model("Evidence", evidenceSchema);
