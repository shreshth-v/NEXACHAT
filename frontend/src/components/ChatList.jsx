import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchChats, removeActiveChat } from "../features/chat/chatSlice";
import ChatListSkeleton from "./skeletons/ChatListSkeleton";
import ChatItem from "./ChatItem";
import GroupChatItem from "./GroupChatItem";
import useTrackChatUpdates from "../hooks/useTrackChatUpdates";
import useTrackUserUpdates from "../hooks/useTrackUserUpdates";

const ChatList = ({ searchTerm }) => {
  const { authUser } = useSelector((state) => state.auth);
  const { chats, isFetchingChats } = useSelector((state) => state.chat);

  const dispatch = useDispatch();

  const [filteredChats, setFilteredChats] = useState([]);

  // Fetch all chats
  useEffect(() => {
    dispatch(fetchChats());

    return () => {
      dispatch(removeActiveChat());
    };
  }, [dispatch]);

  // Filtered Chats
  useEffect(() => {
    const filteredItems = chats.filter((chat) => {
      if (chat?.isGroupChat) {
        return chat.groupName.toLowerCase().includes(searchTerm.toLowerCase());
      } else {
        const otherUser = chat.users.find((user) => user._id !== authUser?._id);
        return otherUser?.name.toLowerCase().includes(searchTerm.toLowerCase());
      }
    });

    setFilteredChats(filteredItems);
  }, [chats, searchTerm, authUser]);

  useTrackChatUpdates();

  useTrackUserUpdates();

  if (isFetchingChats) return <ChatListSkeleton />;

  return (
    <ul className="list bg-base-100 rounded-box shadow-md max-h-108 sm:max-h-90 overflow-auto">
      {filteredChats.map((chat) => {
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
