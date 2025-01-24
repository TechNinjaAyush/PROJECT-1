import React from "react";
import '../styles/Assign.css' ;

const Assign = ()=>{


    const Send = async () => {
        try {
          // Fetch email list from the server
          const response = await fetch("http://localhost:3000/quiz/email");
          if (!response.ok) {
            console.error("Unable to fetch email of students");
            return;
          }
      
          const emails = await response.json(); // Parse the response
          if (emails.length === 0) {
            console.error("No emails found for students");
            return;
          }
      
          console.log("Emails of students:", emails);
      
          // Get quiz ID from localStorage
          const quizId = localStorage.getItem("quizId");
          if (!quizId) {
            console.error("Quiz ID not found in localStorage");
            return;
          }
      
          // Send quiz link to students
          const sendResponse = await fetch("http://localhost:3000/quiz/send_quiz_link", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({recipients: emails }),
          });
      
          if (!sendResponse.ok) {
            console.error("Failed to send quiz link");
            return;
          }
      
          const result = await sendResponse.json();
          console.log("Quiz link sent successfully:", result);
        } catch (error) {
          console.error("Error sending quiz link to students:", error);
        }
      };



    return(


        <>
          <div  className="Outer_container">
              Are You sure you want to publish quiz ?
               <br />
               <br />
              <div  className="Button">
              <button onClick = {Send}className="yes-btn">Yes</button>
              <button className="no-btn">No</button>

              </div>
          </div>
           
        
        
        </>
    )
}

export  default  Assign ;  