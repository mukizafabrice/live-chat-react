import { Server } from "socket.io";

// Store user sockets by their userId (or any unique identifier)
let userSockets = {};

export const initSocket = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Register user with their userId
    socket.on("registerUser", (userId) => {
      userSockets[userId] = socket.id;
      console.log(`User registered: ${userId} with socket ID: ${socket.id}`);
    });

    socket.on("send_message", (data) => {
      io.emit("new_message", data);
      console.log(`Public message: ${data.message}`);
    });

    // Handle private messages
    socket.on("sendPrivateMessage", ({ toUserId, message }) => {
      const toSocketId = userSockets[toUserId];
      if (toSocketId) {
        io.to(toSocketId).emit("newMessage", { from: socket.id, message });
        console.log(`Private message sent to user ${toUserId}: ${message}`);
      } else {
        console.log(`User ${toUserId} is not connected.`);
      }
    });

    // Handle notifications
    socket.on("sendNotification", ({ userId, message }) => {
      const toSocketId = userSockets[userId];
      if (toSocketId) {
        io.to(toSocketId).emit("newNotification", { message });
        console.log(`Notification sent to user ${userId}: ${message}`);
      } else {
        console.log(`User ${userId} is not connected.`);
      }
    });

    // Handle user disconnection
    socket.on("disconnect", () => {
      // Find and remove the disconnected user from the `userSockets` map
      for (const userId in userSockets) {
        if (userSockets[userId] === socket.id) {
          delete userSockets[userId];
          console.log(`User ${userId} disconnected.`);
          break;
        }
      }
    });
  });

  return io; // Export the socket.io instance for further use if necessary
};
