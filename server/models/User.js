const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        credits: {
            type: Number,
            default: 10, // Starting free credits
        },
        subscriptionTier: {
            type: String,
            enum: ['free', 'pro', 'business'],
            default: 'free'
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
