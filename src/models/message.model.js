import { model, Schema } from "mongoose";

const messageSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      required: true,
      type: Schema.Types.String,
    },
  },
  {
    timestamps: true,
  }
);

export const Message = model("Message", messageSchema);
