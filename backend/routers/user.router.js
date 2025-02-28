import express from "express";
import {
  getProfile,
  loginUser,
  logout,
  registerUser,
} from "../controllers/user.controller.js";
import verifyToken from "../middlewares/verifyToken.js";
const router = express.Router();

router.post("/signup", registerUser);

router.post("/login", loginUser);

router.get("/profile", verifyToken, getProfile);

router.get("/logout", verifyToken, logout);

export default router;
