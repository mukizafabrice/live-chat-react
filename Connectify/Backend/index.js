import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js"; // Notification route import
import session from "express-session";
import passport from "passport";
import { initializePassport } from "./config/passport.js";
import { initSocket } from "./socket/socket.js";
import http from "http"; // Import the HTTP module

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware setup
app.use(express.json());
app.use(cors());

// Initialize Passport for authentication (if using)
initializePassport(passport);
app.use(passport.initialize());

// Session middleware (optional, if using sessions)
app.use(
  session({
    secret: process.env.SESSION_SECRET, // This should be a secure secret
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to `true` for HTTPS in production
  })
);

// MongoDB connection setup
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err);
  });

// Routes setup
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/notifications", notificationRoutes); // Notification route

// Test route to check if server is running
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Create HTTP server and integrate with socket.io
const server = http.createServer(app); // Create the HTTP server using Express app
initSocket(server); // Pass the server instance to socket.io initialization

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
