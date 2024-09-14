import React from "react"; 
import { useNavigate } from "react-router-dom";
import "./Topics.css";  // Importing the CSS file

const Topics = () => {
  const navigate = useNavigate();

  const handleDSAClick = () => {
    navigate('/Dsatopics');
  };

  return (
    <div className="topics-container">
      <ul>
        <li className="topic-item" onClick={handleDSAClick}>Data Structures & Algorithms (DSA)</li>
        <li className="topic-item" >Computer Networks</li>
        <li className="topic-item" >System Design</li>
      </ul>
    </div>
  );
};

export default Topics;
