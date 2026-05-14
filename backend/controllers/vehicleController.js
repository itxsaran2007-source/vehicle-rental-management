const Vehicle = require("../models/Vehicle");
const responseHelper = require("../utils/responseHelper");

exports.getAll = async (req, res, next) => {
  try {
    const { category } = req.query;
    // If admin is logged in, they might want to see all vehicles
    const showAll = req.user && req.user.role === "admin";
    const vehicles = await Vehicle.getAll(category, showAll);
    responseHelper.success(res, 200, vehicles);
  } catch (err) {
    next(err);
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) return responseHelper.error(res, 404, "Vehicle not found");
    responseHelper.success(res, 200, vehicle);
  } catch (err) {
    next(err);
  }
};

exports.addVehicle = async (req, res, next) => {
  try {
    const { name, category, price_per_day, transmission, fuel_type, image_url, description } = req.body;
    if (!name || !category || !price_per_day) {
      return responseHelper.error(res, 400, "Name, category and price are required");
    }
    const vehicle = await Vehicle.create(req.body);
    responseHelper.success(res, 201, vehicle);
  } catch (err) {
    next(err);
  }
};

exports.removeVehicle = async (req, res, next) => {
  try {
    const success = await Vehicle.remove(req.params.id);
    if (!success) return responseHelper.error(res, 404, "Vehicle not found");
    responseHelper.success(res, 200, { message: "Vehicle removed successfully" });
  } catch (err) {
    next(err);
  }
};
