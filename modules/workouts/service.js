import pool from "../../db/db.js";

// Fetch all workouts
export const getAllWorkouts = async () => {
  const result = await pool.query("SELECT * FROM workouts ORDER BY created_at DESC");
  return result.rows;
};

// Fetch a specific workout by ID
export const getWorkoutById = async (workoutId) => {
  const result = await pool.query("SELECT * FROM workouts WHERE id = $1", [workoutId]);
  return result.rows[0];
};

// Create a new workout
export const createWorkout = async (name, variations, authorId) => {
  const result = await pool.query(
    `INSERT INTO workouts (name, variations, author_id) 
     VALUES ($1, $2, $3) RETURNING *`,
    [name, variations, authorId]
  );
  return result.rows[0];
};

// Update a workout
export const updateWorkout = async (workoutId, updates) => {
  const { name, variations } = updates;

  const result = await pool.query(
    `UPDATE workouts 
     SET name = $1, variations = $2
     WHERE id = $3
     RETURNING *`,
    [name, variations, workoutId]
  );

  return result.rows[0]; // Returns the updated workout
};

// Delete a workout
export const deleteWorkout = async (workoutId) => {
  const result = await pool.query("DELETE FROM workouts WHERE id = $1 RETURNING *", [workoutId]);
  return result.rows[0]; // Returns the deleted workout
};
