import pool from "../../db/db.js";
import bcrypt from "bcryptjs";

export const getUserById = async (userId) => {
  const result = await pool.query("SELECT id, email, bio, role FROM users WHERE id = $1", [userId]);
  return result.rows[0];
};

export const updateUser = async (userId, email, password, bio) => {
  let hashedPassword = password ? await bcrypt.hash(password, 10) : null;
  const result = await pool.query(
    `UPDATE users SET email = COALESCE($1, email), password = COALESCE($2, password), bio = COALESCE($3, bio) 
     WHERE id = $4 RETURNING id, email, bio, role`,
    [email, hashedPassword, bio, userId]
  );
  return result.rows[0];
};
