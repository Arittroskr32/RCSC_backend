import express from "express";
import { getAchievements, postAchievement, updateAchievement, deleteAchievement, get_a_achievement} from "../controllers/achievementController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getAchievements);
router.get("/:id", get_a_achievement)
router.post("/", isAuthenticated, postAchievement);
router.put("/:id", isAuthenticated, updateAchievement);
router.delete("/:id", isAuthenticated, deleteAchievement);

export default router;

