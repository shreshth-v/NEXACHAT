import { cloudinaryStreamUpload } from "../config/cloudinaryConfig.js";
import Chat from "../models/chat.model.js";
import User from "../models/user.model.js";
import asyncWrapper from "../utils/asyncWrapper.js";
import CustomError from "../utils/customError.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";
import { io, onlineUsers } from "../utils/socket.js";

export const registerUser = asyncWrapper(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new CustomError(400, "All fields are required");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) throw new CustomError(400, "User already exist");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });

  // Update User profile pic
  if (req.file) {
    const response = await cloudinaryStreamUpload(req);
    newUser.profilePic = response.secure_url;
  }

  await newUser.save();

  const token = generateToken(newUser._id);

  res.cookie("token", token, {
    httpOnly: true, // Prevent Cross site scripting (XSS) error
    sameSite: "none", // Prevent Cross site request forgrey (CSRF) error
    maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie will expire in 7 days
    secure: process.env.NODE_ENV === "production", // Use (https) in Production mode else (http)
  });

  res.status(201).json({
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    profilePic: newUser.profilePic,
  });
});

export const loginUser = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    throw new CustomError(400, "Credentials are required");

  const user = await User.findOne({ email });
  if (!user) throw new CustomError(400, "User does not exist");

  const checkPassword = await bcrypt.compare(password, user.password);
  if (!checkPassword) throw new CustomError(400, "Incorrect Password");

  const token = generateToken(user._id);

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    secure: process.env.NODE_ENV === "production",
  });

  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    profilePic: user.profilePic,
  });
});

export const checkAuth = (req, res) => {
  const { _id, name, email, profilePic } = req.user;
  res.status(200).json({
    _id,
    name,
    email,
    profilePic,
  });
};

export const updateProfile = asyncWrapper(async (req, res) => {
  const { _id } = req.user;

  const { name } = req.body;
  if (!name) throw new CustomError(400, "Name is required");

  const user = await User.findById(_id).select("-password");
  if (!user) throw new CustomError(400, "User not found");

  user.name = name;

  if (req.file) {
    const response = await cloudinaryStreamUpload(req);
    user.profilePic = response.secure_url;
  }

  await user.save();

  // Fetch all chats where the current user is present
  const allChats = await Chat.find({ users: user._id });

  const otherUsers = new Set();

  allChats.forEach((chat) => {
    chat.users.forEach((userId) => {
      if (userId.toString() !== user._id.toString()) {
        otherUsers.add(userId.toString());
      }
    });
  });

  otherUsers.forEach((userId) => {
    const socketId = onlineUsers.get(userId);
    if (socketId) {
      io.to(socketId).emit("userProfileUpdated", { user });
    }
  });

  res.status(200).json(user);
});

export const searchUser = asyncWrapper(async (req, res) => {
  const { input } = req.query;
  if (!input) return res.status(200).json([]);

  const { _id: loggedInUserId } = req.user;

  const users = await User.find({ name: { $regex: input, $options: "i" } });

  const filteredUsers = users.filter(
    (user) => !loggedInUserId.equals(user._id)
  );

  res.status(200).json(filteredUsers);
});

export const logout = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    sameSite: "none",
    secure: process.env.NODE_ENV === "production",
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logout Successful" });
};
