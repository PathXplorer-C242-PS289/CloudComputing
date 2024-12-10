const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../config/db");
const generateOtp = require("../utils/generateOTP");
const transporter = require("../utils/nodeMailer");
const admin = require("firebase-admin");
const serviceAccount = require("../config/serviceAccountKey.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

// register user
exports.register = async (req, res) => {
  const { email, password, username } = req.body;

  if (!email.includes("@")) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length > 0) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    // Insert user data
    db.query(
      "INSERT INTO users (email, password, username, provider_type, provider_id) VALUES (?, ?, ?, 'manual', NULL)",
      [email, hashedPassword, username || null],
      (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        const userId = results.insertId;
        const otpCode = generateOtp();
        const expiredAt = new Date(Date.now() + 60 * 60 * 1000);

        // Insert OTP data
        db.query(
          "INSERT INTO otp (user_id, otp_code, expired_at) VALUES (?, ?, ?)",
          [userId, otpCode, expiredAt],
          (err) => {
            if (err) return res.status(500).json({ error: err.message });

            const mailOptions = {
              from: process.env.EMAIL_USER,
              to: email,
              subject: "Your OTP for Account Verification",
              text: `Your OTP code is ${otpCode}. It will expire in 1 hour.`,
            };

            transporter.sendMail(mailOptions, (err) => {
              if (err) {
                return res
                  .status(500)
                  .json({ error: "Failed to send OTP email" });
              }

              const token = jwt.sign({ email }, process.env.JWT_SECRET, {
                expiresIn: "1h",
              });

              res.status(201).json({
                message: "User registered, OTP sent",
                token,
              });
            });
          }
        );
      }
    );
  });
};

// register user google
exports.registerWithGoogle = (req, res) => {
  const { idToken } = req.body;

  admin
    .auth()
    .verifyIdToken(idToken)
    .then((decodedToken) => {
      const { email, uid, name } = decodedToken;

      db.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        (err, results) => {
          if (err) return res.status(500).json({ error: err.message });

          if (results.length > 0) {
            const user = results[0];

            const token = jwt.sign(
              { email: user.email, id: user.user_id },
              process.env.JWT_SECRET,
              { expiresIn: "1h" }
            );

            return res.status(200).json({
              message: "User already exists, logged in successfully.",
              token,
              user: {
                id: user.user_id,
                email: user.email,
                username: user.username || name || "Guest",
                provider_type: "google",
              },
            });
          }

          db.query(
            "INSERT INTO users (email, username, provider_id, provider_type) VALUES (?, ?, ?, 'google')",
            [email, name || "Guest", uid],
            (err, insertResult) => {
              if (err) return res.status(500).json({ error: err.message });

              const token = jwt.sign(
                { email, id: insertResult.insertId },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
              );

              res.status(201).json({
                message: "User registered successfully.",
                token,
                user: {
                  id: insertResult.insertId,
                  email,
                  username: name || "Guest",
                  provider_type: "google",
                },
              });
            }
          );
        }
      );
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        message: "Failed to register with Google.",
        error: error.message,
      });
    });
};

exports.verifyOtp = (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP are required" });
  }

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, users) => {
    if (err) {
      console.error("Database Error:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (users.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = users[0];

    db.query(
      "SELECT * FROM otp WHERE user_id = ? AND otp_code = ? AND expired_at > NOW()",
      [user.user_id, otp],
      (err, otpResults) => {
        if (err) {
          console.error("Database Error:", err);
          return res.status(500).json({ error: "Internal server error" });
        }

        if (otpResults.length === 0) {
          return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        db.query(
          "UPDATE users SET verified_at = NOW() WHERE user_id = ?",
          [user.user_id],
          (err) => {
            if (err) {
              console.error("Database Error:", err);
              return res.status(500).json({ error: "Internal server error" });
            }

            res.json({ message: "Account successfully verified" });
          }
        );
      }
    );
  });
};

// send OTP
exports.sendNewOtp = (req, res) => {
  const { email } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = results[0];
    const otpCode = generateOtp();
    const expiredAt = new Date(Date.now() + 60 * 60 * 1000);

    db.query(
      "UPDATE otp SET expired_at = NOW() WHERE user_id = ?",
      [user.user_id],
      (err) => {
        if (err) return res.status(500).json({ error: err.message });

        // Insert new OTP
        db.query(
          "INSERT INTO otp (user_id, otp_code, expired_at) VALUES (?, ?, ?)",
          [user.user_id, otpCode, expiredAt],
          (err) => {
            if (err) return res.status(500).json({ error: err.message });

            const mailOptions = {
              from: process.env.EMAIL_USER,
              to: email,
              subject: "Your New OTP Code",
              text: `Your new OTP code is ${otpCode}. It will expire in 1 hour.`,
            };

            transporter.sendMail(mailOptions, (err) => {
              if (err) {
                return res
                  .status(500)
                  .json({ error: "Failed to send OTP email" });
              }

              res.json({ message: "New OTP sent" });
            });
          }
        );
      }
    );
  });
};

