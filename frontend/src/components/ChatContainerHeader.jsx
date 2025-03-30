import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoMdCloseCircle } from "react-icons/io";
import { removeActiveChat } from "../features/chat/chatSlice";
import { removeActiveChatMessages } from "../features/message/messageSlice";

const ChatContainerHeader = ({ typingUser }) => {
  const { authUser, onlineUsers } = useSelector((state) => state.auth);
  const { activeChat } = useSelector((state) => state.chat);
  const otherUser = activeChat.users.find((user) => user._id !== authUser._id);

  const isOnline = onlineUsers.includes(otherUser._id);

  const dispatch = useDispatch();

  const closeActiveChat = () => {
    dispatch(removeActiveChat());
    dispatch(removeActiveChatMessages());
  };

  return (
    <div className="bg-indigo-800 px-6 rounded-tr-xl rounded-tl-xl h-1/8 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <img
          src={otherUser.profilePic}
          alt=""
          className="size-10 sm:size-12 rounded-full border border-base-300 shadow"
        />
        <div>
          <div className="text-md sm:text-lg font-semibold">
            {otherUser.name}
          </div>
          {isOnline && !typingUser && (
            <div className="text-sm text-gray-300">online</div>
          )}
          {typingUser && (
            <div className="text-xs sm:text-sm text-gray-300">
              typing <span className="loading loading-dots loading-xs"></span>
            </div>
          )}
        </div>
      </div>

      <div
        className="text-2xl sm:text-3xl cursor-pointer"
        onClick={closeActiveChat}
      >
        <IoMdCloseCircle />
      </div>
    </div>
  );
};

export default ChatContainerHeader;
