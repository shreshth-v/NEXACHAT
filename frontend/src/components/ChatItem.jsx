import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveChat } from "../features/chat/chatSlice";
import useTypingIndicator from "../hooks/useTypingIndicator";
import useUnreadMessage from "../hooks/useUnreadMessage";

const ChatItem = ({ chat }) => {
  const { authUser, onlineUsers } = useSelector((state) => state.auth);
  const { activeChat } = useSelector((state) => state.chat);
  const otherUser = chat.users.find((user) => user._id !== authUser._id);

  const dispatch = useDispatch();

  const isChatSelected = chat._id === activeChat?._id;

  const isOnline = onlineUsers.includes(otherUser._id);

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
      <div className="indicator indicator-bottom relative">
        <img className="size-10 rounded-full" src={otherUser.profilePic} />
        {isOnline && (
          <span className="indicator-item status status-success absolute mb-1.5 mr-1"></span>
        )}
      </div>

      <div className="flex flex-col justify-center">
        <div>{otherUser.name}</div>
        {/* latest message */}
        {chat.latestMessage && !typingUser && (
          <div className="text-xs text-gray-300">
            {chat?.latestMessage?.owner._id === authUser._id && (
              <span>You: </span>
            )}
            {chat?.latestMessage?.text?.length > 30
              ? `${chat.latestMessage.text.slice(0, 30)}...`
              : chat.latestMessage?.text}
          </div>
        )}
        {/* Typing */}
        {typingUser && (
          <div className="text-xs text-gray-300">
            typing <span className="loading loading-dots loading-xs"></span>
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

export default ChatItem;
