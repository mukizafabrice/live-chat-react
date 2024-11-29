import React, { useState } from "react";
import { io } from "socket.io-client";

function ChatBox() {
  const [message, setMessage] = useState("");
  const socket = io("http://localhost:5001"); // Replace with your backend server URL

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("message", {
        text: message,
        user: "User1", // Replace with dynamic username
        timestamp: new Date().toISOString(),
      });
      setMessage(""); // Clear input after sending
    }
  };

  return (
    <div className="flex items-center p-4 bg-white border-t">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        className="flex-grow px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={sendMessage}
        className="px-4 py-2 ml-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
      >
        Send
      </button>
    </div>
  );
}

export default ChatBox;
