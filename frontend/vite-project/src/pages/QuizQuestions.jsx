import React, { useEffect, useState } from "react";

const Showing_quiz = () => {
  const [quizData, setQuizData] = useState(null); // State to store fetched quiz data
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    const fetchQuizData = async () => {
      const quizId = localStorage.getItem("quizId");
      console.log("Quiz ID is", quizId);

      if (!quizId) {
        setError("Quiz ID is missing. Please check.");
        return;
      }

      try {
        const response = await fetch(`http://localhost:3000/${quizId}`);
        if (!response.ok) {
          throw new Error(`Error fetching quiz: ${response.statusText}`);
        }

        const data = await response.json();
        setQuizData(data);
        console.log("Fetched Quiz Data:", data);
      } catch (error) {
        console.error("Unable to fetch quiz data:", error);
        setError(error.message);
      }
    };

    fetchQuizData(); // Call the function
  }, []); // Empty dependency array ensures this runs once when the component mounts

  return (
    <div>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {quizData ? (
        <div>
          <h1>{quizData.title}</h1>
          <p>{quizData.description}</p>
          {/* Display quiz questions */}
          {quizData.questions &&
            quizData.questions.map((question, index) => (
              <div key={index}>
                <h3>{question.text}</h3>
                <ul>
                  {question.options.map((option, idx) => (
                    <li key={idx}>{option}</li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
      ) : (
        !error && <p>Loading quiz...</p>
      )}
    </div>
  );
};

export default Showing_quiz;
