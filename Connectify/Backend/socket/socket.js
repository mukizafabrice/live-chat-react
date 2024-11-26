import { Server } from "socket.io";

let io; // Will hold the instance of socket.io server
let userSockets = {}; // Store user socket connections

// Setup socket.io
export const initSocket = (httpServer) => {
  // Initialize the Socket.IO server with the HTTP server instance
  io = new Server(httpServer, {
    cors: {
      origin: "*", // You can modify this to limit which domains can connect
      methods: ["GET", "POST"],
    },
  });

  // Connection event
  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Store the user's socket ID (can be mapped by user ID in the future)
    socket.on("registerUser", (userId) => {
      userSockets[userId] = socket.id; // Register user with their socket ID
      console.log(`User ${userId} registered with socket ID ${socket.id}`);
    });

    // Private message event
    socket.on("sendPrivateMessage", (data) => {
      const { toUserId, message } = data;
      console.log(
        `Private message from ${data.fromUserId} to ${toUserId}: ${message}`
      );

      // Emit the message to the specific user (private chat)
      const targetSocketId = userSockets[toUserId];
      if (targetSocketId) {
        io.to(targetSocketId).emit("newPrivateMessage", data);
      } else {
        console.log(`User ${toUserId} is not connected.`);
      }
    });

    // Group chat event
    socket.on("joinGroup", (groupId) => {
      socket.join(groupId); // Join a group (room)
      console.log(`User ${socket.id} joined group ${groupId}`);
    });

    socket.on("sendGroupMessage", (data) => {
      const { groupId, message } = data;
      console.log(`Group message to group ${groupId}: ${message}`);

      // Emit the message to all users in the group
      io.to(groupId).emit("newGroupMessage", data);
    });

    // Disconnect event
    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);

      // Clean up user socket from the userSockets map
      for (const userId in userSockets) {
        if (userSockets[userId] === socket.id) {
          delete userSockets[userId];
          console.log(
            `User ${userId} disconnected and removed from registered sockets.`
          );
          break;
        }
      }
    });
  });

  return io; // Return io instance in case we need to reference it elsewhere
};

// Emit notification (this could be called from controllers or other parts of your app)
export const emitNotification = (userId, message) => {
  if (!io) return; // If socket.io is not initialized yet

  const targetSocketId = userSockets[userId];
  if (targetSocketId) {
    io.to(targetSocketId).emit("notification", { userId, message }); // Emit notification to the specific user
  } else {
    console.log(`User ${userId} is not connected.`);
  }
};
