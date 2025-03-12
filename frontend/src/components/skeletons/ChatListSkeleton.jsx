import React from "react";

const ChatListSkeleton = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <div className="skeleton h-12 w-12 shrink-0 rounded-full bg-neutral"></div>
        <div className="flex flex-col gap-4">
          <div className="skeleton h-3 w-28 bg-neutral"></div>
          <div className="skeleton h-3 w-40 bg-neutral"></div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="skeleton h-12 w-12 shrink-0 rounded-full bg-neutral"></div>
        <div className="flex flex-col gap-4">
          <div className="skeleton h-3 w-28 bg-neutral"></div>
          <div className="skeleton h-3 w-40 bg-neutral"></div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="skeleton h-12 w-12 shrink-0 rounded-full bg-neutral"></div>
        <div className="flex flex-col gap-4">
          <div className="skeleton h-3 w-28 bg-neutral"></div>
          <div className="skeleton h-3 w-40 bg-neutral"></div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="skeleton h-12 w-12 shrink-0 rounded-full bg-neutral"></div>
        <div className="flex flex-col gap-4">
          <div className="skeleton h-3 w-28 bg-neutral"></div>
          <div className="skeleton h-3 w-40 bg-neutral"></div>
        </div>
      </div>
    </div>
  );
};

export default ChatListSkeleton;
