import express from "express";
import { authenticateUser } from "../auth/middleware.js";
import { 
    addCommentController, 
    getCommentsByWorkoutController, 
    deleteCommentController 
} from "./controller.js";

const router = express.Router();

// Routes for managing comments
router.post("/:workoutId", authenticateUser, addCommentController);
router.get("/:workoutId", getCommentsByWorkoutController);
router.delete("/:commentId", authenticateUser, deleteCommentController);

export default router;
