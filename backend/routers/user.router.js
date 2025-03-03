import express from "express";
import {
  getProfile,
  loginUser,
  logout,
  registerUser,
  updateProfile,
} from "../controllers/user.controller.js";
import verifyToken from "../middlewares/verifyToken.js";
import { uploadImage } from "../middlewares/upload.js";
const router = express.Router();

router.post("/signup", uploadImage.single("profilePic"), registerUser);

router.post("/login", loginUser);

router.get("/profile", verifyToken, getProfile);

router.patch(
  "/profile",
  verifyToken,
  uploadImage.single("profilePic"),
  updateProfile
);

router.get("/logout", verifyToken, logout);

export default router;
