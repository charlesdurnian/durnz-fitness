import { registerUser, loginUser } from "./service.js";

// 🔹 Register Controller
export const handleRegister = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const user = await registerUser(email, password, role);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔹 Login Controller
export const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { token, user } = await loginUser(email, password);
    res.json({ token, user });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};
