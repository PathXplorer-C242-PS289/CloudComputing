const express = require("express");
const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
require("./config/db");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Routes parsing
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
