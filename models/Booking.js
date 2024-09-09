const mongoose = require("mongoose")
const bookingSchema = new mongoose.Schema({
  user:{
    type:mongoose.Schema.ObjectId,
    ref:"User",
    required:true
  },
  serviceName:{
    type:String,
    required:true,
  },
  bookingDate:{
    type:Date,
    required:true
  },
  status:{
    type:String,
    default:"Booked"
  }
})

module.exports = mongoose.model("Booking",bookingSchema)