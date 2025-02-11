import express from "express";
import { handleRegister, handleLogin } from "./controller.js"; // Import controllers

const router = express.Router();

// 🔹 Register Route
router.post("/register", handleRegister);

// 🔹 Login Route
router.post("/login", handleLogin);

export default router;
