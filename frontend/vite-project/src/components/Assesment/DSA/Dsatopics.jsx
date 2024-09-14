import React, { useState, useEffect } from "react";
import "./Dsaquiz.css"; // Import your CSS file for styling
import { questions } from "./dsaquestions.jsx"; // Import the questions array
import { useNavigate } from "react-router-dom";

const Quiz = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [error, setError] = useState(null); // For handling errors
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(false); // Initially false

  useEffect(() => {
    // Restore the selected option when navigating to a question
    setSelectedOption(answers[currentQuestionIndex] || null);
  }, [currentQuestionIndex, answers]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleNextQuestion = () => {
    if (selectedOption !== null) {
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        [currentQuestionIndex]: selectedOption,
      }));
      setSelectedOption(null);
      setCurrentQuestionIndex((prevIndex) =>
        Math.min(prevIndex + 1, questions.length - 1)
      );
    }
  };

  const handlePreviousQuestion = () => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentQuestionIndex]: selectedOption,
    }));
    setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const calculateScore = () => {
    let totalScore = 0;
    questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        totalScore += 1;
      }
    });
    return totalScore;
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Authorization token not found. Please log in again.");
      return;
    }

    // Calculate score
    const totalScore = calculateScore();
    setScore(totalScore);
    setError(null); // Clear any previous error

    // Start the loader
    setIsLoadingRecommendations(true);

    // Prepare data for submission
    const promptData = {
      prompt: `I recently completed a quiz on ${"Dsa"} and here are the details:\n
            - **Questions:** ${JSON.stringify(
              questions.map((q) => q.question)
            )}\n
            - **Correct Answers:** ${JSON.stringify(
              questions.map((q) => q.correctAnswer)
            )}\n
            - **Your Answers:** ${JSON.stringify(Object.values(answers))}\n
            - **Total Score:** ${totalScore}\n
            Please provide me links of courses that I should take to improve my skills according to my scores and questions and answers given by me
           just  5 courses and their links  with names
}`,
      topic: "Dsa", // Add topic to the request data
      score: totalScore, // Add score to the request data
    };

    try {
      const response = await fetch("http://localhost:3000/gemini/submit", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(promptData), // Convert the promptData object to JSON
      });

      console.log(response);

      if (!response.ok) {
        const errorData = await response.text(); // Read the error response
        throw new Error(
          `HTTP error! status: ${response.status} - ${errorData}`
        );
      }

      const recommendations = await response.json();
      console.log("API Response Data:", recommendations); // Debugging output
      
      // Navigate to the Recommendations page with state
      navigate("/Quizresult", { state: { score: totalScore, recommendations } });
      setIsLoadingRecommendations(false);
    } catch (error) {
      console.error("Error submitting data:", error);
      setError("Failed to submit quiz results. Please try again later.");
      setIsLoadingRecommendations(false);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="quiz-container">
      {error && <div className="error-message">{error}</div>} {/* Display error message */}

      {isLoadingRecommendations && (
        <div className="loader">
          
        </div>
      )}
      {!isLoadingRecommendations && (
        <>
          <div className="question">
            <p>{currentQuestion.question}</p>
            <div className="options">
              {currentQuestion.options.map((option, index) => (
                <label key={index}>
                  <input
                    type="radio"
                    name="option"
                    value={option}
                    checked={selectedOption === option}
                    onChange={handleOptionChange}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
          <div className="controls">
            <button
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
            >
              Previous Question
            </button>
            {currentQuestionIndex < questions.length - 1 ? (
              <button
                onClick={handleNextQuestion}
                disabled={selectedOption === null}
              >
                Next Question
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isLoadingRecommendations} // Disable while loading
              >
                Submit
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;
