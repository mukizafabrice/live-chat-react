// src/components/Message.js

import React from "react";

const Message = ({ message, isSender, timestamp }) => {
  return (
    <div className={`flex ${isSender ? "justify-end" : "justify-start"} mb-2`}>
      <div
        className={`max-w-xs p-3 rounded-lg text-white ${
          isSender ? "bg-blue-500" : "bg-gray-500"
        }`}
      >
        <p className="text-sm">{message}</p>
        {timestamp && (
          <span className="block mt-1 text-xs text-gray-300">
            {new Date(timestamp).toLocaleTimeString()}
          </span>
        )}
      </div>
    </div>
  );
};

export default Message;
