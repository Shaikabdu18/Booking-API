const Booking = require("../models/Booking")
//Create Booking
exports.createBooking = async(req,res)=>{
const {serviceName,bookingDate} = req.body
if (!req.user) {
  return res.status(401).json({ msg: 'User not authenticated' });
}
try {
  const booking = new Booking({
    user:req.user.id,
    serviceName,
    bookingDate
  })
  await booking.save()
  return res.status(201).send("Booking Saved")
} catch (error) {
  console.error(error)
  return res.status(500).json({"error":error})
}
}

//Get all Booking
exports.getBooking = async(req,res)=>{
  try {
    const booking = await Booking.find({user:req.user.id})
    res.status(200).json(booking)
  } catch (error) {
    res.status(500).json(error)
  }
}