const Post = require("../models/Post");
const User = require("../models/User");
const { generatePost, translatePost } = require("../utils/aiService");

const createPost = async (req, res) => {
    const { idea, platform, tone, image } = req.body;

    if (!idea || !platform || !tone) {
        return res.status(400).json({ success: false, message: "Please provide all required fields" });
    }

    try {
        const user = await User.findById(req.user.id);
        if (user.credits <= 0) {
            return res.status(402).json({ success: false, message: "Insufficient credits. Please upgrade your plan." });
        }

        const generatedContent = await generatePost(idea, platform, tone, image);

        user.credits -= 1;
        await user.save();

        const post = await Post.create({
            userId: req.user.id,
            idea,
            platform,
            tone,
            generatedContent,
            image,
        });

        res.status(201).json({ success: true, post });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getUserPosts = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    try {
        const totalPosts = await Post.countDocuments({ userId: req.user.id });
        const posts = await Post.find({ userId: req.user.id })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        res.json({
            success: true,
            posts,
            totalPages: Math.ceil(totalPosts / limit),
            currentPage: page,
            totalPosts
        });
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

const generateImagePrompt = async (req, res) => {
    const { text } = req.body;
    if (!text) {
        return res.status(400).json({ success: false, message: "Please provide text" });
    }
    try {
        const user = await User.findById(req.user.id);
        if (user.credits <= 0) {
            return res.status(402).json({ success: false, message: "Insufficient credits. Please upgrade your plan." });
        }

        const { GoogleGenerativeAI } = require("@google/generative-ai");
        const promptText = `Based on the following social media post, create a short, visually descriptive prompt (less than 40 words) for an AI image generator like Midjourney or Stable Diffusion. Only output the prompt text, no other words. \n\nPost: ${text}`;

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const result = await model.generateContent(promptText);
        const imagePrompt = (await result.response.text()).trim();

        const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(imagePrompt)}?width=1024&height=1024&nologo=true`;

        user.credits -= 1;
        await user.save();

        res.status(200).json({ success: true, imageUrl });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { createPost, getUserPosts, deletePost, translateUserPost, generateImagePrompt, getUserProfile };
