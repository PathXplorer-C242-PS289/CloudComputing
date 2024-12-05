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

const getRecommendations = (req, res) => {
  const { categoryCode } = req.params;

  // Validasi input categoryCode
  if (!categoryCode) {
    return res.status(400).json({ message: "Category code is required" });
  }

  const categoryCodes = categoryCode.split(",").map((code) => code.trim());

  const query = `
    SELECT DISTINCT careers.name AS career_name
    FROM category_careers
    JOIN categories ON category_careers.category_id = categories.id
    JOIN careers ON category_careers.career_id = careers.id
    WHERE categories.code IN (?);
  `;

  db.query(query, [categoryCodes], (err, results) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ message: "Error fetching recommendations" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "No recommendations found" });
    }

    res.status(200).json({ recommendations: results });
  });
};

const getDetailedRecommendations = (req, res) => {
  const { riasecType } = req.params;

  // Validasi input
  if (!riasecType) {
    return res.status(400).json({ message: "RIASEC type is required" });
  }

  const riasecTypes = riasecType
    .split(",")
    .map((type) => type.trim().toUpperCase());

  const query = `
    SELECT 
      riasec_type, 
      interest_description, 
      key_skills, 
      example_careers
    FROM 
      riasec_details
    WHERE 
      riasec_type IN (?);
  `;

  db.query(query, [riasecTypes], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error fetching RIASEC details" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "No RIASEC details found" });
    }

    res.status(200).json({ recommendations: results });
  });
};

module.exports = {
  saveTestResult,
  getTestResult,
  getRecommendations,
  getDetailedRecommendations,
};
