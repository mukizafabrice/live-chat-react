import Notification from "../models/notificationModel.js"; // Assuming the notification model is defined
import User from "../models/userModel.js"; // Assuming the user model is defined

// Create a new notification
export const createNotification = async (req, res) => {
  try {
    const { userId, message } = req.body;

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create a new notification
    const newNotification = new Notification({
      user: userId,
      message,
      read: false, // New notifications are marked as unread
      timestamp: new Date(),
    });

    // Save the notification to the database
    await newNotification.save();

    res.status(201).json({
      message: "Notification created successfully",
      newNotification,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating notification", error: err.message });
  }
};

// Get all notifications for a user
export const getUserNotifications = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find all notifications for the user
    const notifications = await Notification.find({ user: userId })
      .populate("user", "username email") // Optionally populate user details
      .sort({ timestamp: -1 }); // Sort notifications by timestamp (newest first)

    if (!notifications || notifications.length === 0) {
      return res
        .status(404)
        .json({ message: "No notifications found for this user" });
    }

    res.status(200).json({ notifications });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching notifications", error: err.message });
  }
};

// Mark a notification as read
export const markNotificationAsRead = async (req, res) => {
  try {
    const { notificationId } = req.params;

    // Find the notification by ID
    const notification = await Notification.findById(notificationId);
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    // Update the notification status to "read"
    notification.read = true;
    await notification.save();

    res.status(200).json({
      message: "Notification marked as read",
      notification,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating notification", error: err.message });
  }
};

// Delete a notification
export const deleteNotification = async (req, res) => {
  try {
    const { notificationId } = req.params;

    // Find and delete the notification
    const notification = await Notification.findByIdAndDelete(notificationId);
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.status(200).json({
      message: "Notification deleted successfully",
      notification,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting notification", error: err.message });
  }
};
