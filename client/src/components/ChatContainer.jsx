import messageStore from "../store/messageStore";
import { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skellies/MessageSkeleton";
import authStore from "../store/authStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = messageStore();
  const { authUser } = authStore();
  const messageEndRef = useRef(null);

  // runs this whenever active chat is changed
  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [
    selectedUser._id,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  // scroll on message change
  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }
  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            // formatting based on message sender
            className={`flex w-full ${
              message.senderId === authUser._id
                ? "justify-end"
                : "justify-start"
            }`}
            ref={messageEndRef}
          >
            <img
              className="size-12 object-cover rounded-full border-3"
              src={
                message.senderId === authUser._id
                  ? authUser.profilePic || "/garrus.webp"
                  : selectedUser.profilePic || "/garrus.webp"
              }
              alt="profile pic"
            />
            <div className="mb-1">
              <time className="text-xs opacity-50 ml-1 mr-2">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div className="flex flex-col">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>

      <MessageInput />
    </div>
  );
};
export default ChatContainer;
