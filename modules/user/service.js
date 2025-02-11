import pool from "../../../db/db.js";

export const getUserById = async (userId) => {
  const result = await pool.query("SELECT id, email FROM users WHERE id = $1", [userId]);
  return result.rows[0];
};

export const updateUser = async (userId, email, password) => {
  const result = await pool.query(
    `UPDATE users 
     SET email = COALESCE($1, email), 
         password = COALESCE($2, password), 
         updated_at = NOW()
     WHERE id = $3 
     RETURNING id, email`,
    [email, password, userId]
  );
  return result.rows[0];
};

