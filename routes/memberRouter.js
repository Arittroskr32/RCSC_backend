import express from 'express';
import { addmember, getMember, updateMember, deleteMember, get_a_member } from "../controllers/memberController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/addmember", isAuthenticated , addmember);
router.get("/getmember", getMember);
router.get("/getmember/:id", get_a_member);
router.delete("/deletemember/:id", isAuthenticated , deleteMember);
router.put("/updatemember/:id", isAuthenticated , updateMember);

export default router;