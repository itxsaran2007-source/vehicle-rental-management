const path    = require("path");
const express = require("express");
const cors    = require("cors");

const authRoutes     = require("./routes/authRoutes");
const userRoutes     = require("./routes/userRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const activityRoutes = require("./routes/activityRoutes");
const vehicleRoutes  = require("./routes/vehicleRoutes");
const bookingRoutes  = require("./routes/bookingRoutes");
const errorHandler   = require("./middleware/errorHandler");

const app = express();

// ── Middleware ────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── API Routes ────────────────────────────────────────────────
app.use("/api/auth",      authRoutes);
app.use("/api/users",     userRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/activity",  activityRoutes);
app.use("/api/vehicles",  vehicleRoutes);
app.use("/api/bookings",  bookingRoutes);

// ── Serve Frontend Static Files ───────────────────────────────
const frontendPath = path.join(__dirname, "../frontend");
app.use(express.static(frontendPath));

// Fallback — serve index.html for any unknown route
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

app.use(errorHandler);

module.exports = app;
