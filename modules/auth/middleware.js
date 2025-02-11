import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET;

// 🔹 Middleware to authenticate users via JWT
export const authenticateUser = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Extract token from "Bearer <token>"

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // Attach user data to request object
    next(); // Proceed to next middleware
  } catch (err) {
    res.status(403).json({ error: "Invalid or expired token." });
  }
};

// 🔹 Middleware to authorize only admins
export const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Access denied. Admins only." });
  }
  next();
};

