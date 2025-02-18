import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./db/db.js";
import authRoutes from "./modules/auth/routes.js";
import userRoutes from "./modules/user/routes.js";
import profileRoutes from "./modules/profile/routes.js";
import blogRoutes from "./modules/blog/routes.js";
import workoutRoutes from "./modules/workouts/routes.js";
import { readFile } from "fs/promises";

dotenv.config();

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true, // Allow cookies if needed
  })
);

// Function to Create Tables from SQL File
const createTables = async () => {
  try {
    const sql = await readFile("./db/init.sql", "utf-8");
    await pool.query(sql);
    console.log("✅ Database tables checked/created");
  } catch (err) {
    console.error("❌ Error initializing database:", err);
  }
};

// Run the function to initialize tables
await createTables();

// Register Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/workouts", workoutRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
