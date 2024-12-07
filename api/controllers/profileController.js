/* const db = require("../config/db");

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
 */

const db = require("../config/db");
const bcrypt = require("bcryptjs");

exports.getUserProfileWithTestResults = (req, res) => {
  const userId = req.user.id;

  const profileQuery =
    "SELECT user_id, email, verified_at FROM users WHERE user_id = ?";

  const testResultsQuery = `
    SELECT 
      tr.test_id,
      tr.category,
      tr.timestamp,
      rd.riasec_type,
      rd.interest_description,
      rd.key_skills,
      rd.example_careers
    FROM test_results tr
    INNER JOIN riasec_results rd ON tr.category = rd.riasec_type
    WHERE tr.user_id = ? 
    ORDER BY tr.timestamp DESC
  `;

  db.query(profileQuery, [userId], (err, profileResults) => {
    if (err) {
      console.error("Error fetching profile: ", err.message);
      return res.status(500).json({ success: false, message: "Server error" });
    }

    if (profileResults.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const userProfile = profileResults[0];

    db.query(testResultsQuery, [userId], (err, testResults) => {
      if (err) {
        console.error("Error fetching test results: ", err.message);
        return res
          .status(500)
          .json({ success: false, message: "Server error" });
      }

      userProfile.testResults = testResults;

      res.status(200).json({
        success: true,
        data: userProfile,
      });
    });
  });
};

exports.updateUserProfile = (req, res) => {
  const userId = req.user.id;
  const { email, password } = req.body;

  if (!email && !password) {
    return res
      .status(400)
      .json({ success: false, message: "No data to update" });
  }

  const updates = [];
  const params = [];

  if (email) {
    updates.push("email = ?");
    params.push(email);
  }

  if (password) {
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error("Error hashing password:", err.message);
        return res
          .status(500)
          .json({ success: false, message: "Server error" });
      }

      updates.push("password = ?");
      params.push(hashedPassword);

      executeUpdateQuery();
    });
  } else {
    executeUpdateQuery();
  }

  function executeUpdateQuery() {
    params.push(userId);
    const query = `UPDATE users SET ${updates.join(", ")} WHERE user_id = ?`;

    db.query(query, params, (err, result) => {
      if (err) {
        console.error("Error updating profile:", err.message);
        return res
          .status(500)
          .json({ success: false, message: "Server error" });
      }

      if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      res.status(200).json({
        success: true,
        message: "Profile updated successfully",
      });
    });
  }
};
