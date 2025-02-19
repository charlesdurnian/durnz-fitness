import pool from "../../db/db.js";

// Fetch all workouts (default: daily)
export const getWorkoutsByType = async (type = "daily") => {
  const result = await pool.query(
    "SELECT * FROM workouts WHERE type = $1 ORDER BY created_at DESC",
    [type]
  );
  return result.rows;
};

// Fetch a workout by date
export const getWorkoutByDate = async (date, type = "daily") => {
  const result = await pool.query(
    "SELECT * FROM workouts WHERE DATE(created_at) = $1 AND type = $2",
    [date, type]
  );
  return result.rows[0] || null;
};

// Create a new workout
export const createWorkout = async (
  name,
  type,
  video_url,
  details,
  warm_ups,
  scaling,
  movement_standards,
  stimulus_strategy
) => {
  const result = await pool.query(
    `INSERT INTO workouts 
      (name, type, video_url, details, warm_ups, scaling, movement_standards, stimulus_strategy) 
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
     RETURNING *`,
    [name, type, video_url, details, warm_ups, scaling, movement_standards, stimulus_strategy]
  );
  return result.rows[0];
};
