import pool from "../../db/db.js";

export const getAllBlogPosts = async () => {
  const result = await pool.query("SELECT * FROM blog_posts ORDER BY created_at DESC");
  return result.rows;
};

export const createBlogPost = async (title, content, author) => {
  const result = await pool.query(
    "INSERT INTO blog_posts (title, content, author) VALUES ($1, $2, $3) RETURNING *",
    [title, content, author]
  );
  return result.rows[0];
};
