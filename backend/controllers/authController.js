const jwtHelper = require("../utils/jwtHelper");
const hashHelper = require("../utils/hashHelper");
const responseHelper = require("../utils/responseHelper");
const User = require("../models/User");

exports.register = async (req, res, next) => {
  try {
    const { full_name, email, password, phone } = req.body;
    if (!full_name || !email || !password)
      return responseHelper.error(res, 400, "Name, email and password are required");

    const existing = await User.findByEmail(email);
    if (existing) return responseHelper.error(res, 409, "Email already registered");

    const user = await User.create({ name: full_name, email, password, phone, role: "user" });
    const token = jwtHelper.sign({ id: user.id, role: user.role });
    responseHelper.success(res, 201, { token, user });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByEmail(email);

    if (!user || !(await hashHelper.compare(password, user.password))) {
      return responseHelper.error(res, 401, "Invalid email or password");
    }

    const token = jwtHelper.sign({ id: user.id, role: user.role });
    const userData = {
      id: user.id,
      email: user.email,
      full_name: user.full_name,
      phone: user.phone,
      role: user.role
    };
    responseHelper.success(res, 200, { token, user: userData });
  } catch (error) {
    next(error);
  }
};

exports.logout = (req, res) => {
  responseHelper.success(res, 200, { message: "Logged out successfully" });
};
