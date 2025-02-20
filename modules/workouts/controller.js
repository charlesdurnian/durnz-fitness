import { 
  getAllWorkouts, 
  getWorkoutById, 
  createWorkout, 
  updateWorkout, 
  deleteWorkout 
} from "./service.js";

// Fetch all workouts
export const fetchWorkouts = async (req, res) => {
  try {
    const workouts = await getAllWorkouts();
    res.json(workouts);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Fetch a workout by ID
export const fetchWorkoutById = async (req, res) => {
  try {
    const { workoutId } = req.params;
    const workout = await getWorkoutById(workoutId);
    if (!workout) return res.status(404).json({ error: "Workout not found" });

    res.json(workout);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Add a new workout
export const addWorkout = async (req, res) => {
  const { name, variations } = req.body;
  const authorId = req.user.id;

  try {
    const newWorkout = await createWorkout(name, variations, authorId);
    res.status(201).json(newWorkout);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update an existing workout
export const updateWorkoutController = async (req, res) => {
  const { workoutId } = req.params;
  const updates = req.body;

  try {
    const updatedWorkout = await updateWorkout(workoutId, updates);
    if (!updatedWorkout) return res.status(404).json({ error: "Workout not found" });

    res.json(updatedWorkout);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a workout
export const deleteWorkoutController = async (req, res) => {
  const { workoutId } = req.params;

  try {
    const deletedWorkout = await deleteWorkout(workoutId);
    if (!deletedWorkout) return res.status(404).json({ error: "Workout not found" });

    res.json({ message: "Workout deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
