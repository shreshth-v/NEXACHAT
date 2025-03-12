import React from "react";
import { useSelector } from "react-redux";

const ChatItem = ({ chat }) => {
  const { authUser } = useSelector((state) => state.auth);
  const otherUser = chat.users.find((user) => user._id !== authUser._id);

  return (
    <li className="list-row hover:bg-primary cursor-pointer">
      <div>
        <img className="size-10 rounded-full" src={otherUser.profilePic} />
      </div>
      <div className="flex flex-col justify-center">
        <div>{otherUser.name}</div>
        <div className="text-xs text-gray-400"></div>
      </div>
    </li>
  );
};

export default ChatItem;
