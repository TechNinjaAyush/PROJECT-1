import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Auth/login';
import Register from './components/Auth/Register';
import Home from './pages/Home' ; 
import Dsatopics from "./components/Assesment/DSA/Dsatopics" 
import Dashboard from './pages/Dashboard';
import QuizResult from './components/Recommendation/Quizresult';
import Topic from "./components/Topics" ; 
import Herosection from './components/Herosection';
const App = () => {
    return (
        <Router>
            <Routes>
                {}
                <Route path="/" element={<Navigate to="/login" />} />

                {}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={<Home />} />
                 <Route  path = "/Dsatopics"  element = {<Dsatopics/>}/>
                 <Route path="/QuizResult" element={<QuizResult />} />
                 <Route path="/Dashboard" element={<Dashboard />} />
                 <Route path="/Topics" element={<Topic />} />
                


            </Routes>
        </Router>
    );
}

export default App;
