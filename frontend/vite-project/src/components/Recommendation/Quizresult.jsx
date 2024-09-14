import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Recommnedation.css"; // Ensure this CSS file is correctly linked

const Recommendation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { score, recommendations } = location.state || {};
  const [Score, SetScore] = useState(null);
  const [Recommendations, SetRecommendations] = useState(null);
  useEffect(() => {
    if (score !== undefined) {
      SetScore(score);
    }
    if (recommendations !== undefined) {
      SetRecommendations(recommendations);
    
    }
  }, [score, recommendations]);

 

  // Log the type and value for debugging
  console.log("Type of recommendations:", typeof Recommendations);
  console.log("Value of recommendations:", Recommendations);

  // Function to parse the recommendations text and convert URLs into <Link> components
  const parseRecommendationsText = (text) => {
    if (!text) return "No recommendations available";

    // Regex to find URLs in the text (simple example, may need refinement)
    const urlRegex = /(https?:\/\/[^\s]+)/g;

    // Split the text by URLs and insert <Link> components
    const parts = text.split(urlRegex);
    return parts.map((part, index) => {
      if (urlRegex.test(part)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="course-link"
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };
 
  return (
    <div className="recommendation-container">
      <h1 className="title">Quiz Result</h1>
      <p className="score">
        Your total score is: {Score !== null ? Score : "N/A"} out of 5
      </p>
      <h2 className="subtitle">Recommended Courses:</h2>
      <div className="recommendations-text">
        {parseRecommendationsText(Recommendations?.text)}
      </div>
    </div>
  );
};

export default Recommendation;
