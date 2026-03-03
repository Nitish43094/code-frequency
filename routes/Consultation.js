const express = require('express')
const router = express.Router()

const {createConsultation,getConsultationDetails,GetAllConsultation,deleteConsultation} = require('../controller/Consultation')

router.post("/createConsultation",createConsultation)
router.get("/getConsultationDetails",getConsultationDetails)
router.get("/GetAllConsultation",GetAllConsultation)
router.delete("/deleteConsultation",deleteConsultation)

module.exports = router;