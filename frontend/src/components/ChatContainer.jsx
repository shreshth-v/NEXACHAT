import React from "react";
import ChatContainerHeader from "./ChatContainerHeader";
import MessagesContainer from "./MessagesContainer";
import MessageSender from "./MessageSender";
import { useSelector } from "react-redux";
import ChatHeaderContainerGroup from "./ChatHeaderContainerGroup";

const ChatContainer = () => {
  const { activeChat } = useSelector((state) => state.chat);

  return (
    <div className="w-3/4 p-4">
      <div className="bg-base-100 w-full h-full rounded-xl flex flex-col">
        {activeChat.isGroupChat ? (
          <ChatHeaderContainerGroup />
        ) : (
          <ChatContainerHeader />
        )}
        <MessagesContainer />
        <MessageSender />
      </div>
    </div>
  );
};

export default ChatContainer;
