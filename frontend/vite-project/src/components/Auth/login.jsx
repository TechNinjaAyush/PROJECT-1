import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/login.css';
import Registerandlogin from "./RegisterandLogin.jpg";

const Login = () => {
  const loginwithgoogle = () => {
    window.open("http://localhost:3000/auth/google", "_self");
  };

  const [Username, SetUsername] = useState(""); 
  const [password, SetPassword] = useState("");
  const[role , setRole] =  useState("Student") ; 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!Username || !password) {
      alert("Please fill in both fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST", 
        headers: {
          'Content-Type': "application/json", 
        }, 
        body: JSON.stringify({ username: Username, password, role: role }), // Include Role in request
      });

      const data = await response.json(); 
      console.log('Response:', data);
      localStorage.setItem("token", data.token);
      
      if (response.ok  &&  role==="Student") {
        localStorage.setItem("UserId" , Username) ;         
        navigate('/home');
      } 

      else if(response.ok  &&  role=="Teacher"){
        navigate('/Side_bar')  ; 
      }
      else {
        alert(data.message || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error('Error:', error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="image-container">
        <img src={Registerandlogin} alt="Registration" />
      </div>
      <div className="login_form">
        <h2 className="font-bold">Login</h2>
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
            type="password"
            placeholder="Password"
            className="input_field"
            name="password"
            value={password}
            onChange={(e) => SetPassword(e.target.value)}
          /> 

          Select  a  role : 
           <select value={role} onChange={(e) => setRole(e.target.value)} className="role-select">
  <option value="Student">Student</option>
  <option value="Teacher">Teacher</option>
</select>

          <br />
          <br />
          <button type="submit" className="login_button">
            Sign in
          </button>
        </form>

        <br />
        <button className="google_button" onClick={loginwithgoogle}>
          <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google Logo" />
          Sign in with Google
        </button>
        
        <div className="register_option">
          <p>
            Don't have an account? <Link to="/Register">Register Here</Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Login;
