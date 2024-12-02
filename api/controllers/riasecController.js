const db = require("../config/db");

const saveTestResult = (req, res) => {
  const { testId, userId, category, recommendations, timestamp } = req.body;

  if (!testId || !userId || !category || !recommendations) {
    return res.status(400).json({ message: "Invalid input data" });
  }

  const query =
    "INSERT INTO test_results (testId, userId, category, recommendations, timestamp) VALUES (?, ?, ?, ?, ?)";

  db.query(
    query,
    [testId, userId, category, recommendations, timestamp || new Date()],
    (err, result) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ message: "Error saving test results to database" });
      }

      res.status(201).json({ message: "Test result saved successfully" });
    }
  );
};

const getTestResult = (req, res) => {
  const { testId } = req.params;

  const query = "SELECT * FROM test_results WHERE testId = ?";

  db.query(query, [testId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error fetching test results" });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "Test result not found" });
    }

    res.status(200).json(result[0]);
  });
};

module.exports = {
  saveTestResult,
  getTestResult,
};
