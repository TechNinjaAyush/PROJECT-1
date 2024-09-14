import React, { useState } from "react";
import { Link, Navigate, useNavigate } from 'react-router-dom';

import "../../styles/register.css";
import Registerandlogin from "../../assets/images/Registerandlogin.jpg"

const Register = () => {
  const [Username, SetUsername] = useState("");
  const [Email, SetEmail] = useState("");
  const [Password, SetPassword] = useState("");
  const navigate = useNavigate();

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
        body: JSON.stringify({ username: Username, email: Email, password: Password }),
      });

      const data = await response.json();
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
          <button type="submit" className="login_button">
            Sign up
          </button>
        </form>

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
