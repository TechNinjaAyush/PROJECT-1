import React, { useState } from "react";

import '../styles/Explnation.css'
import { useNavigate } from "react-router-dom";

const Explanation = () => {
    const navigate = useNavigate();

    const [explanation, setExplanation] = useState(''); // Initialize with an empty string
    const questionId = localStorage.getItem('question_id');
     console.log("Question id is" , questionId)  ; 
    const handleExplanation = async (e) => {
        if (!questionId) {
            alert("Question is missing");
            return; // Return early
        }

        try {
            const response = await fetch(`http://localhost:3000/quiz/explanation`, {
                method: "POST",
                headers: {
                    'Content-Type': "application/json",
                },
                body: JSON.stringify({
                    explanation: explanation  , // Use the state directly
                    questionId  : localStorage.getItem('question_id')                  
                }),
            });

            if (response.ok) {
                console.log("Explanation is", explanation);
                console.log("Question id is"  ,questionId ) ; 
                alert("Explanation saved successfully!"); // Optional success message
            } else {
                const errorData = await response.json(); // Capture error response
                console.log("Error occurred:", errorData);
            }
        } catch (error) {
            console.error("Error occurred while saving explanation:", error);
        }
        
        navigate(-1);
    };

    const deleteExplanation = () => {
        setExplanation(''); // Reset explanation state
        navigate(-1);
    };

    return (
        <div className="Explanation_container">
            <input 
                type="text" 
                className="Explanation_input"
                placeholder="Type Explanation Here"
                value={explanation} 
                onChange={(e) => setExplanation(e.target.value)}
            />
            <button onClick={handleExplanation} className="Save_Explanation">
                Save
            </button>
            <button onClick={deleteExplanation} className="delete">
                Delete 
            </button>
        </div>
    );
}

export default Explanation;
