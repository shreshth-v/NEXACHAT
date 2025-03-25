import React from "react";
import { useSelector } from "react-redux";
import GroupInfoUserItem from "./GroupInfoUserItem";

const GroupInfoUserList = () => {
  const { activeChat } = useSelector((state) => state.chat);

  return (
    <ul className="list bg-base-100 rounded-box shadow-md max-h-64 overflow-auto">
      {activeChat.users.map((user) => {
        return <GroupInfoUserItem key={user._id} user={user} />;
      })}
    </ul>
  );
};

export default GroupInfoUserList;
