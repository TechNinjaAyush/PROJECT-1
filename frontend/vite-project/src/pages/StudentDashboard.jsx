import React, { useState, useEffect } from 'react';
import "../styles/StudentDashboard.css";

const Dashboard = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [username, setUsername] = useState('');
  const userId = localStorage.getItem("UserId");
  console.log("User ID is: ", userId);

  useEffect(() => {
    const fetchQuizHistory = async () => {
      try {
        const response = await fetch(`http://localhost:3000/quiz/History/${userId}`);

        if (response.ok) {
          const data = await response.json();
          console.log("Fetched data:", data);

          // Check if data.quizzes contains the nested structure
          if (data.quizzes?.length > 0 && data.quizzes[0].quizzes) {
            setQuizzes(data.quizzes[0].quizzes);
          } else {
            setQuizzes([]);
          }

          setUsername(data.username || "Unknown User");
        } else {
          console.error('Failed to fetch quiz history');
        }
      } catch (error) {
        console.error('Error fetching quiz history:', error);
      }
    };

    if (userId) {
      fetchQuizHistory();
    }
  }, [userId]);

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-heading">
        {username ? `${username}'s Quiz History` : 'Quiz History'}
      </h2>
      {quizzes.length > 0 ? (
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

export default Dashboard;
