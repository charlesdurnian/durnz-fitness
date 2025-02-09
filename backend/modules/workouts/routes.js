import express from "express";
import { fetchWorkouts,
    addWorkout,
    addComment,
    getCommentsByWorkout,
    deleteComment
 } from "./controller.js";
 
const router = express.Router();

router.get("/", fetchWorkouts);
router.post("/", addWorkout);
router.post("/:workoutId", authenticateUser, addComment);
router.get("/:workoutId", getCommentsByWorkout);
router.delete("/:commentId", authenticateUser, deleteComment);


export default router;
