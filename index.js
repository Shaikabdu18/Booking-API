const express = require("express")
const app = express()
require("dotenv").config();
const mongoose = require("mongoose")
const authRoutes = require("./routes/authRoutes")
const bookingRoutes = require("./routes/bookingRoutes")

//MiddleWare
app.use(express.json())
app.use("/api",authRoutes);
app.use("/api",bookingRoutes);


//MongoDB Coonection
mongoose.connect(process.env.Mongo_URL)

const Database = mongoose.connection;

Database.on("error",(err)=>{
  console.error("DB Connection",err)
})

Database.on("connected",()=>{
  console.log("MongoDB connected")
})

app.listen(4000,()=>{
  console.log("Port running on 4000")
})