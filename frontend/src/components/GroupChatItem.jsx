import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveChat } from "../features/chat/chatSlice";
import useTypingIndicator from "../hooks/useTypingIndicator";
import { socket } from "../utils/socket";
import useUnreadMessage from "../hooks/useUnreadMessage";

const GroupChatItem = ({ chat }) => {
  const { activeChat } = useSelector((state) => state.chat);

  const dispatch = useDispatch();

  const isChatSelected = chat._id === activeChat?._id;

  // Handle Typing
  const [typingUser, setTypingUser] = useState(null);
  useTypingIndicator(chat._id, setTypingUser);

  // Handle unread message state
  const [unreadMessageCount, setUnreadMessageCount] = useState(0);
  useUnreadMessage(chat, setUnreadMessageCount);

  return (
    <li
      className={`list-row cursor-pointer 
            ${isChatSelected ? "hover:bg-primary" : "hover:bg-indigo-900"}
            ${isChatSelected ? "bg-primary" : ""}`}
      onClick={() => {
        dispatch(setActiveChat(chat));
        setUnreadMessageCount(0);
      }}
    >
      <div>
        <img className="size-10 rounded-full" src={chat.groupProfilePic} />
      </div>

      <div className="flex flex-col justify-center">
        <div>{chat.groupName}</div>
        {/* latest message */}
        {chat.latestMessage && !typingUser && (
          <div className="text-xs text-gray-300">
            {chat?.latestMessage?.owner && (
              <span>{chat?.latestMessage?.owner?.name}: </span>
            )}
            {chat?.latestMessage?.text?.length > 25
              ? `${chat.latestMessage.text.slice(0, 25)}...`
              : chat.latestMessage?.text}
          </div>
        )}
        {/* Typing */}
        {typingUser && (
          <div className="text-xs text-gray-300">
            {typingUser.name} is typing{" "}
            <span className="loading loading-dots loading-xs"></span>
          </div>
        )}
      </div>

      <div className="flex items-center">
        {unreadMessageCount > 0 && (
          <div className="bg-indigo-500 text-center w-5 rounded-full">
            {unreadMessageCount}
          </div>
        )}
      </div>
    </li>
  );
};

export default GroupChatItem;
