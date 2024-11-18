const jwt = require("jsonwebtoken");
const db = require("../config/db");

module.exports = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Token not found" });
  }

  db.query(
    "SELECT * FROM blacklist WHERE token = ?",
    [token],
    (err, results) => {
      if (err) return res.status(500).json({ error: "Database error" });

      if (results.length > 0) {
        return res.status(401).json({ message: "Token is blacklisted" });
      }

      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
      } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
      }
    }
  );
};
