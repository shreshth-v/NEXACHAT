import { useState } from "react";
import ChatContainer from "../components/ChatContainer";
import SideBar from "../components/SideBar";
import CreateChatModal from "../components/modals/CreateChatModal";
import CreateGroupChatModal from "../components/modals/CreateGroupChatModal";
import { useSelector } from "react-redux";
import NoActiveChat from "../components/NoActiveChat";

const HomePage = () => {
  const [showCreateChatModal, setShowCreateChatModal] = useState(false);
  const [showCreateGroupChatModal, setShowCreateGroupChatModal] =
    useState(false);

  const { activeChat, isCreatingChat, isCreatingGroupChat } = useSelector(
    (state) => state.chat
  );

  // Loading
  if (isCreatingChat || isCreatingGroupChat) {
    return (
      <div className="bg-base-300 h-full rounded-xl p-4 flex items-center justify-center">
        <span className="loading loading-spinner text-primary loading-xl"></span>
      </div>
    );
  }

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
