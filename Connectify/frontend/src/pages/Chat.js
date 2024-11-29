import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5001"); // Replace with your server URL

function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Listen for new public messages
    socket.on("new_message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    // Listen for private messages
    socket.on("newMessage", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    // Fetch users from the backend (you might need an API endpoint for this)
    // For example, you can hard-code users for now.
    setUsers(["user1", "user2", "user3"]);

    return () => {
      socket.off("new_message");
      socket.off("newMessage");
    };
  }, []);

  const handleSendMessage = () => {
    if (selectedUser) {
      // Send private message
      socket.emit("sendPrivateMessage", {
        toUserId: selectedUser,
        message,
      });
      setMessage("");
    } else {
      // Send public message
      socket.emit("send_message", { message });
      setMessage("");
    }
  };

  return (
    <div className="p-4 pt-12 mt-20">
      <h2>Chat</h2>

      {/* User Selection */}
      <div className="mb-4">
        <label>Select User to Chat with: </label>
        <select
          onChange={(e) => setSelectedUser(e.target.value)}
          value={selectedUser}
          className="p-2 border"
        >
          <option value="">Select User</option>
          {users.map((user) => (
            <option key={user} value={user}>
              {user}
            </option>
          ))}
        </select>
      </div>

      {/* Messages */}
      <div className="h-64 p-2 mb-4 overflow-auto bg-gray-100 border">
        {messages.map((msg, index) => (
          <p key={index}>
            <strong>{msg.from || "System"}: </strong>
            {msg.message}
          </p>
        ))}
      </div>

      {/* Message Input */}
      <div className="mb-4">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows="3"
          className="w-full p-2 border"
        />
      </div>

      <button
        onClick={handleSendMessage}
        className="p-2 text-white bg-blue-500 rounded"
      >
        Send Message
      </button>
    </div>
  );
}

export default Chat;
