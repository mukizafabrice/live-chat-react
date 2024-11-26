import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js'; // Assuming you have a User model

// Register a new user
export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if the user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        // Save the user in the database
        await newUser.save();

        // Generate a JWT token
        const token = jwt.sign(
            { userId: newUser._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(201).json({
            message: 'User registered successfully',
            token,
        });
    } catch (err) {
        res.status(500).json({ message: 'Error registering user', error: err.message });
    }
};

// Login a user
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare the entered password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: 'User logged in successfully',
            token,
        });
    } catch (err) {
        res.status(500).json({ message: 'Error logging in user', error: err.message });
    }
};

// Get user profile (Example for logged-in users)
export const getUserProfile = async (req, res) => {
    try {
        const userId = req.userId; // This should be added to req when you verify the JWT token

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            username: user.username,
            email: user.email,
            createdAt: user.createdAt,
        });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching user profile', error: err.message });
    }
};
// Get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find(); // Retrieve all users from the database
        res.status(200).json(users); // Return the users in the response
    } catch (err) {
        res.status(500).json({ message: 'Error fetching users', error: err.message });
    }
};

