const pool = require("../config/db");

const genRef = () =>
  "DX-" + Date.now().toString(36).toUpperCase().slice(-6);

exports.create = async (data) => {
  const ref = genRef();
  const [result] = await pool.query(
    `INSERT INTO bookings
       (user_id, vehicle_id, location_id, pickup_datetime, return_datetime,
        total_price, payment_method, payment_status, booking_status, booking_reference)
     VALUES (?, ?, ?, ?, ?, ?, ?, 'Pending', 'Confirmed', ?)`,
    [
      data.user_id,
      data.vehicle_id,
      data.location_id,
      data.pickup_datetime,
      data.return_datetime,
      data.total_price,
      data.payment_method,
      ref,
    ]
  );
  return exports.findById(result.insertId);
};

exports.findById = async (id) => {
  const [rows] = await pool.query(
    `SELECT b.*, v.name AS vehicle_name, v.category, v.image_url,
            l.name AS location_name, u.full_name AS customer_name
     FROM bookings b
     JOIN vehicles  v ON b.vehicle_id  = v.id
     JOIN locations l ON b.location_id = l.id
     JOIN users     u ON b.user_id     = u.id
     WHERE b.id = ?`,
    [id]
  );
  return rows[0];
};

exports.findByUser = async (userId) => {
  const [rows] = await pool.query(
    `SELECT b.*, v.name AS vehicle_name, v.category, v.image_url,
            l.name AS location_name
     FROM bookings b
     JOIN vehicles  v ON b.vehicle_id  = v.id
     JOIN locations l ON b.location_id = l.id
     WHERE b.user_id = ?
     ORDER BY b.created_at DESC`,
    [userId]
  );
  return rows;
};

exports.getAll = async () => {
  const [rows] = await pool.query(
    `SELECT b.*, v.name AS vehicle_name, l.name AS location_name,
            u.full_name AS customer_name
     FROM bookings b
     JOIN vehicles  v ON b.vehicle_id  = v.id
     JOIN locations l ON b.location_id = l.id
     JOIN users     u ON b.user_id     = u.id
     ORDER BY b.created_at DESC`
  );
  return rows;
};

exports.cancel = async (id, userId) => {
  const [result] = await pool.query(
    "UPDATE bookings SET booking_status = 'Cancelled' WHERE id = ? AND user_id = ?",
    [id, userId]
  );
  return result.affectedRows > 0;
};
