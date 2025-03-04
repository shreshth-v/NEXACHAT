import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import { getMessages, sendMessage } from "../controllers/message.controller.js";
import { upload } from "../middlewares/upload.js";

const router = express.Router();

router.get("/:chatId", verifyToken, getMessages);

router.post("/:chatId", verifyToken, upload.single("file"), sendMessage);

export default router;
