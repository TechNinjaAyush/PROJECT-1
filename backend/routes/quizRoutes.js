 import express from 'express';
import { createQuiz, CreateQuestion ,explanation , QuizData  , Studentdata , Fetching_email  , Sending_mail , Access_quiz , getQuizHistory  , AdminBoard } from '../controllers/Quiz.js';
const quizRoute = express.Router();
quizRoute.post('/title', createQuiz);
quizRoute.post('/question', CreateQuestion);
quizRoute.post('/explanation' , explanation); 
quizRoute.get('/Question' ,  QuizData) ; 
quizRoute.get('/Students' ,  Studentdata) ; 
quizRoute.get('/email' , Fetching_email); 
quizRoute.post('/send_quiz_link' , Sending_mail) ; 
quizRoute.get('/Question/:quizId', Access_quiz);
quizRoute.get('/History/:userId' , getQuizHistory) ; 
quizRoute.get('/username' ,AdminBoard ) ; 
export default quizRoute;

