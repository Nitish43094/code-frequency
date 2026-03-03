const express = require('express')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT || 4000
const cors = require('cors')


app.get("/",(req,res) =>{
    res.send(`Hello Code Frequency`)
})
app.listen(PORT,(req,res)=>{
    console.log("The Server Start Successfully at PORT ->",PORT)
})