import express from "express";
import { getUserProfile, updateUserProfile } from "../controller/userController.js";
import { authenticateUser } from "../../auth/middleware/authMiddleware.js";

const router = express.Router();

// Get current user profile
router.get("/profile", authenticateUser, getUserProfile);

// Update user profile (email, password, bio, etc.)
router.put("/profile", authenticateUser, updateUserProfile);

export default router;
