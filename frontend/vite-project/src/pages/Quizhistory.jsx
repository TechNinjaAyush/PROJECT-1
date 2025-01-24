import React, { useState, useEffect } from 'react';
import "../styles/StudentDashboard.css";
import { useParams } from "react-router-dom";

const QuizHistory = () => {
  const { username } = useParams();
  const [quizzes, setQuizzes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("Username is ", username);

  useEffect(() => {
    const fetchQuizHistory = async () => {
      try {
        const response = await fetch(`http://localhost:3000/quiz/History/${username}`);

        if (response.ok) {
          const data = await response.json();
          console.log("Fetched data:", data);

          // Check if data.quizzes contains the nested structure
          if (data.quizzes?.length > 0 && data.quizzes[0].quizzes) {
            setQuizzes(data.quizzes[0].quizzes);
          } else {
            setQuizzes([]);
          }
        } else {
          setError('Failed to fetch quiz history');
        }
      } catch (error) {
        console.error('Error fetching quiz history:', error);
        setError('An error occurred while fetching data.');
      } finally {
        setIsLoading(false);
      }
    };

    if (username) {
      fetchQuizHistory();
    }
  }, [username]);

  return (
    <div className="dashboard-container">
      <h2 className={`dashboard-heading ${isLoading ? "shimmer" : ""}`}>
        {username ? `${username}'s Quiz History` : 'Quiz History'}
      </h2>
      {isLoading ? (
        <p className="no-history">Loading...</p>
      ) : error ? (
        <p className="no-history">{error}</p>
      ) : quizzes.length > 0 ? (
        <div className="table-container">
          <table className="quiz-table">
            <thead>
              <tr>
                <th>Quiz Name</th>
                <th>Score</th>
                <th>Recommendations</th>
              </tr>
            </thead>
            <tbody>
              {quizzes.map((quiz, index) => (
                <tr key={index}>
                  <td>{quiz.title || "Untitled Quiz"}</td>
                  <td>{quiz.score !== undefined ? quiz.score : "No Score"}</td>
                  <td>
                    {quiz.recommendations && quiz.recommendations.length > 0
                      ? quiz.recommendations.map((rec, i) => <div key={i}>{rec}</div>)
                      : 'None'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="no-history">No quiz history available.</p>
      )}
    </div>
  );
};

export default QuizHistory;
