const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const noteRoutes = require("./routes/noteRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/status", (req, res) => {
  res.json({
    ok: true,
    message: "Frontend and backend are connected successfully.",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

module.exports = app;
