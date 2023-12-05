const express = require("express");
 
const { submitquestion } = require("../controller/submissionController");
const auth = require("../authenticate");

const router = express.Router();
 
router.post("/question/submit", auth, submitquestion);

module.exports = router;