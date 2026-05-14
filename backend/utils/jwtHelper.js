const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const secret = process.env.JWT_SECRET || "defaultsecret";
const expiresIn = process.env.JWT_EXPIRES_IN || "1h";

exports.sign = (payload) => jwt.sign(payload, secret, { expiresIn });
exports.verify = (token) => jwt.verify(token, secret);
