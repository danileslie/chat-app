import User from "../models/userModel.js";
import Message from "../models/messageModel.js";
import imageKit from "../lib/imagekit.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

const getUsers = async (req, res) => {
  try {
    // gets all users except current for display
    // not sending pw back to client
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getMessages = async (req, res) => {
  try {
    // id used in messageRoute param

    // other user (not current)
    const { id: userToChat } = req.params;
    // currently authenticated user
    const myId = req.user._id;

    // finding messages sent by current user or specified recipient
    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChat },
        { senderId: userToChat, receiverId: myId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;

    // upload image to imagekit
    if (image) {
      try {
        const uploadResponse = await imageKit.upload({
          file: image,
          fileName: `chat_${Date.now()}`,
        });

        imageUrl = uploadResponse.url;
      } catch (err) {
        console.error("Image upload failed:", err.message || err);
        return res.status(400).json({ error: "Image upload failed" });
      }
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });
    // message saved to db and sent to other user in realtme
    await newMessage.save();

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      // .to localises sent message
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export { getUsers, getMessages, sendMessage };
