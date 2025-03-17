import React from "react";
import { GrChatOption } from "react-icons/gr";

const NoActiveChat = () => {
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
