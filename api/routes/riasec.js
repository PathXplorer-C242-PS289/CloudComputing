const express = require("express");
const riasecController = require("../controllers/riasecController");

const router = express.Router();

router.post("/save", riasecController.saveTestResult);
router.get("/result/:testId", riasecController.getTestResult);
router.get(
  "/recommendations/:categoryCode",
  riasecController.getRecommendations
);

module.exports = router;
