// notificationController.js
import { Server } from "socket.io"; // For emitting notifications

// In case you need a temporary store (like a database)
let notifications = [];

export const createNotification = (req, res) => {
  // Destructure request body
  const { userId, message } = req.body;

  // Optionally save the notification to a database or memory
  // Example: notifications.push({ userId, message });

  // Emit notification via Socket.IO to the specified user
  if (userId && message) {
    const io = req.app.get("socketio"); // Access the io instance from the app

    // Send a notification to the user with the specified userId
    io.to(userId).emit("newNotification", { message });

    return res
      .status(200)
      .json({ success: true, message: "Notification sent" });
  } else {
    return res
      .status(400)
      .json({ success: false, message: "Missing userId or message" });
  }
};

// Other notification-related logic can be added here as needed
