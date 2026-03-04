const Post = require("../models/Post");
const { generatePost, translatePost } = require("../utils/aiService");

const createPost = async (req, res) => {
    const { idea, platform, tone } = req.body;

    if (!idea || !platform || !tone) {
        return res.status(400).json({ success: false, message: "Please provide all required fields" });
    }

    try {
        const generatedContent = await generatePost(idea, platform, tone);

        const post = await Post.create({
            userId: req.user.id,
            idea,
            platform,
            tone,
            generatedContent,
        });

        res.status(201).json({ success: true, post });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getUserPosts = async (req, res) => {
    try {
        const posts = await Post.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.json({ success: true, posts });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }

        if (post.userId.toString() !== req.user.id) {
            return res.status(401).json({ success: false, message: "Not authorized to delete this post" });
        }

        await post.deleteOne();
        res.json({ success: true, message: "Post removed" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const translateUserPost = async (req, res) => {
    const { text, targetLanguage } = req.body;
    if (!text || !targetLanguage) {
        return res.status(400).json({ success: false, message: "Please provide text and targetLanguage" });
    }
    try {
        const translatedContent = await translatePost(text, targetLanguage);
        res.status(200).json({ success: true, translatedContent });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { createPost, getUserPosts, deletePost, translateUserPost };
