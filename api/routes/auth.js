const express = require("express");
const {
  register,
  registerWithGoogle,
  verifyOtp,
  login,
  loginWithGoogle,
  forgotPassword,
  verifyOtpForReset,
  resetPassword,
  sendNewOtp,
  logout,
  protectedRoute,
} = require("../controllers/authController");
const verifyToken = require("../middlewares/verifyToken");
const {
  validateRegister,
  validateLogin,
  validateForgotPassword,
  validateResetPassword,
} = require("../middlewares/validators");
const handleValidationErrors = require("../middlewares/errorHandler");

const router = express.Router();

// Routes
router.post("/register", validateRegister, handleValidationErrors, register);
router.post("/register/google", registerWithGoogle);
router.post("/verify", verifyOtp);
router.post("/send-new-otp", sendNewOtp);
router.post("/login", validateLogin, handleValidationErrors, login);
router.post("/login/google", loginWithGoogle);
router.post(
  "/forgot-password",
  validateForgotPassword,
  handleValidationErrors,
  forgotPassword
);
router.post(
  "/verify-otp",
  validateForgotPassword, 
  handleValidationErrors,
  verifyOtpForReset
);
router.post(
  "/reset-password",
  validateResetPassword,
  handleValidationErrors,
  resetPassword
);
router.post("/logout", verifyToken, logout);
router.get("/protected", verifyToken, protectedRoute);

module.exports = router;
