import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/QuestionComponent.css';

const QuestionComponent = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [totalTime, setTotalTime] = useState(30);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(Array(4).fill(""));
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(null);

  useEffect(() => {
    // Simulate loading delay for demonstration
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust time as needed

    return () => clearTimeout(timer);
  }, []);

  const handleTimeChange = (event) => {
    setTotalTime(parseInt(event.target.value));
  };

  const handleCorrectAnswerClick = (index) => {
    setCorrectAnswerIndex(index);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSaveQuestion = async (e) => {
    e.preventDefault();
    const quizId = localStorage.getItem('quizId');
    if (!question || quizId === null || correctAnswerIndex === null || options.length === 0) {
      alert("Please fill out the question, select a correct answer, and provide options.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/quiz/question", {
        method: "POST",
        headers: {
          'Content-Type': "application/json",
        },
        body: JSON.stringify({
          questionText: question,
          options,
          correctAnswerIndex,
          time: totalTime,
          quizId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error saving question:", errorData);
        alert("Failed to save question: " + errorData.message);
        return;
      }

      const data = await response.json();
      console.log("Saved question data is", data);
      navigate("/Publish");
      localStorage.setItem('question_id', data._id);
    } catch (error) {
      console.error("Error occurred while saving the question", error);
      alert("An error occurred while saving the question.");
    }
  };

  if (loading) {
    // Render skeleton loader when loading
    return (
      <div className="spinner-container">
        <div className="skeleton-quiz-box">
          <div className="skeleton-title" />
          <div className="skeleton-time-select" />
          {[...Array(4)].map((_, index) => (
            <div key={index} className="skeleton-answer-box" />
          ))}
          <div className="skeleton-submit-buttons" />
        </div>
      </div>
    );
  }

  return (
    <div className="question_component">
      <div className="container">
        <div className="quiz-box">
          <input
            type="text"
            className="question-input"
            placeholder="Type question here"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <div className="time-select">
            <label htmlFor="timeSelect" className="time-label">Select Time:</label>
            <select
              id="timeSelect"
              className="time-dropdown"
              onChange={handleTimeChange}
              value={totalTime}
            >
              <option value="30">30 seconds</option>
              <option value="45">45 seconds</option>
              <option value="60">1 minute</option>
              <option value="120">2 minutes</option>
            </select>
          </div>

          <div className="answer-options">
            {options.map((option, index) => (
              <div key={index} className={`answer-box ${['blue', 'teal', 'yellow', 'pink'][index]}`}>
                <textarea
                  className="answer-input"
                  placeholder="Type answer option here"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                />
                <div
                  className={`correct-indicator ${correctAnswerIndex === index ? 'active' : ''}`}
                  onClick={() => handleCorrectAnswerClick(index)}
                />
              </div>
            ))}
          </div>

          <div className="submit-button-container">
            <button onClick={handleSaveQuestion} className="Explanation-button">Save Question</button>
            <button onClick={() => navigate('/Explanation')} className="Explanation-button">Add Explanation</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionComponent;
