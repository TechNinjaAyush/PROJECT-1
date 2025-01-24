import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/QuizPage.css";

const QuizPage = () => {
  const navigate = useNavigate();
  const quizId = localStorage.getItem("quizId");

  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(false);

  // Fetch quiz data from the backend
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/quiz/Question?quizId=${quizId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch quiz data");
        }
        const data = await response.json();
        setQuiz(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (quizId) {
      fetchQuiz();
    } else {
      setError("Quiz ID is missing");
      setLoading(false);
    }
  }, [quizId]);

  // Handle option selection
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // Navigate to the next question
  const handleNextQuestion = () => {
    if (selectedOption !== null) {
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        [currentQuestionIndex]: selectedOption,
      }));
      setSelectedOption(null);
      setCurrentQuestionIndex((prevIndex) =>
        Math.min(prevIndex + 1, quiz.questions.length - 1)
      );
    }
  };

  // Navigate to the previous question
  const handlePreviousQuestion = () => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentQuestionIndex]: selectedOption,
    }));
    setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  // Calculate the score
  const calculateScore = () => {
    let totalScore = 0;
    quiz.questions.forEach((question, index) => {
      if (answers[index] === question.options[question.correctAnswerIndex]) {
        totalScore += question.score || 1; // Default score to 1 if not provided
      }
    });
    return totalScore;
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    console.log("token is" , token) ; 
    if (!token) {
      setError("Authorization token not found. Please log in again.");
      return;
    }
  
    const totalScore = calculateScore();
    const userId = localStorage.getItem("UserId");
  
    console.log("userId is", userId);

    setScore(totalScore);
    console.log("total score is" . totalScore) ; 
    console.log("title is" , quiz.title) ; 
    console.log("quiz id is" , quizId) ;

    setError(null);
    setIsLoadingRecommendations(true);
  
    const promptData = {
      prompt: `I recently completed a quiz and here are the details:\n
            - Questions: ${JSON.stringify(quiz.questions.map((q) => q.questionText))}\n
            - Correct Answers: ${JSON.stringify(
              quiz.questions.map((q) => q.options[q.correctAnswerIndex])
            )}\n
            - Your Answers: ${JSON.stringify(Object.values(answers))}\n
            - Total Score: ${totalScore}\n
            Please provide me links to 5 courses to improve my skills.`,
      userId ,
      title : quiz.title  , 
      totalScore , 
      quizId 

    };
    console.log("promtdata is" , JSON.stringify(promptData)) ; 
  
    try {
      const response = await fetch("http://localhost:3000/gemini/submit", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(promptData), 
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const recommendations = await response.json();
      navigate("/Quizresult", { state: { score: totalScore, recommendations } });
    } catch (error) {
      setError("Failed to submit quiz results. Please try again.");
    } finally {
      setIsLoadingRecommendations(false);
    }
  };
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];

  return (
    <div className="quiz-container">
      {isLoadingRecommendations ? (
        <div>Loading recommendations...</div>
      ) : (
        <>
          <div className="question">
            <p>{currentQuestion?.questionText || "No question found"}</p>
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
              Previous
            </button>
            {currentQuestionIndex < quiz.questions.length - 1 ? (
              <button onClick={handleNextQuestion} disabled={!selectedOption}>
                Next
              </button>
            ) : (
              <button onClick={handleSubmit} disabled={!selectedOption}>
                Submit
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default QuizPage;
