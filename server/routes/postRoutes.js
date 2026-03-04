const express = require("express");
const { createPost, getUserPosts, deletePost, translateUserPost } = require("../controllers/postController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createPost);
router.post("/translate", protect, translateUserPost);
router.get("/", protect, getUserPosts);
router.delete("/:id", protect, deletePost);

module.exports = router;
