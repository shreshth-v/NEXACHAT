import { cloudinaryStreamUpload } from "../config/cloudinaryConfig.js";
import Chat from "../models/chat.model.js";
import asyncWrapper from "../utils/asyncWrapper.js";
import CustomError from "../utils/customError.js";
import { DEFAULT_GROUP_IMAGE } from "../utils/constants.js";

export const createChat = asyncWrapper(async (req, res) => {
  const user = req.user;

  const { otherUserId } = req.body;
  if (!otherUserId)
    throw new CustomError(400, "Select atleast one user to create a chat");

  const existingChat = await Chat.findOne({
    $and: [
      { isGroupChat: false },
      { users: { $all: [user._id, otherUserId] } },
    ],
  });
  if (existingChat) throw new CustomError(400, "Chat already exist");

  const newChat = new Chat({
    isGroupChat: false,
    users: [user._id, otherUserId],
  });

  await newChat.save();
  await newChat.populate("users", "-password");

  res.status(201).json(newChat);
});

export const createGroupChat = asyncWrapper(async (req, res) => {
  const user = req.user;

  const { otherUsersIds, groupName } = req.body;

  if (!otherUsersIds || otherUsersIds.length < 1)
    throw new CustomError(400, "Select one user to create a group chat");

  if (!groupName) throw new CustomError(400, "Group name is required");

  const newGroupChat = new Chat({
    isGroupChat: true,
    users: [user._id, ...otherUsersIds],
    groupName,
    groupAdmin: user._id,
    groupProfilePic: DEFAULT_GROUP_IMAGE,
  });

  // Update Group profile pic
  if (req.file) {
    const response = await cloudinaryStreamUpload(req);
    newGroupChat.groupProfilePic = response.secure_url;
  }

  await newGroupChat.save();
  await newChat.populate("users", "-password");

  res.status(201).json(newGroupChat);
});

export const addUsersToGroup = asyncWrapper(async (req, res) => {
  const { chatId } = req.params;
  const user = req.user;
  const { usersToAddIds } = req.body;

  const groupChat = await Chat.findOne({ _id: chatId });
  if (!groupChat) throw new CustomError((400, "Group chat does not exist"));

  if (!user._id.equals(groupChat.groupAdmin))
    throw new CustomError((400, "Only admin can add the users to the group"));

  groupChat.users = [...groupChat.users, ...usersToAddIds];

  await groupChat.save();
  await groupChat.populate("users", "-password");
  await groupChat.populate({
    path: "latestMessage",
    populate: {
      path: "owner",
      select: "-password",
    },
  });

  res.status(200).json(groupChat);
});

export const removeUserFromGroup = asyncWrapper(async (req, res) => {
  const { chatId } = req.params;
  const user = req.user;
  const { userToRemoveId } = req.body;

  const groupChat = await Chat.findOne({ _id: chatId });
  if (!groupChat) throw new CustomError((400, "Group chat does not exist"));

  if (!user._id.equals(groupChat.groupAdmin))
    throw new CustomError(
      (400, "Only admin can remove the users from the group")
    );

  const filteredUsersIds = groupChat.users.filter(
    (userId) => !userId.equals(userToRemoveId)
  );

  groupChat.users = [...filteredUsersIds];

  await groupChat.save();
  await groupChat.populate("users", "-password");
  await groupChat.populate({
    path: "latestMessage",
    populate: {
      path: "owner",
      select: "-password",
    },
  });

  res.status(200).json(groupChat);
});

export const updateGroupChat = asyncWrapper(async (req, res) => {
  const { chatId } = req.params;
  const user = req.user;
  const { groupName } = req.body;

  const groupChat = await Chat.findOne({ _id: chatId });
  if (!groupChat) throw new CustomError((400, "Group chat does not exist"));

  if (!user._id.equals(groupChat.groupAdmin))
    throw new CustomError((400, "Only admin can update the group information"));

  groupChat.groupName = groupName;

  // Update Group profile pic
  if (req.file) {
    const response = await cloudinaryStreamUpload(req);
    groupChat.groupProfilePic = response.secure_url;
  }

  await groupChat.save();
  await groupChat.populate("users", "-password");
  await groupChat.populate({
    path: "latestMessage",
    populate: {
      path: "owner",
      select: "-password",
    },
  });

  res.status(200).json(groupChat);
});

export const getAllChatsOfUser = asyncWrapper(async (req, res) => {
  const user = req.user;

  const allChats = await Chat.find({ users: user._id })
    .sort({
      updatedAt: -1,
    })
    .populate({
      path: "users",
      select: "-password",
    })
    .populate({
      path: "latestMessage",
      populate: {
        path: "owner",
        select: "-password",
      },
    });

  res.status(200).json(allChats);
});
