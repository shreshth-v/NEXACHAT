import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateUserProfileInChats } from "../features/chat/chatSlice";
import { socket } from "../utils/socket";

const useTrackUserUpdates = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Receive new chat
    const handleUserProfileUpdated = ({ user }) => {
      dispatch(updateUserProfileInChats({ user }));
    };

    socket.on("userProfileUpdated", handleUserProfileUpdated);

    return () => {
      socket.off("userProfileUpdated", handleUserProfileUpdated);
    };
  }, [dispatch]);
};

export default useTrackUserUpdates;
