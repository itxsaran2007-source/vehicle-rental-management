const express = require("express");
const router  = express.Router();
const vehicleController = require("../controllers/vehicleController");

// GET /api/vehicles?category=car|bike|bus|all
router.get("/", vehicleController.getAll);
router.get("/:id", vehicleController.getOne);

module.exports = router;
