import React, { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";

const Dashboard = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Retrieve token from localStorage
    const token = localStorage.getItem('token');

    // Decode JWT token to extract the username
    if (token) {
      try {
        const decodedToken = jwtDecode(token); // Decode token
        const extractedUsername = decodedToken?.username || decodedToken?.sub; // Use appropriate field
        setUsername(extractedUsername); // Set username state
      } catch (error) {
        console.error('Failed to decode token:', error);
      }
    }

    // Fetch Quiz History
    const fetchQuizHistory = async () => {
      try {
        const response = await fetch('http://localhost:3000/profile/dashboard', {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in Authorization header
          },
        });

        if (response.ok) {
          const data = await response.json();
          setQuizzes(data);
        } else {
          console.error('Failed to fetch quiz history');
        }
      } catch (error) {
        console.error('Error fetching quiz history:', error);
      }
    };

    if (token) {
      fetchQuizHistory();
    }
  }, []);

  return (
    <div>
      <h2>{username}'s Quiz History</h2> {/* Display username */}
      {quizzes.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Quiz Name</th>
              <th>Score</th>
              <th>Recommendations</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {quizzes.map((quiz, index) => (
              <tr key={index}>
                <td>{quiz.quiz_name}</td>
                <td>{quiz.score}</td>
                <td>{quiz.recommendations.join(', ')}</td>
                <td>{new Date(quiz.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No quiz history available.</p>
      )}
    </div>
  );
};

export default Dashboard;
