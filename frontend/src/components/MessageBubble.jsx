import React, { useState } from "react";
import { useSelector } from "react-redux";
import { IoMdDownload } from "react-icons/io";

const MessageBubble = ({ message }) => {
  const { authUser } = useSelector((state) => state.auth);
  const { activeChat } = useSelector((state) => state.chat);
  const [isImageHovered, setIsImageHovered] = useState(false);
  const [isFileHovered, setIsFileHovered] = useState(false);

  const isUserInChat = activeChat.users?.some(
    (user) => user._id === message.owner._id
  );

  // Download images and files
  const handleDownload = async (url, fileName) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(blobUrl);
  };

  return (
    <div
      className={`chat ${
        message.owner._id === authUser._id ? "chat-end" : "chat-start"
      }`}
      key={message._id}
    >
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS chat bubble component"
            src={message.owner.profilePic}
          />
        </div>
      </div>
      {activeChat.isGroupChat && (
        <div className="chat-header opacity-50">{message.owner.name}</div>
      )}
      <div
        className={`chat-bubble  max-w-100 ${
          isUserInChat ? "chat-bubble-primary" : "bg-gray-500"
        }`}
      >
        {/* image */}
        {message.image && (
          <div
            className="relative inline-block"
            onMouseEnter={() => setIsImageHovered(true)}
            onMouseLeave={() => setIsImageHovered(false)}
          >
            {/* Image */}
            <img
              src={message.image}
              alt="Message image"
              className="max-w-40 rounded-md"
            />

            {/* Download Image Icon */}
            {isImageHovered && (
              <button
                className="absolute inset-0 flex items-center justify-center rounded-md cursor-pointer"
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                }}
                onClick={() => handleDownload(message.image, message.fileName)}
              >
                <IoMdDownload className="text-white text-3xl" />
              </button>
            )}
          </div>
        )}
        {/* file */}
        {message.file && (
          <div className="flex items-center space-x-2">
            <div
              className="relative inline-block"
              onMouseEnter={() => setIsFileHovered(true)}
              onMouseLeave={() => setIsFileHovered(false)}
            >
              <img
                src="/file.jpg"
                alt="Message file"
                className="max-w-13 rounded-md"
              />
              {/* Download File Icon */}
              {isFileHovered && (
                <button
                  className="absolute inset-0 flex items-center justify-center rounded-md cursor-pointer"
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                  }}
                  onClick={() => handleDownload(message.file, message.fileName)}
                >
                  <IoMdDownload className="text-white text-xl" />
                </button>
              )}
            </div>
            <div className="text-xs opacity-70">{message.fileName}</div>
          </div>
        )}
        <div>{message.text}</div>
      </div>
      <div className="chat-footer opacity-50">
        {new Date(message.createdAt).toLocaleString("en-US", {
          year: "numeric",
          month: "short",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })}
      </div>
    </div>
  );
};

export default MessageBubble;
