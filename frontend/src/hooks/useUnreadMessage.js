import { useEffect } from "react";
import { useSelector } from "react-redux";
import { socket } from "../utils/socket";

const useUnreadMessage = (chat, setUnreadMessageCount) => {
  const { activeChat } = useSelector((state) => state.chat);

  useEffect(() => {
    const handleNewMessage = ({ chatId, message }) => {
      if (chat._id !== activeChat?._id) {
        if (chatId === chat._id) {
          setUnreadMessageCount((currVal) => currVal + 1);
        }
      }
    };

    socket.on("receiveMessage", handleNewMessage);

    return () => {
      socket.off("receiveMessage", handleNewMessage);
    };
  }, [chat._id, activeChat?._id, setUnreadMessageCount]);
};

export default useUnreadMessage;
