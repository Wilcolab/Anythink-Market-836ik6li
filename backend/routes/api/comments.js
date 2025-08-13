const router = require("express").Router();
const mongoose = require("mongoose");
const Comment = mongoose.model("Comment");

module.exports = router;

// Hey GitHub Copilot, // please write a route to get all comments for a specific post
router.get("/:postId", async (req, res) => {
  const { postId } = req.params;

  try {
    const comments = await Comment.find({ postId }).sort({ createdAt: -1 });
    res.status(200).json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//Add another endpoint for deleting a comment
router.delete("/:commentId", async (req, res) => {
  const { commentId } = req.params;

  try {
    const deletedComment = await Comment.findByIdAndDelete(commentId);
    if (!deletedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Add another endpoint for creating a new comment
router.post("/", async (req, res) => {
  const { postId, content } = req.body;

  if (!postId || !content) {
    return res.status(400).json({ message: "Post ID and content are required" });
  }

  try {
    const newComment = new Comment({
      postId,
      content,
      createdAt: new Date(),
    });

    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Hey GitHub Copilot,
// please write a route to update an existing comment
// This route will allow users to update the content of a comment by its ID
// It will also update the updatedAt timestamp to the current date and time
// This is useful for keeping track of when a comment was last modified
// The route will respond with the updated comment or an error message if the comment is not found
// Add another endpoint for updating a comment
router.put("/:commentId", async (req, res) => {
  const { commentId } = req.params;
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ message: "Content is required" });
  }

  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { content, updatedAt: new Date() },
      { new: true }
    );

    if (!updatedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res.status(200).json(updatedComment);
  } catch (error) {
    console.error("Error updating comment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Export the router
module.exports = router;