import { getUserById, updateUser } from "./service.js";

export const getUserProfile = async (req, res) => {
  try {
    const user = await getUserById(req.user.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateUserProfile = async (req, res) => {
  const { email, password, bio } = req.body;
  try {
    const updatedUser = await updateUser(req.user.id, email, password, bio);
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
