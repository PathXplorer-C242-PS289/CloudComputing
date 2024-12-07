const db = require("../config/db");

const saveTestResult = (req, res) => {
  const { testId, userId, category, timestamp } = req.body;

  // Validasi input data
  if (!testId || !userId || !category) {
    return res.status(400).json({ message: "Invalid input data" });
  }

  const query =
    "INSERT INTO test_results (test_id, user_id, category, timestamp) VALUES (?, ?, ?, ?)";

  db.getConnection((err, connection) => {
    if (err) {
      console.error("Error getting DB connection", err);
      return res.status(500).json({ message: "Database connection error" });
    }

    connection.query(
      query,
      [testId, userId, category, timestamp || new Date()],
      (err, result) => {
        connection.release();

        if (err) {
          console.error("Error inserting data", err);
          if (err.code === "ER_NO_REFERENCED_ROW_2") {
            return res
              .status(400)
              .json({ message: "Invalid user_id: User does not exist" });
          }
          return res
            .status(500)
            .json({ message: "Error saving test results to database" });
        }

        res.status(201).json({ message: "Test result saved successfully" });
      }
    );
  });
};

const getTestResult = (req, res) => {
  const { testId } = req.params;

  // Validasi input testId
  if (!testId) {
    return res.status(400).json({ message: "Invalid test ID" });
  }

  const query = "SELECT * FROM test_results WHERE test_id = ?";

  db.query(query, [testId], (err, result) => {
    if (err) {
      console.error("Error fetching test results", err);
      return res.status(500).json({ message: "Error fetching test results" });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "Test result not found" });
    }

    res.status(200).json(result[0]);
  });
};

const getRecommendation = (req, res) => {
  const { category } = req.params;

  if (!category) {
    return res.status(400).json({ message: "Invalid category" });
  }

  const query = "SELECT * FROM riasec_results WHERE riasec_type = ?";

  db.query(query, [category], (err, result) => {
    if (err) {
      console.error("Error fetching recommendations", err);
      return res
        .status(500)
        .json({ message: "Error fetching recommendations" });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "No recommendations found" });
    }

    res.status(200).json(result[0]);
  });
};

module.exports = {
  saveTestResult,
  getTestResult,
  getRecommendation,
};
