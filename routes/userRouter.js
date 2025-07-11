import express from "express";
import { login, logout, getUser } from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/login", login);                    // Admin login
router.get("/logout", isAuthenticated, logout);  // Admin logout
router.get("/getuser", isAuthenticated, getUser); // Fetch logged-in admin

export default router;
