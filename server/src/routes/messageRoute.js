import e from "express";
import protectRoute from "../middleware/middleware.js";
import {
  getMessages,
  getUsers,
  sendMessage,
} from "../controllers/messageController.js";

const router = e.Router();

// loads users into sidebar, loads specific to user logged in
router.get("/users", protectRoute, getUsers);
router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);

export default router;
