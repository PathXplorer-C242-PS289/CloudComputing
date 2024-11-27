const { body } = require("express-validator");

const validateRegister = [
  body("email").isEmail().withMessage("Invalid email format"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
  body("name").optional().isString().withMessage("Name must be a string"),
];

const validateLogin = [
  body("email").isEmail().withMessage("Invalid email format"),
  body("password").notEmpty().withMessage("Password is required"),
];

const validateForgotPassword = [
  body("email").isEmail().withMessage("Invalid email format"),
];

const validateResetPassword = [
  body("otp").isNumeric().withMessage("OTP must be a number"),
  body("newPassword")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
];

module.exports = {
  validateRegister,
  validateLogin,
  validateForgotPassword,
  validateResetPassword,
};
