// notificationRoutes.js
import express from 'express';
import { createNotification } from '../controllers/notificationController.js';  // Import the controller

const router = express.Router();

// Define the route for creating notifications
router.post('/create', createNotification);

export default router;
