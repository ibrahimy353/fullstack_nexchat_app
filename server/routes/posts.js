import express from "express";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts);// here gets to grab the user feed when we are on the homepage
router.get("/:userId/posts", verifyToken, getUserPosts);// this gets to grab the specific user id and showcases it on the screen

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);// this gets to like the post posted .

export default router;
