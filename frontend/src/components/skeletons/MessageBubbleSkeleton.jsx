import React from "react";

const MessageBubbleSkeleton = () => {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex items-center gap-4">
        <div className="skeleton size-14 shrink-0 rounded-full"></div>
        <div className="flex flex-col gap-4">
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-40"></div>
        </div>
      </div>
      <div className="flex items-center gap-4 ml-auto">
        <div className="flex flex-col items-end gap-4">
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-40"></div>
        </div>
        <div className="skeleton size-14 shrink-0 rounded-full"></div>
      </div>
      <div className="flex items-center gap-4">
        <div className="skeleton size-14 shrink-0 rounded-full"></div>
        <div className="flex flex-col gap-4">
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-40"></div>
        </div>
      </div>
      <div className="flex items-center gap-4 ml-auto">
        <div className="flex flex-col items-end gap-4">
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-40"></div>
        </div>
        <div className="skeleton size-14 shrink-0 rounded-full"></div>
      </div>
      <div className="flex items-center gap-4">
        <div className="skeleton size-14 shrink-0 rounded-full"></div>
        <div className="flex flex-col gap-4">
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-40"></div>
        </div>
      </div>
    </div>
  );
};

export default MessageBubbleSkeleton;
