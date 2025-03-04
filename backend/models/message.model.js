import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    chat: {
      type: Schema.Types.ObjectId,
      ref: "Chat",
    },
    text: {
      type: String,
    },
    image: {
      type: String,
      default: null,
    },
    file: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const Message = new mongoose.model("Message", messageSchema);
export default Message;
