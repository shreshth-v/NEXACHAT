import { cloudinaryStreamUpload } from "../config/cloudinaryConfig.js";
import Chat from "../models/chat.model.js";
import Message from "../models/message.model.js";
import asyncWrapper from "../utils/asyncWrapper.js";
import CustomError from "../utils/customError.js";

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

  res.status(200).json(message);
});
