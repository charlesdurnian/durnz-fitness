import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./db/db.js";
import authRoutes from "./routes/authRoutes.js";
import blogRoutes from "./modules/blog/routes.js";
import workoutRoutes from "./modules/workouts/routes.js";
import { createBlogTable } from "./modules/blog/model.js";
import { createWorkoutTable } from "./modules/workouts/model.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Create Tables (if not exists)
const createTables = async () => {
  await pool.query(createBlogTable);
  await pool.query(createWorkoutTable);
  console.log("Tables checked/created");
};

createTables();

// Register Routes
app.use("/api/auth", authRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/workouts", workoutRoutes);

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
