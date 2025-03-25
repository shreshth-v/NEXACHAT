import React, { useState } from "react";
import { LuMessageCirclePlus } from "react-icons/lu";
import ChatList from "./ChatList";

const SideBar = ({ setShowCreateChatModal, setShowCreateGroupChatModal }) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="w-1/4 rounded-tl-lg rounded-bl-lg p-4 flex flex-col space-y-4 h-full">
      {/* Heading */}
      <div className="text-2xl font-bold tracking-wide">Chats</div>

      {/* Buttons */}
      <div className="flex justify-center items-center space-x-1.5">
        <button
          className="btn btn-soft btn-primary w-1/2"
          onClick={() => setShowCreateChatModal(true)}
        >
          Create Chat
          <LuMessageCirclePlus />
        </button>
        <button
          className="btn btn-soft btn-primary w-1/2"
          onClick={() => setShowCreateGroupChatModal(true)}
        >
          Create Group
          <LuMessageCirclePlus />
        </button>
      </div>

      {/* Search */}
      <div>
        <label className="input">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            type="text"
            className="grow"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </label>
      </div>

      {/* Chat List */}
      <ChatList searchTerm={searchTerm} />
    </div>
  );
};

export default SideBar;
