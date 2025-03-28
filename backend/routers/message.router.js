import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import {
  getMessages,
  sendMessage,
  sendMessageToAi,
} from "../controllers/message.controller.js";
import { upload } from "../middlewares/upload.js";

const router = express.Router();

router.get("/:chatId", verifyToken, getMessages);

router.post("/:chatId", verifyToken, upload.single("file"), sendMessage);

router.post("/ai/:chatId", verifyToken, sendMessageToAi);

export default router;
