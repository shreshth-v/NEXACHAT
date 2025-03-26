import { useEffect } from "react";
import { socket } from "../utils/socket";
import {
  addNewChat,
  addUsersToGroupChat,
  chatDeleteForRemovedUser,
  removeUserFromGroupChat,
  updateGroupChatInfo,
} from "../features/chat/chatSlice";
import { useDispatch } from "react-redux";

const useTrackChatUpdates = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Receive new chat
    const handleReceiveNewChat = ({ newChat }) => {
      dispatch(addNewChat(newChat));
    };

    // Receive new group chat
    const handleReceiveNewGroupChat = ({ newGroupChat }) => {
      dispatch(addNewChat(newGroupChat));
    };

    // Add users to group chat
    const handleUsersAddedToGroupChat = ({ groupChat }) => {
      dispatch(addUsersToGroupChat({ groupChat }));
    };

    // Remove user from group chat
    const handleUserRemovedFromGroupChat = ({ groupChat }) => {
      dispatch(removeUserFromGroupChat({ groupChat }));
    };

    // Remove user from group chat
    const handleDeleteChatForRemovedUser = ({ groupChat }) => {
      dispatch(chatDeleteForRemovedUser({ groupChat }));
    };

    // Update group chat info
    const handleUpdateGroupChatInfo = ({ groupChat }) => {
      dispatch(updateGroupChatInfo({ groupChat }));
    };

    socket.on("receiveNewChat", handleReceiveNewChat);

    socket.on("receiveNewGroupChat", handleReceiveNewGroupChat);

    socket.on("usersAddedToGroupChat", handleUsersAddedToGroupChat);

    socket.on("userRemovedFromGroupChat", handleUserRemovedFromGroupChat);

    socket.on("deleteChatForRemovedUser", handleDeleteChatForRemovedUser);

    socket.on("updateGroupChatInfo", handleUpdateGroupChatInfo);

    return () => {
      socket.off("receiveCreatedChat", handleReceiveNewChat);
      socket.off("receiveNewGroupChat", handleReceiveNewChat);
      socket.off("usersAddedToGroupChat", handleUsersAddedToGroupChat);
      socket.off("userRemovedFromGroupChat", handleUserRemovedFromGroupChat);
      socket.off("deleteChatForRemovedUser", handleDeleteChatForRemovedUser);
      socket.off("updateGroupChatInfo", handleUpdateGroupChatInfo);
    };
  }, []);
};

export default useTrackChatUpdates;
