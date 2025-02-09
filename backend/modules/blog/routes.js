import express from "express";
import { fetchBlogPosts, addBlogPost } from "./controller.js";
import { authenticateUser, isAdmin } from "../auth/middleware.js";

const router = express.Router();

router.get("/", fetchBlogPosts);
router.post("/", authenticateUser, isAdmin, addBlogPost);

export default router;
