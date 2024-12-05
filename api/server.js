require("dotenv").config();
const express = require("express");
const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
const riasecRoutes = require("./routes/riasec");
// const webinarRoutes = require("./routes/webinar"); not avail yet
const limiter = require("./middlewares/rateLimiter");
const errorHandler = require("./middlewares/errorHandler");
require("./config/db");

const app = express();
const PORT = process.env.PORT || 8080; //const PORT = process.env.PORT || 8080; // App Engine uses port 8080

// Trust the proxy (needed for Cloud environments) //tambahan buat ngatasin error proxy
app.set('trust proxy', 1); // 1 = single proxy

app.use(express.json());
app.use(limiter);
app.use(errorHandler);

app.get('/', (req, res) => { // tambahan sementara untuk GET root route ' / '
  res.send('Welcome to the backend API');
});

// Routes parsing
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/riasec", riasecRoutes);
// s
// app.use("/api/webinars", webinarRoutes); not avail yet

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`); // App engine: console.log(`Server running on port ${PORT}`);
});
