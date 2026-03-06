const express = require('express')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT || 4000
const cors = require('cors')
const dbConnection = require('./config/dbConnection')
const { cloudinary } = require('./config/cloudinary')
const fileUpload = require('express-fileupload')

// Routes
const contactRouters = require('./routes/Contact')
const careerRouters = require('./routes/Career')
const consultationRouters = require('./routes/Consultation')

// Basic Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const allowedOrigins = [
    "https://codefrequency.com",
    "https://www.codefrequency.com"
    // "http://localhost:5173",
];
app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}))

// ✅ File upload middleware MUST come before routes
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
}))

// Routes
app.use("/code/frequency/contact", contactRouters)
app.use("/code/frequency/career", careerRouters)
app.use("/code/frequency/consultation",consultationRouters)

app.get("/", (req, res) => {
    res.send(`Hello Code Frequency`)
})

dbConnection();
cloudinary();

app.listen(PORT, () => {
    console.log("The Server Start Successfully at PORT ->", PORT)
})