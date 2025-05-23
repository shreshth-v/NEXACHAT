import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDb from "./utils/db.js";
import authRoutes from "./routers/auth.router.js";
import chatRoutes from "./routers/chat.router.js";
import messageRoutes from "./routers/message.router.js";
import cors from "cors";
import { app, server } from "./utils/socket.js";

dotenv.config();
// const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

server.listen(process.env.PORT, () => {
  console.log(`App is listening on PORT : ${process.env.PORT}`);
  connectDb();
});

app.get("/", (req, res) => {
  res.send("Home");
});

app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Some went wrong" } = err;
  res.status(statusCode).json({ message });
});
