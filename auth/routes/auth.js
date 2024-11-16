const express = require("express");
const {
  register,
  verifyOtp,
  login,
  forgotPassword,
  verifyOtpForReset,
  resetPassword,
  protectedRoute,
} = require("../controllers/authController");
const verifyToken = require("../middlewares/verifyToken");
const router = express.Router();

router.post("/register", register);
router.post("/verify", verifyOtp);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOtpForReset);
router.post("/reset-password", resetPassword);
router.get("/protected", verifyToken, protectedRoute);

module.exports = router;
