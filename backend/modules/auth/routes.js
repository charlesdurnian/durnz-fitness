import express from "express";
import { registerUser, loginUser } from "./service.js";

const router = express.Router();

// 🔹 Register Endpoint
router.post("/register", async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const user = await registerUser(email, password, role);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 Login Endpoint
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const { token, user } = await loginUser(email, password);
    res.json({ token, user });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

export default router;
