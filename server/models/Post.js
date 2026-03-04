const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        idea: {
            type: String,
            required: true,
        },
        platform: {
            type: String,
            required: true,
        },
        tone: {
            type: String,
            required: true,
        },
        generatedContent: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