// Login user
exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = results[0];

    if (!user.verified_at) {
      return res.status(400).json({ message: "Account not verified" });
    }

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err)
        return res.status(500).json({ error: "Password comparison failed" });

      if (!isMatch) {
        return res.status(400).json({ message: "Incorrect password" });
      }

      const token = jwt.sign(
        { email: user.email, id: user.user_id },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.json({
        message: "Login successful",
        token,
        user: {
          id: user.user_id,
          email: user.email,
          username: user.username,
          provider_type: user.provider_id || "manual",
        },
      });
    });
  });
};

// Login user Google
exports.loginWithGoogle = (req, res) => {
  const { idToken } = req.body;

  admin
    .auth()
    .verifyIdToken(idToken)
    .then((decodedToken) => {
      const { email } = decodedToken;

      db.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        (err, results) => {
          if (err) return res.status(500).json({ error: err.message });

          if (results.length === 0) {
            return res
              .status(404)
              .json({ message: "User not found. Please register first." });
          }

          const user = results[0];

          const token = jwt.sign(
            { email: user.email, id: user.user_id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
          );

          res.status(200).json({
            message: "Login successful.",
            token,
            user: {
              id: user.user_id,
              email: user.email,
              username: user.username,
              provider_type: user.provider_type || "google",
            },
          });
        }
      );
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        message: "Failed to login with Google.",
        error: error.message,
      });
    });
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  db.query(
    "SELECT user_id FROM users WHERE email = ?",
    [email],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      if (results.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      const userId = results[0].user_id;
      const otp = generateOtp();
      const expiredAt = new Date(Date.now() + 60 * 60 * 1000);

      db.query(
        "INSERT INTO otp (user_id, otp_code, expired_at) VALUES (?, ?, ?)",
        [userId, otp, expiredAt],
        (err) => {
          if (err) return res.status(500).json({ error: err.message });

          const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Your OTP for Password Reset",
            text: `Your OTP code is ${otp}. Please use this code to reset your password. This code will expire in 1 hour.`,
          };

          transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
              return res
                .status(500)
                .json({ error: "Failed to send OTP email" });
            }

            res.json({ message: "OTP sent, please check your email" });
          });
        }
      );
    }
  );
};

exports.verifyOtpForReset = (req, res) => {
  const { email, otp } = req.body;

  db.query(
    "SELECT user_id FROM users WHERE email = ?",
    [email],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      if (results.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      const userId = results[0].user_id;

      // Validasi OTP di tabel otp
      db.query(
        "SELECT * FROM otp WHERE user_id = ? AND otp_code = ? AND expired_at > NOW()",
        [userId, otp],
        (err, results) => {
          if (err) return res.status(500).json({ error: err.message });

          if (results.length === 0) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
          }

          // OTP valid
          res.json({ message: "OTP valid, proceed to reset password" });
        }
      );
    }
  );
};

exports.resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  db.query(
    "SELECT user_id FROM users WHERE email = ?",
    [email],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      if (results.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      const userId = results[0].user_id;

      db.query(
        "SELECT * FROM otp WHERE user_id = ? AND otp_code = ? AND expired_at > NOW()",
        [userId, otp],
        async (err, results) => {
          if (err) return res.status(500).json({ error: err.message });

          if (results.length === 0) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
          }

          const hashedPassword = await bcrypt.hash(newPassword, 10);

          db.query(
            "UPDATE users SET password = ? WHERE user_id = ?",
            [hashedPassword, userId],
            (err) => {
              if (err) return res.status(500).json({ error: err.message });

              res.json({ message: "Password successfully reset" });
            }
          );
        }
      );
    }
  );
};

exports.logout = (req, res) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(400).json({ message: "Token not provided" });
  }

  db.query(
    "INSERT INTO blacklist (token, blacklisted_at) VALUES (?, NOW())",
    [token],
    (err) => {
      if (err) {
        return res.status(500).json({ error: "Failed to blacklist token" });
      }

      res.json({ message: "Successfully logged out" });
    }
  );
};

// Protected route example
exports.protectedRoute = (req, res) => {
  res.json({
    message: "Access granted, you are authenticated",
    user: req.user,
  });
};
