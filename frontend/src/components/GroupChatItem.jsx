import React from "react";

const GroupChatItem = ({ chat }) => {
  return (
    <li className="list-row hover:bg-primary cursor-pointer">
      <div>
        <img className="size-10 rounded-full" src={chat.groupProfilePic} />
      </div>
      <div className="flex items-center">
        <div>{chat.groupName}</div>
      </div>
    </li>
  );
};

export default GroupChatItem;
