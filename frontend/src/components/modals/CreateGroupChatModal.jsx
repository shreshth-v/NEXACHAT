import React, { useEffect, useReducer, useState } from "react";
import { apiClient } from "../../utils/apiClient";
import { IoMdCloseCircle } from "react-icons/io";
import { useDispatch } from "react-redux";
import { createGroupChat } from "../../features/chat/chatSlice";
import { DEFAULT_GROUP_IMAGE } from "../../utils/constants";
import { FaCamera } from "react-icons/fa6";
import SearchUser from "../ui/SearchUser";
import SearchUserResult from "../ui/SearchUserResult";

const initialGroupInfo = {
  groupName: "",
  groupProfilePic: null,
  otherUsersIds: [],
};

const groupInfoReducer = (state, action) => {
  switch (action.type) {
    case "HANDLE_IMAGE_CHANGE":
      return {
        ...state,
        groupProfilePic: action.payload,
      };

    case "HANDLE_GROUP_NAME_CHANGE":
      return {
        ...state,
        [action.field]: action.payload,
      };

    case "ADD_USER":
      return {
        ...state,
        otherUsersIds: [...state.otherUsersIds, action.payload],
      };

    case "REMOVE_USER":
      return {
        ...state,
        otherUsersIds: state.otherUsersIds.filter(
          (id) => id !== action.payload
        ),
      };

    default:
      return state;
  }
};

const CreateGroupChatModal = ({ setShowCreateGroupChatModal }) => {
  const [searchValue, setSearchValue] = useState("");
  const [availableUsers, setAvailableUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [previewImage, setPreviewImage] = useState(DEFAULT_GROUP_IMAGE);

  const dispatchRedux = useDispatch();
  const [groupInfo, dispatch] = useReducer(groupInfoReducer, initialGroupInfo);

  useEffect(() => {
    const searchUsers = setTimeout(async () => {
      const response = await apiClient.get(`auth/search?input=${searchValue}`);
      setAvailableUsers(response.data);
    }, 500);

    return () => clearTimeout(searchUsers);
  }, [searchValue]);

  const handleCreateGroupChat = () => {
    dispatchRedux(createGroupChat(groupInfo));
    setShowCreateGroupChatModal(false);
  };

  const handleImageChange = (e) => {
    dispatch({
      type: "HANDLE_IMAGE_CHANGE",
      payload: e.target.files[0],
    });

    const objectUrl = URL.createObjectURL(e.target.files[0]);
    setPreviewImage(objectUrl);
  };

  const handleGroupNameChange = (e) => {
    dispatch({
      type: "HANDLE_GROUP_NAME_CHANGE",
      field: e.target.name,
      payload: e.target.value,
    });
  };

  const handleAddUser = (user) => {
    setSelectedUsers((currVal) => {
      return [...currVal, user];
    });

    dispatch({
      type: "ADD_USER",
      payload: user._id,
    });

    setAvailableUsers([]);
    setSearchValue("");
  };

  const handleRemoveUser = (user) => {
    setSelectedUsers((currVal) => {
      return currVal.filter((u) => u._id !== user._id);
    });

    dispatch({
      type: "REMOVE_USER",
      payload: user._id,
    });
  };

  return (
    <div open className="modal bg-black">
      <div className="modal-box max-h-140">
        {/* Close */}
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={() => setShowCreateGroupChatModal(false)}
        >
          ✕
        </button>

        {/* Heading */}
        <h3 className="font-bold text-lg">Create Group!</h3>

        {/* Preview Image */}
        <div className="flex justify-center relative mb-5">
          <img
            src={previewImage}
            alt=""
            className="w-28 h-28 rounded-full border-2 border-white"
          />
          <label
            htmlFor="profilePic"
            className="absolute bottom-0 left-63 text-lg bg-indigo-500 rounded-full p-2"
          >
            <FaCamera />
          </label>
        </div>

        {/* Profile Picture  */}
        <div>
          <input
            type="file"
            className="file-input file-input-ghost hidden"
            id="profilePic"
            name="profilePic"
            onChange={handleImageChange}
          />
        </div>

        {/* Name  */}
        <div>
          <input
            type="text"
            className="input validator w-full"
            required
            placeholder="Group name"
            pattern="[A-Za-z][A-Za-z0-9\- ]*"
            minLength="3"
            maxLength="30"
            title="Only letters, numbers or dash"
            name="groupName"
            onChange={handleGroupNameChange}
            value={groupInfo.groupName}
          />
          <p className="validator-hint">
            Group name must be 3 to 30 characters containing only letters,
            numbers or dash
          </p>
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
          <button className="btn btn-primary" onClick={handleCreateGroupChat}>
            Create Group
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateGroupChatModal;
