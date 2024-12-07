const express = require("express");
const router = express.Router();
const riasecController = require("../controllers/riasecController");

router.post("/save-results", riasecController.saveTestResult);
router.get("/test-results/:testId", riasecController.getTestResult);
router.get("/recommendation/:category", riasecController.getRecommendation);

module.exports = router;
