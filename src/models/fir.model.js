import { firStatuses } from "../constants";
import { model, Schema } from "mongoose";

const firSchema = new Schema(
  {
    caseNo: {
      type: String,
      unique: true,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    datetime: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: firStatuses,
      default: "pending",
    },
    applicationType: {
      type: String,
      required: true,
    },
    complainantName: {
      required: true,
      type: String,
    },
    complainantCNIC: {
      required: true,
      type: String,
    },
    complainantPhone: {
      required: true,
      type: String,
    },
    complainantId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
    investigatorId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
    operatorId: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
    suspects: [
      {
        type: String,
      },
    ],
    relevantDocs: {
      url: {
        type: String,
      },
      public_id: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

export const FIR = model("FIRs", firSchema);
