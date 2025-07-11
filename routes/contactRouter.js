import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { getAllMessages, postMessage, deleteMessage,get_a_message,validateMessage, sendReply } from "../controllers/contactController.js";

const router = express.Router();

router.get("/get_messages", isAuthenticated, getAllMessages);
router.get("/get_messages/:id", isAuthenticated, get_a_message);
router.post("/message", validateMessage, postMessage); 
router.delete("/delete_message/:id", isAuthenticated, deleteMessage);
router.post("/reply", isAuthenticated, sendReply);

export default router;
