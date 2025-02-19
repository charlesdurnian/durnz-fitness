import { 
    addCommentService, 
    getCommentsByWorkoutService, 
    getCommentByIdService, 
    deleteCommentService 
} from "./service.js";

// Add a new comment
export const addCommentController = async (req, res) => {
    const { workoutId } = req.params;
    const { content } = req.body;
    const userId = req.user.id;

    try {
        const comment = await addCommentService(workoutId, userId, content);
        res.status(201).json(comment);
    } catch (err) {
        console.error("❌ Error adding comment:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Get all comments for a specific workout
export const getCommentsByWorkoutController = async (req, res) => {
    const { workoutId } = req.params;

    try {
        const comments = await getCommentsByWorkoutService(workoutId);
        res.json(comments);
    } catch (err) {
        console.error("❌ Error fetching comments:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Delete a comment
export const deleteCommentController = async (req, res) => {
    const { commentId } = req.params;
    const userId = req.user.id;
    const userRole = req.user.role; // 'admin' or 'user'

    try {
        // Check if the comment exists
        const comment = await getCommentByIdService(commentId);
        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }

        // Only allow deletion if user is owner or an admin
        if (comment.user_id !== userId && userRole !== "admin") {
            return res.status(403).json({ error: "Unauthorized to delete this comment" });
        }

        // Delete the comment
        const deletedComment = await deleteCommentService(commentId);

        if (!deletedComment) {
            return res.status(500).json({ error: "Failed to delete comment" });
        }
        res.json({ message: "Comment deleted successfully" });

    } catch (err) {
        console.error("❌ Error deleting comment:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
