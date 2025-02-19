import { 
  getWorkoutsByType, 
  getWorkoutByDate, 
  createWorkout 
} from "./service.js";

// Fetch workouts by type (Daily, Team, Dumbbell, Bodyweight)
export const fetchWorkoutsByType = async (req, res) => {
  try {
    const { type } = req.params;
    const workouts = await getWorkoutsByType(type);
    res.json(workouts);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Fetch a workout by date
export const fetchWorkoutByDate = async (req, res) => {
  try {
    const { date, type } = req.params;
    const workout = await getWorkoutByDate(date, type);
    if (!workout) return res.status(404).json({ error: "Workout not found" });

    res.json(workout);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Add a new workout
export const addWorkout = async (req, res) => {
  const { name, type, video_url, details, warm_ups, scaling, movement_standards, stimulus_strategy } = req.body;
  
  try {
    const newWorkout = await createWorkout(
      name,
      type,
      video_url,
      details,
      warm_ups,
      scaling,
      movement_standards,
      stimulus_strategy
    );
    res.status(201).json(newWorkout);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};