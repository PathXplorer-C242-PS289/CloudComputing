/* const express = require("express");
const router = express.Router();
const {
  getProfile,
  updateProfile,
  getTestResultsWithRecommendations,
} = require("../controllers/profileController");
const verifyToken = require("../middlewares/verifyToken");

router.get("/", verifyToken, getProfile);
router.put("/update", verifyToken, updateProfile);
router.get("/test-results", verifyToken, getTestResultsWithRecommendations);

module.exports = router;
 */

const express = require("express");
const router = express.Router();
const {
  getUserProfileWithTestResults,
  updateUserProfile,
} = require("../controllers/profileController");
const verifyToken = require("../middlewares/verifyToken");

router.get("/", verifyToken, getUserProfileWithTestResults);
router.put("/update", verifyToken, updateUserProfile);

module.exports = router;
