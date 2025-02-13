import { getAllBlogPosts, createBlogPost } from "./service.js";

export const fetchBlogPosts = async (req, res) => {
  try {
    const blogPosts = await getAllBlogPosts();
    res.json(blogPosts);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const addBlogPost = async (req, res) => {
  const { title, content } = req.body;
  const author_id = req.user.id; // Get logged-in user ID

  try {
    // Ensure the user is logged in
    if (!author_id) {
      return res.status(401).json({ error: "Unauthorized: Missing user ID" });
    }

    const newPost = await createBlogPost(title, content, author_id);
    res.status(201).json(newPost);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

