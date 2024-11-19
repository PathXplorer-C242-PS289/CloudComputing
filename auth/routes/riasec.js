const express = require("express");
const router = express.Router();
const riasecController = require("../controllers/riasecController");

router.post("/start-test", riasecController.startRiasecTest);
router.get("/active-test", riasecController.getActiveTest);
router.post("/submit-answer", riasecController.submitAnswer);
router.post("/finish-test", riasecController.finishRiasecTest);
router.get("/get-recommendations", riasecController.getRiasecRecommendation);
router.get("/results", riasecController.getRiasecResultbyUserId);

module.exports = router;
