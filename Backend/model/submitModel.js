const mongoose = require("mongoose");

const SubmitSchema = new mongoose.Schema({
  code: 
    { 
        type: String, 
        required: true 
    },
  user: 
    { 
        type: String, 
        required: true 
    },
  question: 
    { 
        type: String, 
        required: true },
  language: 
    { 
        type: String, 
        required: true 
    },
  submittedAt: 
    { 
        type: String, 
        required: true 
    },
  status: 
  { 
    type: String, 
    required: true 
  },
}); 

const Submit = mongoose.model("Submit", SubmitSchema);

module.exports = Submit;