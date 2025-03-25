import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoMdCloseCircle } from "react-icons/io";
import { removeActiveChat } from "../features/chat/chatSlice";
import { removeActiveChatMessages } from "../features/message/messageSlice";
import GroupInfoSidebar from "./GroupInfoSidebar";

const ChatHeaderContainerGroup = ({ typingUser }) => {
  const { activeChat } = useSelector((state) => state.chat);

  const dispatch = useDispatch();

  const closeActiveChat = () => {
    dispatch(removeActiveChat());
    dispatch(removeActiveChatMessages());
  };

  return (
    <div className="bg-indigo-800 px-6 rounded-tr-xl rounded-tl-xl h-1/8 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <img
          src={activeChat.groupProfilePic}
          alt=""
          className="size-12 rounded-full border border-base-300 shadow"
        />
        <div>
          <div className="text-lg font-semibold">{activeChat.groupName}</div>
          {/* Typing */}
          {typingUser && (
            <div className="text-sm text-gray-300">
              {typingUser.name} is typing{" "}
              <span className="loading loading-dots loading-xs"></span>
            </div>
          )}
        </div>
      </div>

      <div className="flex space-x-3">
        <GroupInfoSidebar />

        <div className="tooltip" data-tip="Close">
          <div className="text-3xl cursor-pointer" onClick={closeActiveChat}>
            <IoMdCloseCircle />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatHeaderContainerGroup;
