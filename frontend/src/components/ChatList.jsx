import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchChats, removeActiveChat } from "../features/chat/chatSlice";
import ChatListSkeleton from "./skeletons/ChatListSkeleton";
import ChatItem from "./ChatItem";
import GroupChatItem from "./GroupChatItem";

const ChatList = () => {
  const { chats, isFetchingChats } = useSelector((state) => state.chat);

  const dispatch = useDispatch();

  // Fetch all chats
  useEffect(() => {
    dispatch(fetchChats());

    return () => {
      dispatch(removeActiveChat());
    };
  }, [dispatch]);

  if (isFetchingChats) return <ChatListSkeleton />;

  return (
    <ul className="list bg-base-100 rounded-box shadow-md max-h-90 overflow-auto">
      {chats.map((chat) => {
        return chat.isGroupChat ? (
          <GroupChatItem key={chat._id} chat={chat} />
        ) : (
          <ChatItem key={chat._id} chat={chat} />
        );
      })}
    </ul>
  );
};

export default ChatList;
