const mongoose = require('mongoose')
const Consultation = require('../models/Consultation')
require('dotenv').config()

exports.createConsultation = async (req, res) => {
    try {
        const { name, email, phoneNumber, services, message } = req.body;

        if (!name || !email || !phoneNumber || !services || !message) {
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            })
        }
        await Consultation.create({
            name,
            email,
            phoneNumber,
            services,
            message
        })

        return res.status(200).json({
            success: true,
            message: "Application submitted successfully."
        })
    } catch (error) {
        console.error("Career creation error:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while submitting application.",
        });
    }
}

exports.getConsultationDetails = async (req, res) => {
    try {
        const { id } = req.body
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Id is Required",
            })
        }
        const data = await Consultation.findById(id)

        return res.status(200).json({
            success: true,
            data: data,
            message: "Consultation Details"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Something went wrong while Gating the Details ${error}`,
        })
    }
}

exports.GetAllConsultation = async (req, res) => {
    try {
        const data = await Consultation.find()
        return res.status(200).json({
            success: true,
            data: data,
            message: "All Consultation Message"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Something went wrong while Gating the Details ${error}`,
        })
    }
}

exports.deleteConsultation = async (req, res) => {
    try {
        const {id} = req.body
        if(!id){
            return res.status(400).json({
                success:false,
                message:"ID not Found",
            })
        }
        await Consultation.findByIdAndDelete(id)
        return res.status(200).json({
            success: true,
            message: "Message Delete Successfully",
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Something went wrong while deleting the Details ${error}`,
        })
    }
}