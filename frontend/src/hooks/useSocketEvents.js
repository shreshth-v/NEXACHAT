import { useEffect } from "react";
import { socket } from "../utils/socket";
import { useDispatch, useSelector } from "react-redux";
import { addToActiveChatMessages } from "../features/message/messageSlice";
import { setLatestMessageOfChat } from "../features/chat/chatSlice";

const useSocketEvents = () => {
  const { chats, activeChat } = useSelector((state) => state.chat);

  const dispatch = useDispatch();

  useEffect(() => {
    const handleReceiveMessage = ({ chatId, message }) => {
      //  update message in active chat
      if (activeChat?._id === chatId) {
        dispatch(addToActiveChatMessages(message));
      }

      // update message in sidebar
      const chatIndex = chats.findIndex((chat) => chat._id === chatId);

      if (chatIndex !== -1) {
        dispatch(setLatestMessageOfChat({ chatIndex, message }));
      }
    };

    socket.on("receiveMessage", handleReceiveMessage);

    // listen for events like update profile, createChat, create GroupChat and more

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, [activeChat, chats, dispatch]);
};

export default useSocketEvents;
