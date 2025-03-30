import React, { useReducer, useRef, useState } from "react";
import { MdOutlineCameraAlt } from "react-icons/md";
import { ImAttachment } from "react-icons/im";
import { IoSendSharp } from "react-icons/io5";
import { IoMdCloseCircle } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage, sendMessageToAi } from "../features/message/messageSlice";
import { socket } from "../utils/socket";

const initalMessageData = {
  text: "",
  file: null,
  fileName: null,
};

const messageDataReducer = (state, action) => {
  switch (action.type) {
    case "HANDLE_INPUT_CHANGE":
      return {
        ...state,
        [action.field]: action.payload,
      };

    default:
      return state;
  }
};

const MessageSender = () => {
  const [messageData, dispatch] = useReducer(
    messageDataReducer,
    initalMessageData
  );

  const { activeChat } = useSelector((state) => state.chat);
  const { authUser } = useSelector((state) => state.auth);

  const dispatchRedux = useDispatch();

  const [previewImage, setPreviewImage] = useState(null);

  const typingTimeout = useRef(null);

  const handleTextChange = (e) => {
    dispatch({
      type: "HANDLE_INPUT_CHANGE",
      field: e.target.name,
      payload: e.target.value,
    });

    socket.emit("typing", { chat: activeChat, user: authUser });

    if (typingTimeout.current) clearInterval(typingTimeout.current);

    // Stop typing is emitted is user stop typing for 1 second
    typingTimeout.current = setTimeout(() => {
      socket.emit("stopTyping", { chat: activeChat, user: authUser });
    }, 1000);
  };

  // Upload image or file
  const handleImageOrFileUpload = (e) => {
    dispatch({
      type: "HANDLE_INPUT_CHANGE",
      field: e.target.name,
      payload: e.target.files[0],
    });

    dispatch({
      type: "HANDLE_INPUT_CHANGE",
      field: "fileName",
      payload: e.target.files[0].name,
    });

    // to show preview
    if (e.target.files[0].type.startsWith("image/")) {
      const objectUrl = URL.createObjectURL(e.target.files[0]);
      setPreviewImage(objectUrl);
    } else {
      setPreviewImage("/file.jpg");
    }
  };

  // Remove Preview file
  const removePreviewImageOrFile = () => {
    dispatch({
      type: "HANDLE_INPUT_CHANGE",
      field: "file",
      payload: null,
    });

    dispatch({
      type: "HANDLE_INPUT_CHANGE",
      field: "fileName",
      payload: null,
    });

    setPreviewImage(null);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (activeChat.aiChat) {
      dispatchRedux(sendMessageToAi(messageData.text));
    } else {
      dispatchRedux(sendMessage(messageData));
    }

    dispatch({
      type: "HANDLE_INPUT_CHANGE",
      field: "text",
      payload: "",
    });

    removePreviewImageOrFile();
  };

  return (
    <div className="px-6 py-2 h-1/8 rounded-bl-xl rounded-br-xl">
      <form
        onSubmit={handleFormSubmit}
        className="flex items-center text-xl space-x-3 relative pt-3 sm:pt-0"
      >
        {/* Image and File Preview */}
        {previewImage && (
          <div className="indicator absolute bg-base-300 w-9/10 h-90 mb-105 rounded-lg p-4  flex flex-col space-y-2 justify-center items-center">
            <img
              src={previewImage}
              alt=""
              className="size-65 rounded-md border border-gray-600"
            />
            <span
              className="indicator-item text-3xl cursor-pointer "
              onClick={removePreviewImageOrFile}
            >
              <IoMdCloseCircle />
            </span>
            <div className="text-lg">{messageData.fileName}</div>
          </div>
        )}

        {/* Text input */}
        <input
          type="text"
          placeholder="Type a message"
          className="input input-primary w-full"
          name="text"
          value={messageData.text}
          onChange={handleTextChange}
        />

        {!activeChat.aiChat && (
          <label htmlFor="file">
            <MdOutlineCameraAlt className="cursor-pointer" />
          </label>
        )}

        {!activeChat.aiChat && (
          <label htmlFor="file">
            <ImAttachment className="cursor-pointer" />
          </label>
        )}

        {/* Image and file input */}
        <input
          type="file"
          className="file-input file-input-ghost hidden"
          id="file"
          name="file"
          onChange={handleImageOrFileUpload}
        />

        {/* Submit button */}
        <button>
          <IoSendSharp className="cursor-pointer" />
        </button>
      </form>
    </div>
  );
};

export default MessageSender;
