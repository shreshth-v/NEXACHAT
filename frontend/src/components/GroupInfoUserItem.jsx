import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeUserFromGroup } from "../features/chat/chatSlice";

const GroupInfoUserItem = ({ user }) => {
  const { authUser } = useSelector((state) => state.auth);
  const { activeChat } = useSelector((state) => state.chat);

  const isAuthUserGroupAdmin = activeChat.groupAdmin === authUser._id;

  const isCurrentUserGroupAdmin = activeChat.groupAdmin === user._id;

  const dispatchRedux = useDispatch();

  const handleRemoveUserFromGroupChat = () => {
    dispatchRedux(removeUserFromGroup(user._id));
  };

  return (
    <li className="list-row flex flex-row justify-between items-center">
      <div className="indicator indicator-bottom relative pointer-events-none flex space-x-1">
        <img
          className="size-10 rounded-full"
          src={user.profilePic}
          alt="User"
        />
        <div>{user.name}</div>
      </div>

      {isCurrentUserGroupAdmin && (
        <button className="btn btn-soft btn-accent pointer-events-none">
          Admin
        </button>
      )}

      {!isCurrentUserGroupAdmin && isAuthUserGroupAdmin && (
        <button
          className="btn btn-error"
          onClick={handleRemoveUserFromGroupChat}
        >
          Remove
        </button>
      )}
    </li>
  );
};

export default GroupInfoUserItem;
