import mongoose from 'mongoose';

// Define the schema for notifications
const notificationSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,  // The notification must have a message
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Reference to the User model
        required: true,  // Notification must be associated with a user
    },
    isRead: {
        type: Boolean,
        default: false,  // Notifications are unread by default
    },
    createdAt: {
        type: Date,
        default: Date.now,  // Timestamp when the notification was created
    },
});

// Create a model using the schema
const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;
