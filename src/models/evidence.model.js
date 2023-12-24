import { Schema, model } from "mongoose";

const evidenceSchema = new Schema(
  {
    url: {
      type: String,
      required: true,
      trim: true,
    },
    public_id: {
      type: String,
      required: true,
      trim: true,
    },
    caseId: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: "FIRs",
    },
    fileType: {
      required: true,
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Evidence = model("Evidence", evidenceSchema);
