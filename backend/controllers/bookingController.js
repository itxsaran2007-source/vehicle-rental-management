const Booking = require("../models/Booking");
const Vehicle = require("../models/Vehicle");
const responseHelper = require("../utils/responseHelper");

exports.create = async (req, res, next) => {
  try {
    const { vehicle_id, location_id, pickup_datetime, return_datetime, payment_method } = req.body;

    if (!vehicle_id || !location_id || !pickup_datetime || !return_datetime || !payment_method) {
      return responseHelper.error(res, 400, "All fields are required");
    }

    const vehicle = await Vehicle.findById(vehicle_id);
    if (!vehicle) return responseHelper.error(res, 404, "Vehicle not found");

    const pickup = new Date(pickup_datetime);
    const ret    = new Date(return_datetime);
    if (ret <= pickup) return responseHelper.error(res, 400, "Return date must be after pickup date");

    const days  = Math.ceil((ret - pickup) / (1000 * 60 * 60 * 24));
    const total = days * Number(vehicle.price_per_day);

    const booking = await Booking.create({
      user_id: req.user.id,
      vehicle_id,
      location_id,
      pickup_datetime,
      return_datetime,
      total_price: total,
      payment_method,
    });

    responseHelper.success(res, 201, booking);
  } catch (err) {
    next(err);
  }
};

exports.myBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.findByUser(req.user.id);
    responseHelper.success(res, 200, bookings);
  } catch (err) {
    next(err);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const bookings = await Booking.getAll();
    responseHelper.success(res, 200, bookings);
  } catch (err) {
    next(err);
  }
};

exports.cancel = async (req, res, next) => {
  try {
    const success = await Booking.cancel(req.params.id, req.user.id);
    if (!success) return responseHelper.error(res, 404, "Booking not found or unauthorized");
    responseHelper.success(res, 200, { message: "Booking cancelled" });
  } catch (err) {
    next(err);
  }
};
