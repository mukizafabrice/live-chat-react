// components/ChatBox.js

import React, { useState } from "react";

const ChatBox = ({ onSendGroupMessage, onSendPrivateMessage, currentRoom }) => {
  const [message, setMessage] = useState("");
  const [recipientId, setRecipientId] = useState(""); // For private messages

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentRoom === "private" && recipientId && message) {
      onSendPrivateMessage(recipientId, message);
    } else if (currentRoom === "general" && message) {
      onSendGroupMessage(message);
    }

    setMessage(""); // Clear the message input after sending
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2">
      {currentRoom === "private" && (
        <input
          type="text"
          placeholder="Recipient ID"
          value={recipientId}
          onChange={(e) => setRecipientId(e.target.value)}
          className="p-2 text-black bg-white rounded"
        />
      )}

      <input
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-grow p-2 text-black bg-white rounded"
      />
      <button type="submit" className="p-2 text-white bg-blue-600 rounded">
        Send
      </button>
    </form>
  );
};

export default ChatBox;
