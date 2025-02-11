import { getProfileByUserId, updateProfile as updateProfileService } from "./service.js";

export const getOwnProfile = async (req, res) => {
  try {
    const profile = await getProfileByUserId(req.user.id);
    if (!profile) return res.status(404).json({ error: "Profile not found" });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateProfile = async (req, res) => {
  const { username, avatar_url } = req.body;
  try {
    const updatedProfile = await updateProfileService(req.user.id, username, avatar_url);
    res.json(updatedProfile);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};


