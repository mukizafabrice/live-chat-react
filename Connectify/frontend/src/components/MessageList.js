// components/MessageList.js

import React from "react";
import Message from "./Message";

const MessageList = ({ messages }) => {
  return (
    <div className="flex flex-col-reverse p-4 space-y-4 message-list">
      {messages.length > 0 ? (
        messages.map((message) => (
          <Message
            key={message._id}
            sender={message.sender.username}
            content={message.content}
            timestamp={message.timestamp}
          />
        ))
      ) : (
        <p className="text-center text-gray-500">No messages yet.</p>
      )}
    </div>
  );
};

export default MessageList;
