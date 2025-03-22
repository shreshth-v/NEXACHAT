import mongoose, { Schema } from "mongoose";

const checkIsGroupChat = function () {
  return this.isGroupChat;
};

const chatSchema = new Schema(
  {
    isGroupChat: {
      type: Boolean,
      required: true,
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    latestMessage: {
      type: Schema.Types.ObjectId,
      ref: "Message",
      default: null,
    },
    groupName: {
      type: String,
      required: checkIsGroupChat,
    },
    groupAdmin: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: checkIsGroupChat,
    },
    groupProfilePic: {
      type: String,
      required: checkIsGroupChat,
    },
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", chatSchema);
export default Chat;
