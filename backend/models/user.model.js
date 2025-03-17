import mongoose from "mongoose";
import { DEFAULT_USER_IMAGE } from "../utils/constants.js";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
    default: DEFAULT_USER_IMAGE,
  },
});

const User = mongoose.model("User", userSchema);
export default User;
