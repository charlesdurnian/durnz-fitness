import express from "express";
import { authenticateUser, isAdmin } from "../auth/middleware.js";
import { 
  fetchWorkouts, 
  fetchWorkoutById, 
  addWorkout, 
  updateWorkoutController, 
  deleteWorkoutController 
} from "./controller.js";

const router = express.Router();

router.get("/", fetchWorkouts); // Fetch all workouts
router.get("/:workoutId", fetchWorkoutById); // Fetch a specific workout
router.post("/", authenticateUser, isAdmin, addWorkout); // Create a new workout (Admin only)
router.put("/:workoutId", authenticateUser, isAdmin, updateWorkoutController); // Update a workout (Admin only)
router.delete("/:workoutId", authenticateUser, isAdmin, deleteWorkoutController); // Delete a workout (Admin only)

export default router;

