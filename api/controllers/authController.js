const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../config/db");
const generateOtp = require("../utils/generateOTP");
const transporter = require("../utils/nodeMailer");

exports.register = async (req, res) => {
  const { email, password } = req.body;

  if (!email.includes("@")) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length > 0) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    // Insert into users
    db.query(
      "INSERT INTO users (email, password) VALUES (?, ?)",
      [email, hashedPassword],
      (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        const userId = results.insertId;
        const otpCode = generateOtp();
        const expiredAt = new Date(Date.now() + 60 * 60 * 1000);

        // Insert OTP into otp table
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

exports.verifyOtp = (req, res) => {
  const { email, otp } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = results[0];

    db.query(
      "SELECT * FROM otp WHERE user_id = ? AND otp_code = ? AND expired_at > NOW()",
      [user.user_id, otp],
      (err, otpResults) => {
        if (err) return res.status(500).json({ error: err.message });

        if (otpResults.length === 0) {
          return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        // Update users table to mark as verified
        db.query(
          "UPDATE users SET verified_at = NOW() WHERE user_id = ?",
          [user.user_id],
          (err) => {
            if (err) return res.status(500).json({ error: err.message });

            res.json({ message: "Account successfully verified" });
          }
        );
      }
    );
  });
};

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

    // Expire existing OTPs
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
      });
    });
  });
};

// Forgot Password
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const otp = generateOtp();

    db.query(
      "UPDATE users SET otp = ? WHERE email = ?",
      [otp, email],
      (err) => {
        if (err) return res.status(500).json({ error: err.message });

        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: email,
          subject: "Your OTP for Password Reset",
          text: `Your OTP code is ${otp}. Please use this code to reset your password.`,
        };

        transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
            return res.status(500).json({ error: "Failed to send OTP email" });
          }

          res.json({ message: "OTP sent, please check your email" });
        });
      }
    );
  });
};

// Verify OTP for password reset
exports.verifyOtpForReset = (req, res) => {
  const { email, otp } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = results[0];

    if (user.otp === otp) {
      res.json({ message: "OTP valid, proceed to reset password" });
    } else {
      res.status(400).json({ message: "Invalid OTP" });
    }
  });
};

// Reset password
exports.resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      if (results.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      const user = results[0];

      if (user.otp === otp) {
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        db.query(
          "UPDATE users SET password = ?, otp = NULL WHERE email = ?",
          [hashedPassword, email],
          (err) => {
            if (err) return res.status(500).json({ error: err.message });

            res.json({ message: "Password successfully reset" });
          }
        );
      } else {
        res.status(400).json({ message: "Invalid OTP" });
      }
    }
  );
};

// Logout user
exports.logout = (req, res) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(400).json({ message: "Token not provided" });
  }

  db.query("INSERT INTO blacklist (token) VALUES (?)", [token], (err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to blacklist token" });
    }

    res.json({ message: "Successfully logged out" });
  });
};

// Protected route
exports.protectedRoute = (req, res) => {
  res.json({
    message: "Access granted, you are authenticated",
    user: req.user,
  });
};
