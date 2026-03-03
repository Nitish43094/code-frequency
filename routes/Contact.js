const express = require('express')
const router = express.Router();

const { createContact, getAllMessage, getMessageDetails, deleteMessage } = require('../controller/Contact')

router.post("/createContact", createContact)
router.get("/getAllMessage", getAllMessage)
router.get("/getMessageDetails", getMessageDetails)
router.delete("/deleteMessage", deleteMessage)

module.exports = router