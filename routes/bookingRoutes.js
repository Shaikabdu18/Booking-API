const express = require("express")
const router = express.Router()
const bookController = require("../controllers/bookController")
const verifyToken = require("../verifyToken")

router.post("/bookings",verifyToken,bookController.createBooking)
router.get("/bookings",verifyToken,bookController.getBooking)
router.get("/bookings/:id",verifyToken,bookController.getBookingid)
router.put("/bookings/:id",verifyToken,bookController.updateBooking)
router.delete("/bookings/:id",verifyToken,bookController.cancelBooking)



module.exports = router;