
const express = require("express");
require("dotenv").config();

const pool = require("./db");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "KnowledgeBase AI API is running",
  });
});

app.get("/health", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT NOW() AS current_time"
    );

    res.json({
      status: "ok",
      database: "connected",
      time: result.rows[0].current_time,
    });
  } catch (error) {
    console.error("Database health check failed:", error.message);

    res.status(500).json({
      status: "error",
      database: "disconnected",
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
