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
// Get booking by id
exports.getBookingid = async(req,res)=>{
  const {id} = req.params
  try {
    const booking = await Booking.findById(id)
    if(!id) return res.status(400).json({"msg":"Invalid id"})
      res.status(200).json({booking})
  } catch (error) {
    res.status(500).json({"error":error.message})
  }
}

// Update Booking
exports.updateBooking = async(req,res)=>{
  const {serviceName,bookingDate}=req.body
  try {
    const booking = await Booking.findById(req.params.id)
    if(!booking) {
      console.log("Booking not found");
      return res.status(404).json({msg:"Booking Not Found"})}
      console.log(booking.user.toString())
    if(booking.user.toString()!== req.user.id) {
      console.log("Unauthorized user");
      return res.status(401).json({msg:"UnAuthorized"}) }
      booking.serviceName = serviceName
      booking.bookingDate = bookingDate
      await booking.save()
      return res.status(200).send(booking)

  } catch (error) {
    return res.status(500).json({msg:error.message})
  }
}
// Cancel Booking
exports.cancelBooking = async(req,res)=>{
  const {status} = req.body;
  try {
    const booking = await Booking.findById(req.params.id)
    // console.log(req.params.id)
    if(!booking) return res.status(404).json({msg:"Booking Not Found"})
    if(booking.user.toString()!=req.user.id) return res.status(401).json({msg:"UnAuthorized"})
    booking.status = status|| "cancelled";
    await booking.save()
    res.status(200).json({msg:"Booking Status Changed"})
    
  } catch (error) {
    res.status(500).json({msg:error.message})
  }
}