const express = require("express");
const router  = express.Router();
const bookingController = require("../controllers/bookingController");
const protect = require("../middleware/authMiddleware");

// All booking routes require auth
router.post("/",        protect, bookingController.create);
router.get("/my",       protect, bookingController.myBookings);
router.get("/all",      protect, bookingController.getAll);       // admin use
router.patch("/:id/cancel", protect, bookingController.cancel);

module.exports = router;
