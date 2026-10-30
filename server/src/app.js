
require("dotenv").config();

const express = require("express");
const connectDB = require("./db");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "KnowledgeBase AI API is running",
  });
});

app.get("/health", async (req, res) => {
  try {
    await mongoose.connection.db.admin().ping();

    res.json({
      status: "ok",
      database: "connected",
      databaseName: mongoose.connection.name,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      database: "disconnected",
    });
  }
});

const PORT = process.env.PORT || 5000;

async function startServer() {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
