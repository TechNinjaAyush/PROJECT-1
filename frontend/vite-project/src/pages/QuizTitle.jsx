import React, { useState } from "react";
import "../styles/Title.css";
import { useNavigate } from "react-router-dom";

const Title = () => {
  const [title, setTitle] = useState(""); // Start with an empty string
  const navigate = useNavigate();
  
  const handleTitle = async (e) => {
    e.preventDefault();

    if (!title) {
      alert("Please set the title");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/quiz/title", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title : title }), // Fixed the key to match the state variable
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      localStorage.setItem('quizId', data._id);
      
      console.log("Response:", data);

      // Navigate to the next component or perform another action here
      if(data){
      navigate("/QuestionComponent");
      } // Navigate after a successful response

      else{
        console.error("Error in fetching data"  , error) ; 
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while setting the title.");
    }
  };

  return (
    <form onSubmit={handleTitle}>
      <div className="Container">
        <input
          type="text"
          className="Title"
          placeholder="Select a title"
          name = "title" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit" className="create">
          Create
        </button>
      </div>
    </form>
  );
};

export default Title;
