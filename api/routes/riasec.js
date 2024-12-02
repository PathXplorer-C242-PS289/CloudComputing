const express = require("express");
const riasecController = require("../controllers/riasecController");

const router = express.Router();

router.post("/save", riasecController.saveTestResult);
router.get("/result/:testId", riasecController.getTestResult);

module.exports = router;
