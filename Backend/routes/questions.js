const express = require("express");

const {
  addQuestion,
  fetchQuestion,
  getQuestion,
  updateQuestion,
  deleteQuestion,
} = require("../controller/questionController");
const auth = require("../authenticate");

const router = express.Router();

router.post("/question/add", auth, addQuestion);
router.get("/question/list", auth, fetchQuestion);
router.get("/question/:QuestionId", auth, getQuestion);
router.get("/question/edit/:QuestionId", auth, getQuestion);
router.put("/question/edit/:QuestionId", auth, updateQuestion);
router.delete("/question/delete/:QuestionId", auth, deleteQuestion);

module.exports = router;