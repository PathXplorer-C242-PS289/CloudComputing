const db = require("../config/db");

exports.getProfile = (req, res) => {
  const userId = req.user.id;

  const query = "SELECT id, email, verified FROM users WHERE id = ?";
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching profile: ", err.message);
      return res.status(500).json({ success: false, message: "Server error" });
    }

    if (results.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      data: results[0],
    });
  });
};

// PUT /api/profile/update
exports.updateProfile = (req, res) => {
  const userId = req.user.id;
  const { email, password } = req.body;

  let query = "UPDATE users SET email = ? WHERE id = ?";
  let params = [email, userId];

  if (password) {
    const bcrypt = require("bcryptjs");
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error("Error hashing password: ", err.message);
        return res
          .status(500)
          .json({ success: false, message: "Server error" });
      }

      query = "UPDATE users SET email = ?, password = ? WHERE id = ?";
      params = [email, hashedPassword, userId];

      db.query(query, params, (err, results) => {
        if (err) {
          console.error("Error updating profile: ", err.message);
          return res
            .status(500)
            .json({ success: false, message: "Server error" });
        }

        res.status(200).json({
          success: true,
          message: "Profile updated successfully",
        });
      });
    });
  } else {
    db.query(query, params, (err, results) => {
      if (err) {
        console.error("Error updating profile: ", err.message);
        return res
          .status(500)
          .json({ success: false, message: "Server error" });
      }

      res.status(200).json({
        success: true,
        message: "Profile updated successfully",
      });
    });
  }
};

exports.getTestResultsWithRecommendations = (req, res) => {
  const userId = req.user.id;

  const query = `
    SELECT 
      tr.test_id,
      tr.category,
      tr.timestamp,
      rd.riasec_type,
      rd.interest_description,
      rd.key_skills,
      rd.example_careers
    FROM test_results tr
    INNER JOIN riasec_details rd ON tr.category = rd.riasec_type
    WHERE tr.user_id = ?
    ORDER BY tr.timestamp DESC
  `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching test results: ", err.message);
      return res.status(500).json({ success: false, message: "Server error" });
    }

    if (results.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No test results found" });
    }

    res.status(200).json({
      success: true,
      data: results,
    });
  });
};
