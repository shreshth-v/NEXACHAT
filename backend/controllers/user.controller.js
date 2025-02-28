import User from "../models/user.model.js";
import asyncWrapper from "../utils/asyncWrapper.js";
import CustomError from "../utils/customError.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcrypt";

export const registerUser = asyncWrapper(async (req, res) => {
  const { name, email, password, profilePic } = req.body;

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
    profilePic,
  });

  await newUser.save();

  const token = generateToken(newUser._id);

  res.cookie("token", token, {
    httpOnly: true, // Prevent Cross site scripting (XSS) error
    sameSite: "strict", // Prevent Cross site request forgrey (CSRF) error
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
    sameSite: "strict",
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

export const getProfile = (req, res) => {
  const { _id, name, email, profilePic } = req.user;
  res.status(200).json({
    _id,
    name,
    email,
    profilePic,
  });
};

export const logout = (req, res) => {
  res.cookie("token", "");
  res.status(200).json({ message: "Logout Successful" });
};
