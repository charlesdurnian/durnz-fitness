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
  const { title, content, author } = req.body;
  try {
    const newPost = await createBlogPost(title, content, author);
    res.status(201).json(newPost);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
