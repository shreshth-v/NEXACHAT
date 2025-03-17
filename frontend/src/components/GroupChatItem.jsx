import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveChat } from "../features/chat/chatSlice";

const GroupChatItem = ({ chat }) => {
  const { activeChat } = useSelector((state) => state.chat);

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
        <img className="size-10 rounded-full" src={chat.groupProfilePic} />
      </div>
      <div className="flex flex-col justify-center">
        <div>{chat.groupName}</div>
        {/* latest message */}
        <div className="text-xs text-gray-300">
          {chat?.latestMessage?.owner && (
            <span>{chat?.latestMessage?.owner?.name}: </span>
          )}
          {chat?.latestMessage?.text?.length > 25
            ? `${chat.latestMessage.text.slice(0, 25)}...`
            : chat.latestMessage.text}
        </div>
      </div>
    </li>
  );
};

export default GroupChatItem;
