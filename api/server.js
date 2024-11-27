const express = require("express");
const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
const riasecRoutes = require("./routes/riasec");
const limiter = require("./middlewares/rateLimiter");
const errorHandler = require("./middlewares/errorHandler");
require("./config/db");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(limiter);
app.use(errorHandler);

// Routes parsing
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/riasec", riasecRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
