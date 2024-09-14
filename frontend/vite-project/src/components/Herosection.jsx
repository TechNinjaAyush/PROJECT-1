import React from "react";
import { useNavigate } from "react-router-dom";
import '../styles/hero.css'

const Herosection = () => {
const navigate = useNavigate() ;
const  Topics = ()=>{
  navigate('/Topics'); 

}

  return (
    <>
      <div className="Herosection">
        <div className="bebas-neue-regular">
          <h1>TEST YOUR SKILLS WITH <span className="highlight-text">QUIZZER</span></h1>
          <h3>Challenge yourself, learn, and have fun with our vast collection of quizzes!</h3>
          <button  onClick={Topics}  className="start-quiz-btn">Start a Quiz</button>
          
        </div>
      </div>
    </>
  );
};

export default Herosection;