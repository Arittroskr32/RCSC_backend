import express from "express";
import {get_all_club_members, get_club_member_by_email, add_club_member, delete_club_member, sendMailToAllMembers } from "../controllers/clubMemberController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();


router.get("/", isAuthenticated, get_all_club_members);
router.post("/get-member", isAuthenticated, get_club_member_by_email);
router.post("/", isAuthenticated, add_club_member);
router.delete("/", isAuthenticated, delete_club_member);
router.post("/send-mail-to-all", isAuthenticated, sendMailToAllMembers);

export default router;
