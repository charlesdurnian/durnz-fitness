import pool from "../../db/db.js";

export const getProfileByUserId = async (userId) => {
  const result = await pool.query("SELECT * FROM profiles WHERE user_id = $1", [userId]);
  return result.rows[0];
};

export const updateProfile = async (userId, username, avatar_url) => {
  const result = await pool.query(
    `UPDATE profiles 
     SET username = COALESCE($1, username), 
         avatar_url = COALESCE($2, avatar_url), 
         updated_at = NOW()
     WHERE user_id = $3 
     RETURNING *`,
    [username, avatar_url, userId]
  );
  return result.rows[0];
};

