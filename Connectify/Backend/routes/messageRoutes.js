// messageRoutes.js
import express from 'express';
import { sendMessage, getUserMessages, getMessagesBetweenUsers } from '../controllers/messageController.js';

const router = express.Router();

// Define routes
router.post('/send', sendMessage);  // Route to send a message
router.get('/:userId/messages', getUserMessages);  // Get all messages for a user
router.get('/:userId1/:userId2/messages', getMessagesBetweenUsers);  // Get messages between two users

export default router;
