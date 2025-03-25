import { io } from "socket.io-client";
import { setOnlineUsers } from "../features/auth/authSlice.js";

export const socket = io("http://localhost:5000", {
  autoConnect: false,
});

export const connectSocket = async (userId) => {
  if (userId && !socket.connected) {
    socket.auth = { userId };
    socket.connect();

    const { store } = await import("../app/store");

    // online users
    socket.on("onlineUsers", (users) => {
      store.dispatch(setOnlineUsers(users));
    });
  }
};

export const disconnectSocket = () => {
  socket.disconnect();
};
