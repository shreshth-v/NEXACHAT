import React, { useState } from "react";
import ChatList from "./ChatList";
import { useSelector } from "react-redux";

const SideBar = ({ setShowCreateChatModal, setShowCreateGroupChatModal }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const { activeChat } = useSelector((state) => state.chat);

  return (
    <div
      className={`sm:w-1/3 lg:w-1/4 rounded-tl-lg rounded-bl-lg p-4 flex flex-col space-y-4 h-full 
      ${activeChat ? "hidden" : "w-full"} sm:flex`}
    >
      {/* Heading */}
      <div className="text-2xl font-bold tracking-wide">Chats</div>

      {/* Buttons */}
      <div className="flex flex-col lg:flex-row justify-center items-center lg:space-x-1.5">
        <button
          className="btn btn-soft btn-primary lg:flex-1 py-1 mb-1.5 lg:mb-0 w-full"
          onClick={() => setShowCreateChatModal(true)}
        >
          Create Chat
        </button>
        <button
          className="btn btn-soft btn-primary lg:flex-1 py-1 w-full"
          onClick={() => setShowCreateGroupChatModal(true)}
        >
          Create Group
        </button>
      </div>

      {/* Search */}
      <div>
        <label className="input w-full">
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
