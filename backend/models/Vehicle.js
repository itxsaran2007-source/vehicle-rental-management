const pool = require("../config/db");

exports.getAll = async (category) => {
  if (category && category !== "all") {
    const [rows] = await pool.query(
      "SELECT * FROM vehicles WHERE category = ? AND is_available = 1 ORDER BY id",
      [category]
    );
    return rows;
  }
  const [rows] = await pool.query(
    "SELECT * FROM vehicles WHERE is_available = 1 ORDER BY category, id"
  );
  return rows;
};

exports.findById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM vehicles WHERE id = ?", [id]);
  return rows[0];
};
