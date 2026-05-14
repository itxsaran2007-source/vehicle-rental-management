const bcrypt = require("bcrypt");

exports.hash = async (value) => bcrypt.hash(value, 10);
exports.compare = async (value, hash) => bcrypt.compare(value, hash);
