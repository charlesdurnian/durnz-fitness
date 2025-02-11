import { getUserById, updateUser as updateUserService } from "./service.js";

export const getUser = async (req, res) => {
  try {
    const user = await getUserById(req.user.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const updatedUser = await updateUserService(req.user.id, email, password);
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
