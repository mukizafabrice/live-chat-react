import Message from "../models/messageModel.js"; // Assuming the message model is defined
import User from "../models/userModel.js"; // Assuming the user model is defined

// Send a new message
export const sendMessage = async (req, res) => {
  try {
    const { senderId, receiverId, content } = req.body;

    // Check if both sender and receiver exist
    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);

    if (!sender || !receiver) {
      return res.status(404).json({ message: "Sender or receiver not found" });
    }

    // Create a new message
    const newMessage = new Message({
      sender: senderId,
      receiver: receiverId,
      content,
      timestamp: new Date(),
    });

    // Save the message to the database
    await newMessage.save();

    res.status(201).json({
      message: "Message sent successfully",
      newMessage,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error sending message", error: err.message });
  }
};

// Get all messages for a user (inbox)
export const getUserMessages = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find all messages where the user is either the sender or receiver
    const messages = await Message.find({
      $or: [{ sender: userId }, { receiver: userId }],
    })
      .populate("sender", "username email") // Optionally populate sender details
      .populate("receiver", "username email"); // Optionally populate receiver details

    if (!messages || messages.length === 0) {
      return res
        .status(404)
        .json({ message: "No messages found for this user" });
    }

    res.status(200).json({ messages });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching messages", error: err.message });
  }
};

// Get messages between two users
export const getMessagesBetweenUsers = async (req, res) => {
  try {
    const { userId1, userId2 } = req.params;

    // Find all messages between two users
    const messages = await Message.find({
      $or: [
        { sender: userId1, receiver: userId2 },
        { sender: userId2, receiver: userId1 },
      ],
    })
      .populate("sender", "username email")
      .populate("receiver", "username email");

    if (!messages || messages.length === 0) {
      return res
        .status(404)
        .json({ message: "No messages found between these users" });
    }

    res.status(200).json({ messages });
  } catch (err) {
    res.status(500).json({
      message: "Error fetching messages between users",
      error: err.message,
    });
  }
};
