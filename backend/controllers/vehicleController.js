const Vehicle = require("../models/Vehicle");
const responseHelper = require("../utils/responseHelper");

exports.getAll = async (req, res, next) => {
  try {
    const { category } = req.query;
    const vehicles = await Vehicle.getAll(category);
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
