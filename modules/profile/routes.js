import express from "express";
import { getOwnProfile, updateProfile } from "./controller.js";
import { authenticateUser } from "../auth/middleware.js";

const router = express.Router();

router.get("/", authenticateUser, getOwnProfile);
router.put("/", authenticateUser, updateProfile);

export default router;
