import { getAllWorkouts,
    createWorkout,
    addCommentService,
    getCommentsByWorkoutService,
    deleteCommentService 
} from "./service.js";


export const fetchWorkouts = async (req, res) => {
  try {
    const workouts = await getAllWorkouts();
    res.json(workouts);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const addWorkout = async (req, res) => {
  const { name, description, exercises } = req.body;
  try {
    const newWorkout = await createWorkout(name, description, exercises);
    res.status(201).json(newWorkout);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const addComment = async (req, res) => {
    const { workoutId } = req.params;
    const { content } = req.body;
    const userId = req.user.id;
  
    try {
      const comment = await addCommentService(workoutId, userId, content);
      res.status(201).json(comment);
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  export const getCommentsByWorkout = async (req, res) => {
    const { workoutId } = req.params;
  
    try {
      const comments = await getCommentsByWorkoutService(workoutId);
      res.json(comments);
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  export const deleteComment = async (req, res) => {
    const { commentId } = req.params;
    const userId = req.user.id;
    const userRole = req.user.role; // 'admin' or 'user'
  
    try {
      const comment = await getCommentByIdService(commentId);
      if (!comment) {
        return res.status(404).json({ error: "Comment not found" });
      }
  
      // Only allow deletion if user is the comment owner or an admin
      if (comment.user_id !== userId && userRole !== "admin") {
        return res.status(403).json({ error: "Unauthorized to delete this comment" });
      }
  
      await deleteCommentService(commentId);
      res.json({ message: "Comment deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };