import express from 'express';
import { getAllUsers, registerUser, loginUser, getUserProfile } from '../controllers/userController.js';

const router = express.Router();

router.get('/users', getAllUsers); // Add a route to get all users
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', getUserProfile);

export default router;
