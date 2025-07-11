import express from "express";
import { getActivities, postActivity, updateActivity, deleteActivity, get_a_activity } from "../controllers/club_activitiesController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getActivities);
router.get("/:id", get_a_activity);
router.post("/", isAuthenticated, postActivity);
router.put("/:id", isAuthenticated, updateActivity);
router.delete("/:id", isAuthenticated, deleteActivity);

export default router;