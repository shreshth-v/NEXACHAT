import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveChat } from "../features/chat/chatSlice";

const ChatItem = ({ chat }) => {
  const { authUser } = useSelector((state) => state.auth);
  const { activeChat } = useSelector((state) => state.chat);
  const otherUser = chat.users.find((user) => user._id !== authUser._id);

  const dispatch = useDispatch();

  const isChatSelected = chat._id === activeChat?._id;

  return (
    <li
      className={`list-row cursor-pointer 
        ${isChatSelected ? "hover:bg-primary" : "hover:bg-indigo-900"}
        ${isChatSelected ? "bg-primary" : ""}`}
      onClick={() => dispatch(setActiveChat(chat))}
    >
      <div>
        <img className="size-10 rounded-full" src={otherUser.profilePic} />
      </div>
      <div className="flex flex-col justify-center">
        <div>{otherUser.name}</div>
        {/* latest message */}
        <div className="text-xs text-gray-300">
          {chat?.latestMessage?.owner._id === authUser._id && (
            <span>You: </span>
          )}
          {chat?.latestMessage?.text}
        </div>
      </div>
    </li>
  );
};

export default ChatItem;
