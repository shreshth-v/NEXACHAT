import React, { useEffect, useState } from "react";
import { MdInfoOutline } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { FaCamera } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { FaCheck } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import GroupInfoUserList from "./GroupInfoUserList";
import AddUsersModal from "./modals/AddUsersModal";
import { leaveGroupChat, updateGroupChat } from "../features/chat/chatSlice";

const GroupInfoSidebar = () => {
  const {
    activeChat,
    isUpdatingGroupChat,
    isAddingUsersToGroup,
    isRemovingUserFromGroup,
  } = useSelector((state) => state.chat);

  const { authUser } = useSelector((state) => state.auth);

  const isAuthUserGroupAdmin = activeChat.groupAdmin === authUser._id;

  const [previewImage, setPreviewImage] = useState(activeChat?.groupProfilePic);
  const [showAddUsersModal, setshowAddUsersModal] = useState(false);

  const [isGroupNameEditable, setIsGroupNameEditable] = useState(false);

  const dispatchRedux = useDispatch();

  useEffect(() => {
    setGroupInfo((currVal) => {
      return {
        ...currVal,
        groupName: activeChat.groupName,
      };
    });

    setPreviewImage(activeChat.groupProfilePic);
  }, [activeChat]);

  const [groupInfo, setGroupInfo] = useState({
    groupName: activeChat?.groupName || "",
    groupProfilePic: null,
  });

  const handleImageChange = (e) => {
    setGroupInfo((currVal) => {
      return { ...currVal, groupProfilePic: e.target.files[0] };
    });

    const objectUrl = URL.createObjectURL(e.target.files[0]);
    setPreviewImage(objectUrl);
  };

  const handleGroupNameChange = (e) => {
    setGroupInfo((currVal) => {
      return { ...currVal, [e.target.name]: e.target.value };
    });
  };

  const handleUpdateGroupChat = () => {
    dispatchRedux(updateGroupChat(groupInfo));
  };

  const handleLeaveGroupChat = () => {
    dispatchRedux(leaveGroupChat());
  };

  // Loading
  if (isUpdatingGroupChat || isAddingUsersToGroup || isRemovingUserFromGroup) {
    return (
      <div className="drawer drawer-end z-20">
        <input
          id="group-info-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content">
          {/* Group icon on Chat Header */}
          <label htmlFor="group-info-drawer" className="drawer-button">
            <div className="tooltip" data-tip="Group Info">
              <div className="text-2xl sm:text-3xl cursor-pointer">
                <MdInfoOutline />
              </div>
            </div>
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="group-info-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
            onClick={() => setIsGroupNameEditable(false)}
          ></label>

          {/* Sidebar content here */}
          <div className="menu bg-base-300 text-base-content min-h-full w-full sm:w-130 pl-4 pr-8 py-4 flex flex-row justify-center items-center space-x-2">
            {isUpdatingGroupChat && (
              <div className="text-lg">Updating Chat</div>
            )}
            {isAddingUsersToGroup && <div className="text-lg">Adding User</div>}
            {isRemovingUserFromGroup && (
              <div className="text-lg">Removing User</div>
            )}
            <span className="loading loading-bars loading-lg"></span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="drawer drawer-end z-20">
      <input id="group-info-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content mt-1.5">
        {/* Group icon on Chat Header */}
        <label htmlFor="group-info-drawer" className="drawer-button">
          <div className="tooltip" data-tip="Group Info">
            <div className="text-2xl sm:text-3xl text-center cursor-pointer">
              <MdInfoOutline />
            </div>
          </div>
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="group-info-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
          onClick={() => setIsGroupNameEditable(false)}
        ></label>

        {/* Sidebar content here */}
        <div className="menu bg-base-300 text-base-content min-h-full w-full sm:w-130 pl-4 pr-8 py-4 flex flex-col space-y-8">
          {/* Sidebar header */}
          <div className="flex items-center justify-between text-lg">
            <div>Group Info</div>
            <label htmlFor="group-info-drawer" className="cursor-pointer">
              <IoMdClose onClick={() => setIsGroupNameEditable(false)} />
            </label>
          </div>

          {/* Group Info Form */}
          <form className="flex flex-col space-y-2">
            {/* Preview Image */}
            <div className="flex justify-center relative mb-5">
              <img
                src={previewImage}
                alt=""
                className="size-30 sm:size-34 rounded-full border-2 border-white"
              />

              {/* Only Admin can edit group profile pic */}
              {isAuthUserGroupAdmin && (
                <label
                  htmlFor="profilePic"
                  className="absolute bottom-0 translate-x-9/10 sm:translate-x-1 sm:left-65 text-lg bg-indigo-500 rounded-full p-2"
                >
                  <FaCamera />
                </label>
              )}
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

            {/* Group Name Input */}
            {isGroupNameEditable && (
              <div className="grid grid-cols-12 gap-2 items-center h-16">
                {/* First Row */}
                <input
                  type="text"
                  className="input validator col-start-3 col-span-7"
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
                <FaCheck
                  className="text-2xl cursor-pointer col-span-1"
                  onClick={() => setIsGroupNameEditable(false)}
                />

                {/* Second Row (Full Width) */}
                <p className="validator-hint col-start-2 sm:col-start-3 col-span-12">
                  Name must contain at least 3 letters, numbers, or dash.
                </p>
              </div>
            )}

            {/* Group Name */}
            {!isGroupNameEditable && (
              <div className="flex justify-center items-center text-xl space-x-2">
                <div className="h-16 flex items-center">
                  {groupInfo.groupName}
                </div>
                {/* Only Admin can edit group name */}
                {isAuthUserGroupAdmin && (
                  <MdEdit
                    className="cursor-pointer h-16"
                    onClick={() => setIsGroupNameEditable(true)}
                  />
                )}
              </div>
            )}

            {/* Number of Group participants */}
            <div className="text-center">
              Group - {activeChat.users.length}{" "}
              {activeChat.users.length === 1 ? "participant" : "participants"}
            </div>
          </form>

          {/* Group participants list */}
          <GroupInfoUserList />

          {/* Buttons */}
          {isAuthUserGroupAdmin && (
            <div className="flex space-x-2">
              <button
                className="btn btn-active btn-success grow-1"
                onClick={() => setshowAddUsersModal(true)}
              >
                Add participants
              </button>
              <button
                className="btn btn-active btn-primary grow-1"
                onClick={handleUpdateGroupChat}
              >
                Update group info
              </button>
            </div>
          )}

          {!isAuthUserGroupAdmin && (
            <div className="flex justify-end">
              <button
                className="btn btn-active btn-error "
                onClick={handleLeaveGroupChat}
              >
                Leave Group
              </button>
            </div>
          )}

          {/* Add user modal */}
          {showAddUsersModal && (
            <AddUsersModal setshowAddUsersModal={setshowAddUsersModal} />
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupInfoSidebar;
