import { cloudinaryStreamUpload } from "../config/cloudinaryConfig.js";
import Chat from "../models/chat.model.js";
import Message from "../models/message.model.js";
import asyncWrapper from "../utils/asyncWrapper.js";
import CustomError from "../utils/customError.js";
import { io, onlineUsers } from "../utils/socket.js";

export const getMessages = asyncWrapper(async (req, res) => {
  const { chatId } = req.params;

  if (!chatId) throw new CustomError(400, "Chat id not found");

  const allMessages = await Message.find({ chat: chatId })
    .sort({
      createdAt: 1,
    })
    .populate({
      path: "owner",
      select: "-password",
    });

  res.status(200).json(allMessages);
});

export const sendMessage = asyncWrapper(async (req, res) => {
  const user = req.user;

  const { chatId } = req.params;
  if (!chatId) throw new CustomError(400, "Chat id not found");

  const { text, fileName } = req.body;

  const chat = await Chat.findById(chatId);
  if (!chat) throw new CustomError(404, "Chat not found");

  const message = new Message({
    owner: user._id,
    chat: chatId,
    text,
    fileName,
  });

  // Upload image or file
  if (req.file) {
    const response = await cloudinaryStreamUpload(req);

    if (req.file.mimetype.startsWith("image")) {
      message.image = response.secure_url;
    } else {
      message.file = response.secure_url;
    }
  }

  await message.save();
  await message.populate("owner");
  await Chat.findByIdAndUpdate(chatId, { latestMessage: message._id });

  if (chat.isGroupChat) {
    chat.users.forEach((userId) => {
      if (userId.toString() !== user._id.toString()) {
        // Avoid sending to self
        const socketId = onlineUsers.get(userId.toString());
        if (socketId) {
          io.to(socketId).emit("receiveMessage", { chatId, message });
        }
      }
    });
  } else {
    const receiverId = chat.users.find(
      (id) => id.toString() !== user._id.toString()
    );

    if (receiverId) {
      const receiverSocketId = onlineUsers.get(receiverId.toString());
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("receiveMessage", { chatId, message });
      }
    }
  }

  res.status(200).json(message);
});
