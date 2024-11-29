import React from "react";
import Message from "./Message";

function MessageList({ messages }) {
  return (
    <div className="flex-grow p-4 overflow-y-auto bg-gray-50">
      {messages.map((msg, index) => (
        <Message
          key={index}
          text={msg.text}
          user={msg.user}
          timestamp={msg.timestamp}
        />
      ))}
    </div>
  );
}

export default MessageList;
