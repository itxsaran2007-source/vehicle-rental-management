const app = require("./app");
const dotenv = require("dotenv");
const db = require("./config/db");

dotenv.config();

const PORT = process.env.PORT || 5000;

// Test database connection on startup
db.query("SELECT 1")
  .then(() => {
    console.log("✅ Database connected successfully.");
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err.message);
    // Start server anyway to allow for health checks, or exit
    app.listen(PORT, "0.0.0.0", () => {
        console.log(`🚀 Server running on port ${PORT} (Database Offline)`);
    });
  });

