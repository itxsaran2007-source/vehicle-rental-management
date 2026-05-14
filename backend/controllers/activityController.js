const Activity = require("../models/Activity");
const responseHelper = require("../utils/responseHelper");

exports.getRecentActivity = async (req, res, next) => {
  try {
    const activity = await Activity.getRecent();
    responseHelper.success(res, 200, activity);
  } catch (error) {
    next(error);
  }
};
