import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5001"); // Replace with your server URL

function Notification() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Listen for notifications from the backend
    socket.on("newNotification", (data) => {
      setNotifications((prevNotifications) => [...prevNotifications, data]);
    });

    return () => {
      socket.off("newNotification"); // Cleanup listener on unmount
    };
  }, []);

  return (
    <div className="fixed top-0 right-0 z-50 p-4">
      {notifications.length > 0 && (
        <div className="p-4 text-white bg-blue-500 rounded-lg shadow-lg">
          <p>{notifications[notifications.length - 1].message}</p>
        </div>
      )}
    </div>
  );
}

export default Notification;
