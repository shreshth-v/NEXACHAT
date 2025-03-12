import React, { useEffect, useState } from "react";
import { apiClient } from "../../utils/apiClient";
import { IoMdCloseCircle } from "react-icons/io";
import { useDispatch } from "react-redux";
import { createChat } from "../../features/chat/chatSlice";
import SearchUser from "../ui/SearchUser";
import SearchUserResult from "../ui/SearchUserResult";

const CreateChatModal = ({ setShowCreateChatModal }) => {
  const [searchValue, setSearchValue] = useState("");
  const [availableUsers, setAvailableUser] = useState([]);
  const [selectedUserForChat, setSelectedUserForChat] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const searchUsers = setTimeout(async () => {
      const response = await apiClient.get(`/auth/search?input=${searchValue}`);
      setAvailableUser(response.data);
    }, 500);

    return () => clearTimeout(searchUsers);
  }, [searchValue]);

  const handleAddUser = (user) => {
    setSelectedUserForChat(user);
    setAvailableUser([]);
    setSearchValue("");
  };

  const handleCreateChat = () => {
    dispatch(createChat(selectedUserForChat._id));
    setShowCreateChatModal(false);
  };

  return (
    <div open className="modal bg-black">
      <div className="modal-box max-h-108">
        {/* Close */}
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={() => setShowCreateChatModal(false)}
        >
          ✕
        </button>

        {/* Heading */}
        <h3 className="font-bold text-lg mb-2">Create Chat!</h3>

        {/* Search User*/}
        <SearchUser searchValue={searchValue} setSearchValue={setSearchValue} />

        {/* Search user result */}
        <SearchUserResult
          availableUsers={availableUsers}
          handleAddUser={handleAddUser}
        />

        {/* Selected user for chat */}
        {selectedUserForChat && (
          <div className="flex p-1">
            <div className="bg-primary p-1.5 flex justify-center items-center space-x-2 rounded-full">
              <img
                className="size-10 rounded-full"
                src={selectedUserForChat?.profilePic}
              />
              <div>{selectedUserForChat?.name}</div>
              <div
                className="text-xl cursor-pointer hover:text-slate-300"
                onClick={() => setSelectedUserForChat(null)}
              >
                <IoMdCloseCircle />
              </div>
            </div>
          </div>
        )}

        {/* Create Chat Button */}
        <div className="modal-action">
          <button className="btn btn-primary" onClick={handleCreateChat}>
            Create Chat
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateChatModal;
