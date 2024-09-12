const express = require("express")
const app = express()
require("dotenv").config();
const mongoose = require("mongoose")
const authRoutes = require("./routes/authRoutes")
const bookingRoutes = require("./routes/bookingRoutes")
const adminRoutes = require("./routes/adminRoutes")

//MiddleWare
app.use(express.json())
app.use("/api",authRoutes);
app.use("/api",bookingRoutes);
app.use("/api/admin",adminRoutes);



//MongoDB Coonection

const MongoDB = async()=>{
  try {
    mongoose.connect(process.env.Mongo_URL)
    console.log("MongoDB Connected")
  } catch (error) {
    console.error("Error Connecting to Database",error.message);
    
  }
}
app.listen(4000,()=>{
  console.log("Port running on 4000")
  MongoDB()
})