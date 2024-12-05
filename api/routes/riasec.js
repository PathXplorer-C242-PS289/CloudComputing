const express = require("express");
const router = express.Router();
const riasecController = require("../controllers/riasecController");

router.post("/save", riasecController.saveTestResult);
router.get("/result/:testId", riasecController.getTestResult);
router.get(
  "/recommendations/:categoryCode",
  riasecController.getRecommendations
);

module.exports = router;
