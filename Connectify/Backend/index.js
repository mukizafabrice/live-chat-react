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

// If you have passport for JWT/Session auth

// Loading environment variables
dotenv.config();

// Initializing Express app
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

// Starting the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
