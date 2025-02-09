import pool from "../../db/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET;

// 🔹 Register User
export const registerUser = async (email, password, role = "user") => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await pool.query(
    "INSERT INTO users (email, password, role) VALUES ($1, $2, $3) RETURNING id, email, role",
    [email, hashedPassword, role]
  );
  return result.rows[0];
};

// 🔹 Login User
export const loginUser = async (email, password) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

  if (result.rows.length === 0) throw new Error("User not found");

  const user = result.rows[0];
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) throw new Error("Invalid credentials");

  // Generate JWT Token
  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, SECRET_KEY, {
    expiresIn: "7d",
  });

  return { token, user: { id: user.id, email: user.email, role: user.role } };
};
