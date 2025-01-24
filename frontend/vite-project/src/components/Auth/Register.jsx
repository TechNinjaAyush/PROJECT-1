import React, { useState } from "react";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import "../../styles/register.css";
import Registerandlogin from "./RegisterandLogin.jpg";

const Register = () => {
  const [Username, SetUsername] = useState("");
  const [Email, SetEmail] = useState("");
  const [Password, SetPassword] = useState("");
  const [Role, SelectRole] = useState("Student"); // Default to Student

  const navigate = useNavigate();
  const RegisterWithGoogle= ()=>{
    window.open("http://localhost:3000/auth/google" , "_self")  ; 
}
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {

      if (!Username || !Password || !Email) {
        alert("Please fill in both fields.");
        return;
    }
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          'Content-Type': "application/json",
        },
        body: JSON.stringify({ username: Username, email: Email, password: Password , role : Role }),
      });

      const data = await response.json();
    console.log("data is" , data)  ;
      if (data) {
        navigate('/login');
    } else {
        // Handle error response
        console.error('Login failed:', data);
    }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container">
         <div className="image-container">
        <img src={Registerandlogin} alt="Registration" />
      </div>
      <div className="login_form">
        <br />
        <h2 className="font-bold">Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            className="input_field"
            name="Username"
            value={Username}
            onChange={(e) => SetUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="Email"
            className="input_field"
            name="Email"
            value={Email}
            onChange={(e) => SetEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="input_field"
            name="password"
            value={Password}
            onChange={(e) => SetPassword(e.target.value)}
          />
          <label htmlFor="Role" className="role-label">Choose a role:</label>
<select value={Role} onChange={(e) => SelectRole(e.target.value)} className="role-select">
  <option value="Student">Student</option>
  <option value="Teacher">Teacher</option>
</select>

               <br />
              <br />
          <button type="submit" className="login_button">
            Sign up
          </button>
        </form>
        <button className="google_button" onClick={RegisterWithGoogle}>
          <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google Logo" />
          Sign up with Google
        </button>
        <div className="register_option">
          <p>
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
