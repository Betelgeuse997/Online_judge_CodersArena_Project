const express = require("express");

const {
  fetchSubmissions,
} = require("../controller/submitController");
const { fetchScores } = require("../controller/leaderboardController");
const auth = require("../authenticate");

const router = express.Router();

router.get("/submissions/history", auth, fetchSubmissions);
router.get("/submissions/leaderBoard", auth, fetchScores);

module.exports = router;