const responseHelper = require("../utils/responseHelper");

module.exports = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return responseHelper.error(res, 403, "Access denied. Admin only.");
  }
};
