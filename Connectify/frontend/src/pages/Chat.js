// components/Chat.js

import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import MessageList from "../components/MessageList"; // Import the MessageList component
import ChatBox from "../components/ChatBox";  // Adjust based on the actual location of ChatBox


const socket = io("http://localhost:5001"); // Assuming your backend runs on port 5000

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [currentRoom, setCurrentRoom] = useState("general"); // Default room to "general"

  useEffect(() => {
    // Listen for messages from the server (both private and group messages)
    socket.on("receive_message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Clean up on component unmount
    return () => {
      socket.off("receive_message");
    };
  }, []);

  // Function to handle private message sending
  const sendPrivateMessage = (recipientId, content) => {
    const message = {
      type: "private",
      recipientId,
      content,
      timestamp: new Date().toISOString(),
    };
    socket.emit("send_private_message", message);
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  // Function to handle group message sending
  const sendGroupMessage = (content) => {
    const message = {
      type: "group",
      room: currentRoom, // Room is determined by the current active chat
      content,
      timestamp: new Date().toISOString(),
    };
    socket.emit("send_group_message", message);
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  return (
    <div className="flex flex-col h-full chat-container">
      {/* Room/Private chat selection */}
      <div className="flex items-center justify-between p-4 text-white bg-blue-600">
        <h2 className="text-xl font-bold">Connectify Chat</h2>
        <div className="flex space-x-4">
          <button
            onClick={() => setCurrentRoom("general")}
            className={`px-4 py-2 rounded ${currentRoom === "general" ? "bg-gray-400" : "bg-gray-600"}`}
          >
            General Room
          </button>
          <button
            onClick={() => setCurrentRoom("private")}
            className={`px-4 py-2 rounded ${currentRoom === "private" ? "bg-gray-400" : "bg-gray-600"}`}
          >
            Private Chat
          </button>
        </div>
      </div>

      {/* Message List */}
      <div className="flex-grow p-4 overflow-auto">
        <MessageList messages={messages} />
      </div>

      {/* Chat Input Area */}
      <div className="p-4 bg-gray-200">
        <ChatBox
          onSendGroupMessage={sendGroupMessage}
          onSendPrivateMessage={sendPrivateMessage}
          currentRoom={currentRoom}
        />
      </div>
    </div>
  );
};

export default Chat;
