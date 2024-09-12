const express = require("express")
const router = express.Router()
const bookController = require("../controllers/bookController")
const adminController = require("../controllers/adminControllers")
const verifyToken = require("../verifyToken")

//Get Booking
router.get("/bookings",verifyToken,adminController.getAllBooking)
router.get("/users",verifyToken,adminController.getAllBooking)
router.post("/users/:id",verifyToken,adminController.updateUserRole)

module.exports=router
