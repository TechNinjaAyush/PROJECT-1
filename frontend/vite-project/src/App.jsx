import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home' ; 
import Title from './pages/QuizTitle';
import Dsatopics from "./components/Assesment/DSA/Dsatopics" 
import Publish from './pages/Publish';
import QuizResult from './components/Recommendation/Quizresult';
import Topic from "./components/Topics" ; 
import Register from './components/Auth/Register';
import Login from './components/Auth/login';
import Side_bar from './pages/Side_bar';
 import Explanation from './pages/Explanation';
import QuestionComponent from './pages/create_quiz';
import Assign from './pages/Assign';
import Showing_quiz  from './pages/QuizQuestions';
import QuizPage from './pages/Quizpage';
import Dashboard from './pages/StudentDashboard';
import QuizHistory from './pages/Quizhistory';
const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                  
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={<Home />} />
                 <Route  path = "/Dsatopics"  element = {<Dsatopics/>}/>
                 <Route path="/QuizResult" element={<QuizResult />} />
                 <Route path="/Topics" element={<Topic />} />
                 <Route  path = "/Side_bar"  element = {<Side_bar/>} />
                 <Route  path = "/QuestionComponent"  element = {<QuestionComponent/>} />
                 <Route  path = "/Explanation"  element = {<Explanation/>} />
                 <Route  path = "/Title"  element = {<Title/>} />
                 <Route  path = "/Publish" element  = {<Publish/>} />
                <Route  path = "/Assign" element  = {<Assign/>} />
                <Route    path = "/Quiz_Questions"  element = {<Showing_quiz/>} />
                 <Route path="/quiz/Question" element={<QuizPage />} />
                 <Route    path = "/Dashboard"  element = {<Dashboard/>} />
                  <Route  path = "/history/:username" element = {<QuizHistory/>} />
                 
    
            </Routes>
        </Router>
    );
}

export default App;
