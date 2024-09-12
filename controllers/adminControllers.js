const User = require("../models/User")
const Booking = require("../models/Booking")

//Get all Bookings
exports.getAllBooking=async(req,res)=>{
  try {
    const bookings = await Booking.find().populate("user")
    res.json(bookings)
    
  } catch (error) {
    res.status(500).send(error.message)
  }
}
// Get all users
exports.getAllUsers = async(req,res)=>{
  try {
    const users = await User.find()
    console.log(users)
    res.status(200).json({users})
    
  } catch (error) {
    res.status(500).json({"error":error.message})
  }
}

//Update user Role
exports.updateUserRole = async(req,res)=>{
  try {
    const user = await User.findById(req.params.id)
    console.log(user)
    if(!user) return res.status(404).json({msg:"user not found"})
      user.role = req.body.role
      await user.save()
      res.json(user)
  } catch (error) {
    res.status(500).json({"msg":error.message})
  }
}