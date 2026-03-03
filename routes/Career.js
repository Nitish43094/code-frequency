const express = require('express')
const router = express.Router()

const {createCareer,getCareerAllMessage,getCareerMessageDetails,deleteCareerMessage} = require('../controller/Career')

router.post("/createCareer", createCareer)
router.get("/getCareerAllMessage", getCareerAllMessage)
router.get("/getCareerMessageDetails", getCareerMessageDetails)
router.delete("/deleteCareerMessage", deleteCareerMessage)

module.exports = router