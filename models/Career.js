const mongoose = require('mongoose')

const careerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        position: {
            type: String,
            required: true,
            trim: true,
        },
        resume: {
            type: String,
            required: true,
            trim: true,
        },
        message: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,   // ✅ better than manually adding createdAt
    }
);

module.exports = mongoose.model("Career", careerSchema);