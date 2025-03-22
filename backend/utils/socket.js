import express from "express";
import http from "http";
import { Server } from "socket.io";

export const app = express();

export const server = http.createServer(app);

export const io = new Server(server, {
  cors: { origin: "http://localhost:5173" },
});

export const onlineUsers = new Map();

const emitToChatUsers = (event, { chat, user }) => {
  chat.users.forEach((userInfo) => {
    if (userInfo._id.toString() !== user._id.toString()) {
      const socketId = onlineUsers.get(userInfo._id.toString());
      if (socketId) {
        io.to(socketId).emit(event, { chat, user });
      }
    }
  });
};

io.on("connection", (socket) => {
  // console.log(`User connected: Socket ID = ${socket.id}`);
  const userId = socket.handshake.auth?.userId;

  if (userId) {
    onlineUsers.set(userId, socket.id);
    io.emit("onlineUsers", Array.from(onlineUsers.keys()));
  }

  socket.on("typing", (data) => emitToChatUsers("userTyping", data));

  socket.on("stopTyping", (data) => emitToChatUsers("userStoppedTyping", data));

  socket.on("disconnect", () => {
    if (userId) {
      onlineUsers.delete(userId);
      io.emit("onlineUsers", Array.from(onlineUsers.keys()));
    }
  });
});
