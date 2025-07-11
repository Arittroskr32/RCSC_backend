import express from "express";
import { getAnnouncements, postAnnouncement, updateAnnouncement, deleteAnnouncement, get_a_announcement } from "../controllers/announcementController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getAnnouncements);
router.get("/:id",get_a_announcement);
router.post("/", isAuthenticated, postAnnouncement);
router.put("/:id", isAuthenticated, updateAnnouncement);
router.delete("/:id", isAuthenticated, deleteAnnouncement);

export default router;
