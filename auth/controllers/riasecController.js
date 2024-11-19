const db = require("../config/db");
const TOTAL_QUESTIONS = 60;

// Start RIASEC test
exports.startRiasecTest = (req, res) => {
  const { user_id } = req.body;
  if (!user_id) {
    return res.status(400).json({ message: "user_id is required" });
  }

  const queryCheck = `
    SELECT id FROM riasec_sessions
    WHERE user_id = ? AND end_time IS NULL
    LIMIT 1
  `;

  db.query(queryCheck, [user_id], (err, results) => {
    if (err) {
      console.error("Error checking active sessions:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (results.length > 0) {
      return res
        .status(400)
        .json({ message: "An active test session already exists" });
    }

    const query = `
      INSERT INTO riasec_sessions (user_id, start_time)
      VALUES (?, NOW())
    `;
    db.query(query, [user_id], (err, result) => {
      if (err) {
        console.error("Error starting new session:", err);
        return res.status(500).json({ message: "Database error" });
      }

      res
        .status(201)
        .json({ message: "Test session started", sessionId: result.insertId });
    });
  });
};

// Get active test
exports.getActiveTest = (req, res) => {
  const { user_id } = req.query;

  if (!user_id) {
    return res.status(400).json({ message: "user_id is required" });
  }

  const query = `
    SELECT * FROM riasec_sessions
    WHERE user_id = ? AND end_time IS NULL
    ORDER BY start_time DESC
    LIMIT 1
  `;

  db.query(query, [user_id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Database error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "No active test found" });
    }

    res.status(200).json(results[0]);
  });
};

// Submit answer
exports.submitAnswer = (req, res) => {
  const { session_id, question_id, answer } = req.body;

  if (!session_id || !question_id || answer === undefined) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const checkDuplicateQuery = `
    SELECT * FROM riasec_answers
    WHERE session_id = ? AND question_id = ?
  `;
  db.query(checkDuplicateQuery, [session_id, question_id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Database error" });
    }
    if (results.length > 0) {
      return res
        .status(400)
        .json({ message: "Answer already submitted for this question" });
    }

    const query = `
      INSERT INTO riasec_answers (session_id, question_id, answer, created_at)
      VALUES (?, ?, ?, NOW())
    `;

    db.query(query, [session_id, question_id, answer], (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Database error" });
      }

      res.status(201).json({ message: "Answer submitted successfully" });
    });
  });
};

// Finish test
exports.finishRiasecTest = (req, res) => {
  const { session_id, user_id } = req.body;

  if (!session_id || !user_id) {
    return res
      .status(400)
      .json({ message: "session_id and user_id are required" });
  }

  const checkAnswersQuery = `
    SELECT COUNT(*) AS answered_count
    FROM riasec_answers
    WHERE session_id = ?
  `;

  db.query(checkAnswersQuery, [session_id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Database error" });
    }

    const { answered_count } = results[0];
    if (answered_count < 5) {
      return res
        .status(400)
        .json({ message: "Not all questions have been answered" });
    }

    const finishSessionQuery = `
      UPDATE riasec_sessions
      SET end_time = NOW()
      WHERE id = ? AND end_time IS NULL
    `;

    db.query(finishSessionQuery, [session_id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Database error" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "No active test found for the provided session_id",
        });
      }

      const calculateResultsQuery = `
        INSERT INTO riasec_results (user_id, realistic, investigative, artistic, social, enterprising, conventional)
        SELECT ?, 
          AVG(CASE WHEN rq.riasec_type = 'realistic' THEN ra.answer ELSE NULL END) AS realistic,
          AVG(CASE WHEN rq.riasec_type = 'investigative' THEN ra.answer ELSE NULL END) AS investigative,
          AVG(CASE WHEN rq.riasec_type = 'artistic' THEN ra.answer ELSE NULL END) AS artistic,
          AVG(CASE WHEN rq.riasec_type = 'social' THEN ra.answer ELSE NULL END) AS social,
          AVG(CASE WHEN rq.riasec_type = 'enterprising' THEN ra.answer ELSE NULL END) AS enterprising,
          AVG(CASE WHEN rq.riasec_type = 'conventional' THEN ra.answer ELSE NULL END) AS conventional
        FROM riasec_answers ra
        JOIN riasec_questions rq ON ra.question_id = rq.id
        WHERE ra.session_id = ?
        GROUP BY ra.session_id
      `;

      db.query(calculateResultsQuery, [user_id, session_id], (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Error saving test results" });
        }

        res.status(200).json({
          message: "Test session finished and results saved successfully",
          sessionId: session_id,
          resultId: result.insertId,
        });
      });
    });
  });
};

// Get RIASEC recommendation
exports.getRiasecRecommendation = (req, res) => {
  const { user_id } = req.query;

  if (!user_id) {
    return res.status(400).json({ message: "user_id is required" });
  }

  const query = `
    SELECT realistic, investigative, artistic, social, enterprising, conventional
    FROM riasec_results
    WHERE user_id = ?
    ORDER BY created_at DESC
    LIMIT 1
  `;

  db.query(query, [user_id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Database error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "No test results found" });
    }

    const {
      realistic,
      investigative,
      artistic,
      social,
      enterprising,
      conventional,
    } = results[0];

    const recommendationQuery = `
      SELECT m.name, m.description
      FROM major_recommendations mr
      JOIN majors m ON mr.major_id = m.id
      WHERE ? BETWEEN mr.realistic_min AND mr.realistic_max
        AND ? BETWEEN mr.investigative_min AND mr.investigative_max
        AND ? BETWEEN mr.artistic_min AND mr.artistic_max
        AND ? BETWEEN mr.social_min AND mr.social_max
        AND ? BETWEEN mr.enterprising_min AND mr.enterprising_max
        AND ? BETWEEN mr.conventional_min AND mr.conventional_max
      LIMIT 1
    `;

    db.query(
      recommendationQuery,
      [realistic, investigative, artistic, social, enterprising, conventional],
      (err, recommendations) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Database error" });
        }

        if (recommendations.length === 0) {
          return res
            .status(404)
            .json({ message: "No recommendations found for your profile" });
        }

        res.status(200).json(recommendations[0]);
      }
    );
  });
};

// Get test results by user ID
exports.getRiasecResultbyUserId = (req, res) => {
  const { user_id } = req.query;

  if (!user_id) {
    return res.status(400).json({ message: "user_id is required" });
  }

  const query = `SELECT * FROM riasec_results WHERE user_id = ? ORDER BY created_at DESC`;

  db.query(query, [user_id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Database error" });
    }

    res.status(200).json(results);
  });
};
