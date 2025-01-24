import React, { useState } from "react";
import "../styles/Navbar.css";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isProfileDropdownVisible, setIsProfileDropdownVisible] = useState(false);
  const navigate = useNavigate() ; 
 

  const handleQuiz= () => {
    navigate('/quiz/Question');
  };

  const handleSignOut = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/');
  };

  const handleViewQuizHistory = () => {
    navigate('/Dashboard'); // Correct navigation to Dashboard
  };

  return (
    <div className="Navbar">
      <h1 className="Logo">Quizzer</h1>
      <ul>
        <li
          onMouseEnter={() => setIsProfileDropdownVisible(true)}
          onMouseLeave={() => setIsProfileDropdownVisible(false)}
          className="dropdown"
        >
          <a  onClick={handleQuiz} href="#!" aria-haspopup="true" aria-expanded={isProfileDropdownVisible}>Quizzes</a>
          
        
        </li>
        <li>
          <a href="#!">About us</a>
        </li>
        <li>
          <a href="#!">Article</a>
        </li>
      </ul>
      <div 
        className="profile-container" 
        onMouseEnter={() => setIsProfileDropdownVisible(true)} 
        onMouseLeave={() => setIsProfileDropdownVisible(false)}
      >
        <button 
          className="profile" 
          aria-haspopup="true" 
          aria-expanded={isProfileDropdownVisible}
          onClick={() => setIsProfileDropdownVisible(!isProfileDropdownVisible)}
        >
        
        </button>
        {isProfileDropdownVisible && (
          <div className="profile-dropdown">
            <a className="Recommendation" href="#!" onClick={handleViewQuizHistory}>View quiz history</a>
            <a className="logout" href="#!" onClick={handleSignOut}>Logout</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
