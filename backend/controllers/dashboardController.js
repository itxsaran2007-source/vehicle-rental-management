const Stats = require("../models/Stats");
const responseHelper = require("../utils/responseHelper");

exports.getStats = async (req, res, next) => {
  try {
    const stats = await Stats.fetch();
    responseHelper.success(res, 200, stats);
  } catch (error) {
    next(error);
  }
};
