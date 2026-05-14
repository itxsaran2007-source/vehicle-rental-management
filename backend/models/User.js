const pool = require("../config/db");
const hashHelper = require("../utils/hashHelper");

exports.findByEmail = async (email) => {
  const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
  return rows[0];
};

exports.findById = async (id) => {
  const [rows] = await pool.query("SELECT id, full_name, email, phone, role, created_at FROM users WHERE id = ?", [id]);
  return rows[0];
};

exports.getAll = async () => {
  const [rows] = await pool.query("SELECT id, full_name, email, phone, role, created_at FROM users ORDER BY created_at DESC");
  return rows;
};

exports.create = async (data) => {
  const passwordHash = await hashHelper.hash(data.password || "password123");
  const [result] = await pool.query(
    "INSERT INTO users (full_name, email, password, phone, role) VALUES (?, ?, ?, ?, ?)",
    [data.full_name || data.name, data.email, passwordHash, data.phone, data.role || "user"]
  );
  return exports.findById(result.insertId);
};

exports.update = async (id, data) => {
  const fields = [];
  const values = [];
  if (data.full_name || data.name) { fields.push("full_name = ?"); values.push(data.full_name || data.name); }
  if (data.email) { fields.push("email = ?"); values.push(data.email); }
  if (data.phone) { fields.push("phone = ?"); values.push(data.phone); }
  if (data.role) { fields.push("role = ?"); values.push(data.role); }
  if (data.password) {
    fields.push("password = ?");
    values.push(await hashHelper.hash(data.password));
  }

  if (!fields.length) return exports.findById(id);

  values.push(id);
  await pool.query(`UPDATE users SET ${fields.join(", ")} WHERE id = ?`, values);
  return exports.findById(id);
};

exports.remove = async (id) => {
  const [result] = await pool.query("DELETE FROM users WHERE id = ?", [id]);
  return result.affectedRows > 0;
};

