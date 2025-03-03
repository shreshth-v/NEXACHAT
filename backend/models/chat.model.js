import mongoose, { Schema } from "mongoose";

const checkIsGroupChat = function () {
  return this.isGroupChat;
};

const chatSchema = new mongoose.Schema({
  isGroupChat: {
    type: Boolean,
    require: true,
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
  },
  groupName: {
    type: String,
    require: checkIsGroupChat,
  },
  groupAdmin: {
    type: Schema.Types.ObjectId,
    ref: "User",
    require: checkIsGroupChat,
  },
  groupProfilePic: {
    type: String,
    require: checkIsGroupChat,
  },
});

const Chat = new mongoose.model("Chat", chatSchema);
export default Chat;
