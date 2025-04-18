import express from "express";
import {
  addUsersToGroup,
  createChat,
  createGroupChat,
  getAllChatsOfUser,
  leaveGroupChat,
  removeUserFromGroup,
  updateGroupChat,
} from "../controllers/chat.controller.js";
import verifyToken from "../middlewares/verifyToken.js";
import { uploadImage } from "../middlewares/upload.js";

const router = express.Router();

router.get("/", verifyToken, getAllChatsOfUser);

router.post("/", verifyToken, createChat);
router.post(
  "/group",
  verifyToken,
  uploadImage.single("groupProfilePic"),
  createGroupChat
);

router.patch("/group/add/:chatId", verifyToken, addUsersToGroup);
router.patch("/group/remove/:chatId", verifyToken, removeUserFromGroup);
router.patch("/group/leave/:chatId", verifyToken, leaveGroupChat);
router.patch(
  "/group/:chatId",
  verifyToken,
  uploadImage.single("groupProfilePic"),
  updateGroupChat
);

export default router;
