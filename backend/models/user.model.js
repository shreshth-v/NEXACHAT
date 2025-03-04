import mongoose from "mongoose";
import { DEFAULT_USER_IMAGE } from "../utils/constants.js";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  profilePic: {
    type: String,
    default: DEFAULT_USER_IMAGE,
  },
});

const User = new mongoose.model("user", userSchema);
export default User;
