const Contact = require('../models/Contact')

exports.createContact = async (req, res) => {
    try {
        const { name, email, phoneNumber, message } = req.body;

        // Validation
        if (!name || !email || !phoneNumber || !message) {
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

        // Save to DB
        await Contact.create({
            name,
            email,
            phoneNumber,
            message,
        });

        return res.status(201).json({
            success: true,
            message: "Message sent successfully.",
        });

    } catch (error) {
        console.error("Contact creation error:", error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong while sending message.",
        });
    }
};

exports.getMessageDetails = async (req, res) => {
    try {
        const { messageId } = req.body
        if (!messageId) {
            return res.status(400).json({
                success: false,
                message: "Message Id Not Found"
            })
        }

        const data = await Contact.findById(messageId)

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

exports.getAllMessage = async (req, res) => {
    try {

        const data = await Contact.find();
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

exports.deleteMessage = async(req,res)=>{
    try{
        const { messageId } = req.body
        if (!messageId) {
            return res.status(400).json({
                success: false,
                message: "Message Id Not Found"
            })
        }

        await Contact.findByIdAndDelete(messageId)

        return res.status(200).json({
            success:true,
            message:"Message Delete Successfully",
        })
    }catch(error){
        return res.status(500).json({
            success: false,
            message: `Something went wrong while deleting the Details`,
        })
    }
}