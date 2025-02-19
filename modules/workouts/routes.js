import express from "express";
import { authenticateUser } from "../auth/middleware.js";
import { 
  fetchWorkoutsByType, 
  fetchWorkoutByDate, 
  addWorkout 
} from "./controller.js";

const router = express.Router();

router.get("/:type", fetchWorkoutsByType); // Fetch all workouts of a specific type
router.get("/:type/:date", fetchWorkoutByDate); // Fetch a workout by date
router.post("/", authenticateUser, addWorkout); // Create a new workout

export default router;

