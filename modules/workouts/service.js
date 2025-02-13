import pool from "../../db/db.js";

export const getAllWorkouts = async () => {
  const result = await pool.query("SELECT * FROM workouts ORDER BY created_at DESC");
  return result.rows;
};

export const createWorkout = async (name, workout, standards, scaling) => {
  const result = await pool.query(
    "INSERT INTO workouts (name, workout, standards, scaling) VALUES ($1, $2, $3 ,$4) RETURNING *",
    [name, workout, standards, scaling]
  );
  return result.rows[0];
};

export const addCommentService = async (workoutId, userId, content) => {
    const result = await pool.query(
      "INSERT INTO comments (workout_id, user_id, content) VALUES ($1, $2, $3) RETURNING *",
      [workoutId, userId, content]
    );
    return result.rows[0];
  };

  export const getCommentsByWorkoutService = async (workoutId) => {
    const result = await pool.query(
      "SELECT comments.*, users.email FROM comments JOIN users ON comments.user_id = users.id WHERE workout_id = $1",
      [workoutId]
    );
    return result.rows;
  };

  export const getCommentByIdService = async (commentId) => {
    const result = await pool.query("SELECT * FROM comments WHERE id = $1", [commentId]);
    return result.rows[0]; // Returns comment or undefined
  };

  export const deleteCommentService = async (commentId) => {
    const result = await pool.query("DELETE FROM comments WHERE id = $1 RETURNING *", [commentId]);
  
    if (result.rowCount === 0) {
      return null; // No comment was deleted
    }
  
    return result.rows[0]; // Return deleted comment
  };
  