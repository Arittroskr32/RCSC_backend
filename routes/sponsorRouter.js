import express from "express";
import { getSponsors, postSponsor, updateSponsor, deleteSponsor, get_a_sponsor } from "../controllers/sponsorController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getSponsors);
router.get("/:id", get_a_sponsor);
router.post("/", isAuthenticated, postSponsor);
router.put("/:id", isAuthenticated, updateSponsor);
router.delete("/:id", isAuthenticated, deleteSponsor);

export default router;
