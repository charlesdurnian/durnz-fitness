import pool from "../../db/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET;

// Register User (Creates User + Profile)
export const registerUser = async (email, password, role = "user") => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN"); // Start transaction

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User
    const userResult = await client.query(
      "INSERT INTO users (email, password, role) VALUES ($1, $2, $3) RETURNING id, email, role",
      [email, hashedPassword, role]
    );
    const user = userResult.rows[0];

    // Create Profile for New User
    await client.query(
      "INSERT INTO profiles (user_id, username) VALUES ($1, $2)",
      [user.id, email.split("@")[0]] // Default username = email prefix
    );

    await client.query("COMMIT"); // Commit transaction
    return user;
  } catch (error) {
    await client.query("ROLLBACK"); // Rollback on error
    throw error;
  } finally {
    client.release();
  }
};

// Login User
export const loginUser = async (email, password) => {
  console.log("Loaded JWT_SECRET:", SECRET_KEY); // 🔍 Debugging line

  if (!SECRET_KEY) {
    throw new Error("JWT_SECRET is missing in environment variables");
  }

  const result = await pool.query(
    `SELECT users.id, users.email, users.password, users.role, 
            profiles.username, profiles.avatar_url 
     FROM users 
     LEFT JOIN profiles ON users.id = profiles.user_id 
     WHERE users.email = $1`, 
    [email]
  );

  if (result.rows.length === 0) throw new Error("User not found");

  const user = result.rows[0];
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) throw new Error("Invalid credentials");

  // Generate JWT Token
  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, SECRET_KEY, {
    expiresIn: "7d",
  });

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      username: user.username,
      avatar_url: user.avatar_url,
    }
  };
};
