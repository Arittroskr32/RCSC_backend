import express from "express";
import { getDevTeam, postDevTeam, updateDevTeam, deleteDevTeam, get_a_developer } from "../controllers/dev_teamController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getDevTeam);
router.get("/:id", get_a_developer);
router.post("/", isAuthenticated, postDevTeam);
router.put("/:id", isAuthenticated, updateDevTeam);
router.delete("/:id", isAuthenticated, deleteDevTeam);

export default router;