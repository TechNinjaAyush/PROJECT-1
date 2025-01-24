import React, { useEffect, useState } from "react";
import "../styles/Sidebar.css";
import { useNavigate } from "react-router-dom";

const Side_bar = () => {
  const [quiz, setQuiz] = useState(false);
  const [username, setUserName] = useState([]);
  const navigate = useNavigate();

  const create_quiz = () => {
    setQuiz(true);
    navigate("/Title");
  };
  useEffect(() => {
    const fetchUserHistory = async () => {
      try {
        const response = await fetch("http://localhost:3000/quiz/username");
        console.log("response is" , response) ; 
          if(response.ok){
          const data = await response.json();
          console.log("data is" , data) ; 
          const users = data.username.map((entry) => entry.user);
          console.log("username are" , users) ; 
          setUserName(users);
        
      } 
    }catch (error) {
        console.log("failed to fetch quiz history", error);
      }
    };
    fetchUserHistory();
  }, []);

  return (
    <div className="main-container">
      {/* Sidebar */}
      <div className="sidebar-container">
        <h1 className="logo">Quiziz</h1>
        <p className="username">Username</p>
        <button onClick={create_quiz} className="create-button">
          + Create
        </button>
        <div className="common-parts">
          <p>
            <i className="fas fa-book"></i> My Library
          </p>
          <p>
            <i className="fas fa-chart-line"></i> Reports
          </p>
          <p>
            <i className="fas fa-cog"></i> Settings
          </p>
        </div>
      </div>

      {/* Table for users who attempted quizzes */}
      <div className="table-container">
        <h2>Students Who Attempted Quizzes</h2>
        <table>
          <thead>
            <tr>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            {username.map((user, index) => (
              <tr key={index}>
                <td
                onClick={() => navigate(`/history/${user}`)}
                
                >
                  
                  {user}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Side_bar;
