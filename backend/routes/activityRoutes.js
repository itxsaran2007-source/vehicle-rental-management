const express = require("express");
const router = express.Router();
const activityController = require("../controllers/activityController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, activityController.getRecentActivity);

module.exports = router;
