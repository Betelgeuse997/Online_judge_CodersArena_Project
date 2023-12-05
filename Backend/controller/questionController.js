const questionModel = require("../model/questionModel");

const addQuestion = async (req, res) => {
    const { title, description, difficulty, testCases } = req.body;
    const createdBy = req.user._id;
  
    try {
      const Question = await questionModel.findOne({ title });
  
      if (Question) {
        res.json({ message: "Question exists already" });
      } else {
        const Question = await questionModel.create({
          title,
          description,
          difficulty,
          testCases,
          createdBy,
        });
        res.json({ message: "Question created successfully" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  const fetchQuestion = async (req, res) => {
    try {
      const Questions = await questionModel.find();
      res.json({ data: Questions });
    } catch (error) {
      res.status(500).json(error);
    }
  };
  
  const getQuestion = async (req, res) => {
    try {
      const Question = await questionModel.findById(req.params.QuestionId);
  
      if (!Question) {
        return res.status(404).json({ message: "Question not found" });
      }
      res.status(200).json(Question);
    } catch (error) {
      res.status(500).json(error);
    }
  };
  
  const updateQuestion = async (req, res) => {
    const { title, description, difficulty, testCases } = req.body;
    try {
      const Question = await questionModel.findByIdAndUpdate(
        req.params.QuestionId,
        { title, description, difficulty, testCases },
        { new: true }
      );
      if (!Question) {
        return res.status(404).json({ message: "Question not found" });
      }
      res.json({ message: "Question edited successfully" });
    } catch (error) {
      res.status(500).json(error);
    }
  };
  
  const deleteQuestion = async (req, res) => {
    const Question = await questionModel.findByIdAndDelete(req.params.QuestionId);
    try {
      if (!Question) {
        return res.status(404).json({ message: "Question not found" });
      }
      res.status(200).json({ message: "Question deleted successfully" });
    } catch (error) {
      res.status(500).json(error);
    }
  };
  
  module.exports = {
    addQuestion,
    fetchQuestion,
    getQuestion,
    updateQuestion,
    deleteQuestion,
  };