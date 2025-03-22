import React, { useEffect, useState } from "react";
import ChatContainerHeader from "./ChatContainerHeader";
import MessagesContainer from "./MessagesContainer";
import MessageSender from "./MessageSender";
import { useSelector } from "react-redux";
import ChatHeaderContainerGroup from "./ChatHeaderContainerGroup";
import { socket } from "../utils/socket";

const ChatContainer = () => {
  const { activeChat } = useSelector((state) => state.chat);
  const [typingUser, setTypingUser] = useState(null);

  // Handle typing in chat header
  useEffect(() => {
    const handleUserTyping = ({ chat, user }) => {
      if (chat._id === activeChat._id) {
        setTypingUser(user);
      }
    };
    const handleUserStoppedTyping = ({ chat, user }) => {
      if (chat._id === activeChat._id) {
        setTypingUser(null);
      }
    };

    socket.on("userTyping", handleUserTyping);
    socket.on("userStoppedTyping", handleUserStoppedTyping);

    return () => {
      socket.off("userTyping", handleUserTyping);
      socket.off("userStoppedTyping", handleUserStoppedTyping);
    };
  }, [activeChat]);

  return (
    <div className="w-3/4 p-4">
      <div className="bg-base-100 w-full h-full rounded-xl flex flex-col">
        {activeChat.isGroupChat ? (
          <ChatHeaderContainerGroup typingUser={typingUser} />
        ) : (
          <ChatContainerHeader typingUser={typingUser} />
        )}
        <MessagesContainer />
        <MessageSender />
      </div>
    </div>
  );
};

export default ChatContainer;
