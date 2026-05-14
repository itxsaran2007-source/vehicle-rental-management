const User = require("../models/User");
const responseHelper = require("../utils/responseHelper");

exports.listUsers = async (req, res, next) => {
  try {
    const users = await User.getAll();
    responseHelper.success(res, 200, users);
  } catch (error) {
    next(error);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return responseHelper.error(res, 404, "User not found");
    responseHelper.success(res, 200, user);
  } catch (error) {
    next(error);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    responseHelper.success(res, 201, user);
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const updated = await User.update(req.params.id, req.body);
    if (!updated) return responseHelper.error(res, 404, "User not found");
    responseHelper.success(res, 200, updated);
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const removed = await User.remove(req.params.id);
    if (!removed) return responseHelper.error(res, 404, "User not found");
    responseHelper.success(res, 200, { message: "User deleted" });
  } catch (error) {
    next(error);
  }
};
