// notificationRoutes.js

import express from "express";
import {
  createNotification,
  getUserNotifications,
  markNotificationAsRead,
  deleteNotification,
} from "../controllers/notificationController.js";

const router = express.Router();

// Define your routes
router.post("/create", createNotification);
router.get("/:userId", getUserNotifications);
router.put("/:notificationId/mark-read", markNotificationAsRead);
router.delete("/:notificationId", deleteNotification);

export default router;
