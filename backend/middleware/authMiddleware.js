const jwtHelper = require("../utils/jwtHelper");
const responseHelper = require("../utils/responseHelper");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return responseHelper.error(res, 401, "Authorization token required");
  }

  const token = authHeader.split(" ")[1];
  try {
    const payload = jwtHelper.verify(token);
    req.user = payload;
    next();
  } catch (error) {
    return responseHelper.error(res, 401, "Invalid token");
  }
};
