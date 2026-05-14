const pool = require("../config/db");

exports.getAll = async (category, all_status = false) => {
  let query = "SELECT * FROM vehicles";
  const params = [];

  if (!all_status) {
    query += " WHERE is_available = 1";
  }

  if (category && category !== "all") {
    query += all_status ? " WHERE category = ?" : " AND category = ?";
    params.push(category);
  }

  query += " ORDER BY category, id";
  const [rows] = await pool.query(query, params);
  return rows;
};

exports.findById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM vehicles WHERE id = ?", [id]);
  return rows[0];
};

exports.create = async (data) => {
  const [result] = await pool.query(
    "INSERT INTO vehicles (name, category, price_per_day, transmission, fuel_type, image_url, description, is_available) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [data.name, data.category, data.price_per_day, data.transmission, data.fuel_type, data.image_url, data.description, 1]
  );
  return exports.findById(result.insertId);
};

exports.remove = async (id) => {
  const [result] = await pool.query("DELETE FROM vehicles WHERE id = ?", [id]);
  return result.affectedRows > 0;
};
