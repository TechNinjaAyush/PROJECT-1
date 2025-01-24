import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/publish.css";

const Publish = () => {
  const [loading, setLoading] = useState(false);
  const [quizData, setData] = useState([]);
  const navigate = useNavigate();

  const Navigate = () => {
    navigate("/QuestionComponent");
  };
  const Navigate_to_Student =()=>{
    navigate("/Assign") ; 
    

   
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const quizId = localStorage.getItem("quizId");
        if (!quizId) {
          console.error("No quiz ID found in localStorage");
          setLoading(false);
          return;
        }

        const response = await fetch(`http://localhost:3000/quiz/Question?quizId=${quizId}`);
        if (!response.ok) {
          console.error("Failed to fetch the quiz");
        } else {
          const data = await response.json();
          console.log("data is", data);
          const questions = data.questions;

          console.log("questions are", questions);
          setData(questions);
        }
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log("quizData is", quizData); // Logs after the state is updated
  }, [quizData]); // This will run when quizData state changes

  return (
    <div className="quiz">
      {loading ? (
        <div className="skeleton-container">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="skeleton-item">
              <div className="skeleton-question"></div>
              <div className="skeleton-options">
                {[...Array(4)].map((_, optionIndex) => (
                  <div key={optionIndex} className="skeleton-option"></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <ul className="quiz-list">
          {quizData.map((question, index) => (
            <li key={index} className="quiz-item">
              <div className="question">{question.questionText}</div>
              <div className="options-container">
                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="option-item">
                    {optionIndex + 1}. {option}
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="Buttons">
        <button  onClick = {Navigate_to_Student}className="Publish">Publish</button>
        <button onClick={Navigate} className="Addquestion">Add_Question</button>
      </div>
    </div>
  );
};

export default Publish;
