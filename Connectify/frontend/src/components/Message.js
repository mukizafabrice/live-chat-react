import React from "react";

function Message({ text, user, timestamp }) {
  const isCurrentUser = user === "User1"; // Replace with dynamic logic for the current user

  return (
    <div
      className={`flex items-start mb-4 ${
        isCurrentUser ? "justify-end" : "justify-start"
      }`}
    >
      {/* Avatar */}
      {!isCurrentUser && (
        <div className="flex items-center justify-center w-10 h-10 mr-3 text-white bg-blue-500 rounded-full">
          {user[0].toUpperCase()}
        </div>
      )}

      {/* Message Bubble */}
      <div
        className={`max-w-xs px-4 py-2 rounded-lg shadow-md ${
          isCurrentUser
            ? "bg-blue-500 text-white ml-auto"
            : "bg-gray-200 text-gray-800"
        }`}
      >
        <p className="text-sm">{text}</p>
        <span className="block mt-1 text-xs text-gray-500">
          {new Date(timestamp).toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
}

export default Message;
