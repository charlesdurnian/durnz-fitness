import pool from "../../db/db.js";

// Add a new comment
export const addCommentService = async (workoutId, userId, content) => {
    const result = await pool.query(
        "INSERT INTO comments (workout_id, user_id, content) VALUES ($1, $2, $3) RETURNING *",
        [workoutId, userId, content]
    );
    return result.rows[0];
};

// Get all comments for a specific workout
export const getCommentsByWorkoutService = async (workoutId) => {
    const result = await pool.query(
        "SELECT comments.*, users.email FROM comments JOIN users ON comments.user_id = users.id WHERE workout_id = $1",
        [workoutId]
    );
    return result.rows;
};

// Get a specific comment by ID
export const getCommentByIdService = async (commentId) => {
    const result = await pool.query("SELECT * FROM comments WHERE id = $1", [commentId]);
    return result.rows[0]; // Returns comment or undefined
};

// Delete a comment
export const deleteCommentService = async (commentId) => {
    const result = await pool.query("DELETE FROM comments WHERE id = $1 RETURNING *", [commentId]);

    if (result.rowCount === 0) {
        return null; // No comment was deleted
    }

    return result.rows[0]; // Return deleted comment
};
