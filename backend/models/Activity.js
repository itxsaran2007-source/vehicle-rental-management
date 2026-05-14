const pool = require("../config/db");

exports.getRecent = async () => {
  const [rows] = await pool.query("SELECT * FROM activity ORDER BY created_at DESC LIMIT 50");
  return rows;
};
