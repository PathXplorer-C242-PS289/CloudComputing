require("dotenv").config();
const mysql = require("mysql2");

const db = mysql.createConnection({
  socketPath: process.env.INSTANCE_CONNECTION_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS, 
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed: ", err.message);
  } else {
    console.log("Connected to the database.");
  }
});

module.exports = db;
