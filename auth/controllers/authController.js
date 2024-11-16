const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../config/db");
const generateOtp = require("../utils/generateOTP");
const transporter = require("../utils/nodeMailer");

exports.register = async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length > 0) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    const otp = generateOtp();

    db.query(
      "INSERT INTO users (email, password, otp) VALUES (?, ?, ?)",
      [email, hashedPassword, otp],
      (err) => {
        if (err) return res.status(500).json({ error: err.message });

        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: email,
          subject: "Your OTP for Account Verification",
          text: `Your OTP code is ${otp}. Please use this code to verify your account.`,
        };

        transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
            return res.status(500).json({ error: "Failed to send OTP email" });
          }

          const token = jwt.sign({ email }, process.env.JWT_SECRET, {
            expiresIn: "1h",
          });

          res.status(201).json({ message: "User registered, OTP sent", token });
        });
      }
    );
  });
};

// Verify OTP
exports.verifyOtp = (req, res) => {
  const { email, otp } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = results[0];

    if (user.otp === otp) {
      db.query(
        "UPDATE users SET verified = 1, otp = NULL WHERE email = ?",
        [email],
        (err) => {
          if (err) return res.status(500).json({ error: err.message });

          res.json({ message: "Account successfully verified" });
        }
      );
    } else {
      res.status(400).json({ message: "Invalid OTP" });
    }
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

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err)
        return res.status(500).json({ error: "Password comparison failed" });

      if (!isMatch) {
        return res.status(400).json({ message: "Incorrect password" });
      }

      if (!user.verified) {
        return res.status(400).json({ message: "Account not verified" });
      }

      const token = jwt.sign(
        { email: user.email, id: user.id },
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

        // Kirim email OTP
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

// Protected route example
exports.protectedRoute = (req, res) => {
  res.json({
    message: "Access granted, you are authenticated",
    user: req.user,
  });
};
