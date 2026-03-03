const Career = require('../models/Career')
const { uploadImageToCloudinary } = require('../utils/fileUploader')
require('dotenv').config();

exports.createCareer = async (req, res) => {
    try {
        console.log("This is all info in", req.body);
        const { name, email, phoneNumber, position, message } = req.body;

        if (!req.files || !req.files.resume) {
            return res.status(400).json({
                success: false,
                message: "Resume file is required.",
            });
        }

        const { resume } = req.files;

        if (!name || !email || !phoneNumber || !position || !message) {
            return res.status(400).json({
                success: false,
                message: "All fields are required.",
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format",
            });
        }

        if (resume.mimetype !== "application/pdf") {
            return res.status(400).json({
                success: false,
                message: "Only PDF files are allowed.",
            });
        }

        const resumeUpload = await uploadImageToCloudinary(
            resume,
            process.env.FOLDER_NAME
        );

        await Career.create({
            name,
            email,
            phoneNumber,
            position,
            message,
            resume: resumeUpload.secure_url,
        });

        return res.status(201).json({
            success: true,
            message: "Application submitted successfully.",
        });

    } catch (error) {
        console.error("Career creation error:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while submitting application.",
        });
    }
};

exports.getCareerMessageDetails = async (req, res) => {
    try {
        const { messageId } = req.body
        if (!messageId) {
            return res.status(400).json({
                success: false,
                message: "Message Id Not Found"
            })
        }

        const data = await Career.findById(messageId)

        return res.status(200).json({
            success: true,
            data: data,
            message: "Message Details"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Something went wrong while Gating the Details`,
        })
    }
}

exports.getCareerAllMessage = async (req, res) => {
    try {

        const data = await Career.find();
        return res.status(200).json({
            success: true,
            data: data,
            message: "All Message"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Something went wrong while Gating the Details`,
        })
    }
}

exports.deleteCareerMessage = async (req, res) => {
    try {
        const { messageId } = req.body
        if (!messageId) {
            return res.status(400).json({
                success: false,
                message: "Message Id Not Found"
            })
        }

        await Career.findByIdAndDelete(messageId)

        return res.status(200).json({
            success: true,
            message: "Message Delete Successfully",
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Something went wrong while deleting the Details`,
        })
    }
}