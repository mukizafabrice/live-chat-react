import mongoose from 'mongoose';

// Define the schema for user data
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,  // The username is required
        unique: true,    // The username should be unique
    },
    email: {
        type: String,
        required: true,  // The email is required
        unique: true,    // The email should be unique
    },
    password: {
        type: String,
        required: true,  // The password is required
    },
    createdAt: {
        type: Date,
        default: Date.now,  // Timestamp for when the user was created
    },
    updatedAt: {
        type: Date,
        default: Date.now,  // Timestamp for when the user was last updated
    },
});

// Create a model using the schema
const User = mongoose.model('User', userSchema);

export default User;
