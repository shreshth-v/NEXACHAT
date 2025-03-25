import { useState } from "react";
import ChatContainer from "../components/ChatContainer";
import SideBar from "../components/SideBar";
import CreateChatModal from "../components/modals/CreateChatModal";
import CreateGroupChatModal from "../components/modals/CreateGroupChatModal";
import { useSelector } from "react-redux";
import NoActiveChat from "../components/NoActiveChat";
import useSocketEvents from "../hooks/useSocketEvents";

const HomePage = () => {
  const [showCreateChatModal, setShowCreateChatModal] = useState(false);
  const [showCreateGroupChatModal, setShowCreateGroupChatModal] =
    useState(false);

  const { activeChat } = useSelector((state) => state.chat);

  useSocketEvents();

  return (
    <div className="bg-base-300 h-full rounded-xl flex">
      <SideBar
        setShowCreateChatModal={setShowCreateChatModal}
        setShowCreateGroupChatModal={setShowCreateGroupChatModal}
      />

      {activeChat ? <ChatContainer /> : <NoActiveChat />}

      {showCreateChatModal && (
        <CreateChatModal setShowCreateChatModal={setShowCreateChatModal} />
      )}
      {showCreateGroupChatModal && (
        <CreateGroupChatModal
          setShowCreateGroupChatModal={setShowCreateGroupChatModal}
        />
      )}
    </div>
  );
};

export default HomePage;
