import React from "react";
import { GrChatOption } from "react-icons/gr";
import { useSelector } from "react-redux";

const NoActiveChat = () => {
  const { isCreatingChat, isCreatingGroupChat } = useSelector(
    (state) => state.chat
  );

  // Loading
  if (isCreatingChat || isCreatingGroupChat) {
    return (
      <div className="w-3/4 p-4 ">
        <div className="bg-base-100 w-full h-full rounded-xl flex items-center justify-center space-x-3">
          {isCreatingChat && <div className="text-xl">Creating Chat</div>}
          {isCreatingGroupChat && <div className="text-xl">Creating Group</div>}
          <span className="loading loading-bars loading-lg"></span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-3/4 p-4">
      <div className="bg-base-100 w-full h-full rounded-xl flex flex-col space-y-4 justify-center items-center">
        <div className="text-4xl font-semibold">No chat selected</div>
        <div className="text-5xl">
          <GrChatOption />
        </div>
      </div>
    </div>
  );
};

export default NoActiveChat;
