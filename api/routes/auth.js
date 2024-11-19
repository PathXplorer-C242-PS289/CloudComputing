const express = require("express");
const {
  register,
  verifyOtp,
  login,
  forgotPassword,
  verifyOtpForReset,
  resetPassword,
  sendNewOtp,
  logout,
  protectedRoute,
} = require("../controllers/authController");
const verifyToken = require("../middlewares/verifyToken");
const router = express.Router();

// Routes
router.post("/register", register);
router.post("/verify", verifyOtp);
router.post("/send-new-otp", sendNewOtp);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOtpForReset);
router.post("/reset-password", resetPassword);
router.post("/logout", verifyToken, logout);
router.get("/protected", verifyToken, protectedRoute);

module.exports = router;
