// QuestionModal.js
import React from 'react';
import '../CSS_Files/QuestionModal.css';

const QuestionModal = ({ question, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Question Details</h2>
        <div>
          <span>Id:</span> {question._id}
        </div>
        <div>
          <span>Title:</span> {question.title}
        </div>
        <div>
          <span>Description:</span> {question.description}
        </div>
        <div>
          <span>Difficulty:</span> {question.difficulty}
        </div>
        <div>
          <label className = 'labeltc'>Test Cases</label>
          {question.testCases && question.testCases.length > 0 ? (
            <div>
              {question.testCases.map((testCase, index) => (
                <div key={index}>
                  <div>
                    <span>Input:</span> {testCase.input}
                  </div>
                  <div>
                    <span>Output:</span> {testCase.output}
                  </div>
                  <div>
                    <span>Time Taken:</span> {testCase.timeTaken} ms
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <span>No test cases available.</span>
          )}
        </div>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default QuestionModal;
