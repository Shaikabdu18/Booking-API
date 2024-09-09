const express = require("express")
const router = express.Router()
const bookController = require("../controllers/bookController")
const verifyToken = require("../verifyToken")

router.post("/bookings",verifyToken,bookController.createBooking)
router.get("/bookings",verifyToken,bookController.getBooking)

module.exports = router;