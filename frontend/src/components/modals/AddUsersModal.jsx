import React, { useEffect, useReducer, useState } from "react";
import { apiClient } from "../../utils/apiClient";
import { IoMdCloseCircle } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { addUsersToGroup } from "../../features/chat/chatSlice";
import SearchUser from "../ui/SearchUser";
import SearchUserResult from "../ui/SearchUserResult";

const AddUsersModal = ({ setshowAddUsersModal }) => {
  const [searchValue, setSearchValue] = useState("");
  const [availableUsers, setAvailableUsers] = useState([]);

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [usersToAddIds, setUsersToAddIds] = useState([]);

  const { activeChat } = useSelector((state) => state.chat);

  const dispatchRedux = useDispatch();

  // Search users to add
  useEffect(() => {
    const searchUsers = setTimeout(async () => {
      const response = await apiClient.get(`auth/search?input=${searchValue}`);
      const fetchedUsers = response.data;

      const activeChatUserIds = new Set(
        activeChat.users.map((user) => user._id)
      );

      //   If user already exist in the chat
      const filteredUsers = fetchedUsers.filter(
        (user) => !activeChatUserIds.has(user._id)
      );

      setAvailableUsers(filteredUsers);
    }, 500);

    return () => clearTimeout(searchUsers);
  }, [searchValue]);

  const handleAddUsersToGroupChat = () => {
    dispatchRedux(addUsersToGroup(usersToAddIds));
    setshowAddUsersModal(false);
  };

  const handleAddUser = (user) => {
    setSelectedUsers((currVal) => {
      // Check if user is already selected
      if (!currVal.some((u) => u._id === user._id)) {
        return [...currVal, user];
      }
      return currVal;
    });

    setUsersToAddIds((currVal) => {
      if (!currVal.includes(user._id)) {
        return [...currVal, user._id];
      }
      return currVal;
    });

    setAvailableUsers([]);
    setSearchValue("");
  };

  const handleRemoveUser = (user) => {
    setSelectedUsers((currVal) => {
      return currVal.filter((u) => u._id !== user._id);
    });

    setUsersToAddIds((currVal) => {
      return currVal.filter((id) => id !== user._id);
    });
  };

  return (
    <div open className="modal bg-black">
      <div className="modal-box max-h-140 flex flex-col ">
        <div className="flex">
          {/* Heading */}
          <h3 className="font-bold text-lg flex-1">Add participants</h3>

          {/* Close */}
          <button
            className="btn btn-sm btn-circle btn-ghost"
            onClick={() => setshowAddUsersModal(false)}
          >
            ✕
          </button>
        </div>

        {/* Search User*/}
        <SearchUser searchValue={searchValue} setSearchValue={setSearchValue} />

        {/* Search User result */}
        <SearchUserResult
          availableUsers={availableUsers}
          handleAddUser={handleAddUser}
        />

        {/* Selected users for group chat */}
        {selectedUsers && (
          <div className="flex flex-wrap gap-2 p-1">
            {selectedUsers.map((user) => (
              <div
                key={user._id}
                className="bg-primary p-1.5 flex justify-center items-center space-x-2 rounded-full"
              >
                <img className="size-10 rounded-full" src={user.profilePic} />
                <div>{user.name}</div>
                <div
                  className="text-xl cursor-pointer hover:text-slate-300"
                  onClick={() => handleRemoveUser(user)}
                >
                  <IoMdCloseCircle />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Create Group Chat Button */}
        <div className="modal-action">
          <button
            className="btn btn-primary"
            onClick={handleAddUsersToGroupChat}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddUsersModal;
