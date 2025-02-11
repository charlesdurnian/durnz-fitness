import express from "express";
import { getUser, updateUser } from "./controller.js";
import { authenticateUser } from "../auth/middleware.js";

const router = express.Router();

router.get("/", authenticateUser, getUser);
router.put("/", authenticateUser, updateUser);

export default router;
