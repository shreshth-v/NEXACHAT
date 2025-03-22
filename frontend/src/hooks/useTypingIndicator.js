import { useEffect } from "react";
import { socket } from "../utils/socket";

const useTypingIndicator = (chatId, setTypingUser) => {
  useEffect(() => {
    const handleUserTyping = ({ chat: typingChat, user }) => {
      if (typingChat._id === chatId) {
        setTypingUser(user);
      }
    };

    const handleUserStoppedTyping = ({ chat: typingChat }) => {
      if (typingChat._id === chatId) {
        setTypingUser(null);
      }
    };

    socket.on("userTyping", handleUserTyping);
    socket.on("userStoppedTyping", handleUserStoppedTyping);

    return () => {
      socket.off("userTyping", handleUserTyping);
      socket.off("userStoppedTyping", handleUserStoppedTyping);
    };
  }, [chatId, setTypingUser]);
};

export default useTypingIndicator;
