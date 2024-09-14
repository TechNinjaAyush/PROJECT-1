import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import '../../styles/login.css';
import Registerandlogin from "../../assets/images/Registerandlogin.jpg"

const Login = () => {
    const [Username, SetUsername] = useState(""); 
    const [password, SetPassword] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault(); 
       

        try {



          if (!Username || !password) {
            alert("Please fill in both fields.");
            return;
        }
            const response = await fetch("http://localhost:3000/auth/login", {
                method: "POST", 
                headers: {
                    'Content-Type': "application/json", 
                }, 
                body: JSON.stringify({ username: Username, password: password }),
            });
            

            const data = await response.json(); 
            console.log('Response:', data);
            localStorage.setItem("token" , data.token) ; 
             

            if(response.ok){
                navigate('/home');
            }

            else {
              alert(data.message || "Login failed. Please check your credentials.");
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
         <button type="submit" className="login_button">
           Sign in
         </button>
       </form>

       <div className="register_option">
         <p>
        Don't have an account? <Link to="/Register">Register Here</Link>
         </p>
       </div>
     </div>
   </div>
    );
}

export default Login;