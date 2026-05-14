const pool = require("../config/db");

exports.fetch = async () => {
  const [rows] = await pool.query("SELECT * FROM stats ORDER BY id DESC LIMIT 1");
  return rows[0] || {};
};
