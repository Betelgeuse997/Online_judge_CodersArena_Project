const submitModel = require("../model/submitModel");

const fetchSubmissions = async (req, res) => {
  try {
    const submissions = await submitModel.find();
    res.json({ data: submissions });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {fetchSubmissions};