import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { post_blog, get_blogs, update_blog, delete_blog, get_a_blog} from "../controllers/blogController.js";

const router = express.Router();

router.post("/post_blog", isAuthenticated, post_blog);
router.get("/get_blogs", get_blogs);
router.get("/get_blogs/:id", get_a_blog);
router.put("/update_blog/:id", isAuthenticated, update_blog);
router.delete("/delete_blog/:id", isAuthenticated, delete_blog);
// router.put("/blog_like/:id", blog_like);
// router.put("/set-like/:id", isAuthenticated, set_like);

export default router;