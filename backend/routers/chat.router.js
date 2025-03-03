import express from "express";
import {
  addUsersToGroup,
  createChat,
  createGroupChat,
  getAllChatsOfUser,
  removeUserFromGroup,
  updateGroupChat,
} from "../controllers/chat.controller.js";
import verifyToken from "../middlewares/verifyToken.js";
import { uploadImage } from "../middlewares/upload.js";

const router = express.Router();

router.get("/", verifyToken, getAllChatsOfUser);

router.post("/create", verifyToken, createChat);
router.post(
  "/group/create",
  verifyToken,
  uploadImage.single("groupProfilePic"),
  createGroupChat
);

router.patch("/group/add/:chatId", verifyToken, addUsersToGroup);
router.patch("/group/remove/:chatId", verifyToken, removeUserFromGroup);
router.patch(
  "/group/:chatId",
  verifyToken,
  uploadImage.single("groupProfilePic"),
  updateGroupChat
);

export default router;
