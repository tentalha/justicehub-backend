import { Schema, model } from "mongoose";

const tokenSchema = new Schema({
  token: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 5,
  },
});

export const Token = model("Token", tokenSchema);
