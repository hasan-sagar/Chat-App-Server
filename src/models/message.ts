import mongoose, { Schema, InferSchemaType } from "mongoose";

const messageSchema = new Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
      trim: true,
    },
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
    },
  },
  { timestamps: true }
);

type message = InferSchemaType<typeof messageSchema>;

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
