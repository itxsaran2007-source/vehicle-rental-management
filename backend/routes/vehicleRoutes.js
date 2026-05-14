const express = require("express");
const router  = express.Router();
const vehicleController = require("../controllers/vehicleController");
const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

// Helper to check auth without forcing it (optional auth)
const optionalAuth = (req, res, next) => {
  if (req.headers.authorization) {
    return protect(req, res, next);
  }
  next();
};

// GET /api/vehicles?category=car|bike|bus|all
router.get("/", optionalAuth, vehicleController.getAll);
router.get("/:id", vehicleController.getOne);

// Admin only routes
router.post("/", protect, admin, vehicleController.addVehicle);
router.delete("/:id", protect, admin, vehicleController.removeVehicle);

module.exports = router;
