import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getMessages,
  removeActiveChatMessages,
} from "../features/message/messageSlice";
import MessageBubble from "./MessageBubble";
import MessageBubbleSkeleton from "./skeletons/MessageBubbleSkeleton";

const MessagesContainer = () => {
  const dispatch = useDispatch();
  const { activeChat } = useSelector((state) => state.chat);
  const { activeChatMessages, isGettingMessages } = useSelector(
    (state) => state.message
  );

  const messageContainer = useRef();

  // Get all the messages
  useEffect(() => {
    dispatch(getMessages());

    return () => {
      dispatch(removeActiveChatMessages());
    };
  }, [dispatch, activeChat]);

  // Scroll to latest message
  useEffect(() => {
    const lastestMessageImage =
      messageContainer.current?.lastElementChild?.querySelector(
        ".chat-bubble img"
      );

    if (lastestMessageImage) {
      lastestMessageImage.onload = () => {
        messageContainer.current?.lastElementChild?.scrollIntoView({
          behavior: "smooth",
        });
      };
    } else {
      messageContainer.current?.lastElementChild?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [activeChatMessages]);

  if (isGettingMessages)
    return (
      <div
        className="flex-1 px-5 py-4 max-h-100 overflow-auto"
        ref={messageContainer}
      >
        <MessageBubbleSkeleton />
      </div>
    );

  return (
    <div
      className="flex-1 px-5 py-4 max-h-100 overflow-auto"
      ref={messageContainer}
    >
      {activeChatMessages.map((message) => (
        <MessageBubble message={message} key={message._id} />
      ))}
    </div>
  );
};

export default MessagesContainer;
