import { Quiz, Question } from "../models/User.js";
import {Student} from "../models/User.js";
import { UserAttemptedQuiz } from '../models/User.js'; // Import the schema
import nodemailer from "nodemailer" ; 
import dotenv from 'dotenv';
dotenv.config();
export const createQuiz = async (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  try {
    const newQuiz = await Quiz.create({ title });
    res.status(201).json(newQuiz);
  } catch (error) {
    console.error("Error creating quiz:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const CreateQuestion = async (req, res) => {
  const { questionText, options, correctAnswerIndex, time, quizId } = req.body;

  // Validate input
  if (
    !questionText ||
    !quizId ||
    !time ||
    !options ||
    !Array.isArray(options) ||
    options.length === 0 ||
    correctAnswerIndex === undefined
  ) {
    return res
      .status(400)
      .json({ message: "All fields are required, including options." });
  }

  try {
    // Find the quiz by its ID
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found." });
    }

    // Create a new question object

    const newQuestion = {
      questionText,
      options,
      correctAnswerIndex,
      time,
    };

    // Push the new question to the quiz's questions array
    quiz.questions.push(newQuestion);
    await quiz.save(); // Save the updated quiz

    res.status(201).json(newQuestion); // Respond with the new question
  } catch (error) {
    res.status(500).json({ message: "Error creating question", error });
  }
};

export const explanation = async (req, res) => {
  const { explanation, questionId } = req.body;

  try {
    const question = Question.findById(questionId);
    if (!question) {
      res.status(404).json({ message: "Question not found " });
    } else {
      question.Explanation = explanation;
      await question.save();
      res.status(201).json("Explanation is saved", question);
    }
  } catch (err) {
    res.status(500).json({ message: "Error in creating explanation ", err });
  }
};

export const QuizData = async (req, res) => {
  try {
    const quizId = req.query.quizId; // Retrieve quizId from query parameters
    if (!quizId) {
      return res.status(400).json({ message: "Quiz ID is required" });
    }

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    res.json(quiz);
  } catch (error) {
    res.status(500).json({ message: "Error fetching quiz", error });
  }
};
export const Studentdata = async (req, res) => {
  try {
    //fetching students
    const Students = await User.find({}, 'username'); // Fetch only usernames

    if (Students.length === 0 || !Students) {
      return res.status(404).json({ message: "Students are not find" });
    } else {
      //if  students are find respond with students data
      return res.status(200).json(Students);
    }
  } catch (error) {
    //for handling server errors
    return res.status(500).json({ message: "internal server error", error });
  }
};

export const  Fetching_email = async(req , res)=>{
  try{
    const students = await Student.find({} , 'email') ; 
    const   emails =   students.map((student)=>student.email) ; 
    return res.status(200).json(emails) ; 

  }

  catch(error){
     return  res.status(500).json({message : "internal server error" , error}) ; 

  }

}

export const Sending_mail = async (req, res) => {
  const  {recipients } = req.body;

  // Create transporter using environment variables
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_ID, // Ensure this is set in your .env file
      pass: process.env.EMAIL_PASS, // Ensure this is set in your .env file
    },
  });

  // Define email options
  const mailOptions = {
    from: process.env.EMAIL_ID, // Use your email from environment variables
    to: recipients,
    subject: 'New Quiz Available!',
    text: `Hello,\n\nA new quiz is available check  youe dashboard for you to attempt\n\n\n\nBest regards,\nYour Team`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    // Respond with a success message
    res.status(200).json({ message: 'Email sent successfully', info: info.response });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email', details: error.message });
  }
};

export const Access_quiz = async (req, res) => {
  try {
    const quizId = req.query.quizId ; 
    if (!quizId) {
      console.error("Quiz ID is required");
      return res.status(400).json({ message: "Quiz ID is required" });
    }

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      console.error(`Quiz with ID ${quizId } not found`);
      return res.status(404).json({ message: "Quiz not found" });
    }

    res.status(200).json(quiz);
  } catch (error) {
    console.error("Error fetching quiz:", error);
    res.status(500).json({ message: "Error fetching quiz", error: error.message });
  }
};

export const getQuizHistory = async (req, res) => {
  try {
    const  {userId}  = req.params;  
   console.log("user id is"  ,  userId) ; 
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    // Fetch quizzes for the user
    const quizzes = await UserAttemptedQuiz.find({ user: userId });

    if (!quizzes.length) {
      return res.status(404).json({ message: 'No quiz history found for this user' });
    }

    // Assuming `username` is part of the quiz documents
    const username = quizzes[0]?.user || 'Unknown User';

    res.status(200).json({ username, quizzes });
  } catch (error) {
    console.error('Error fetching quiz history:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const AdminBoard = async(req ,res)=>{

  try{
   
    const username = await UserAttemptedQuiz.find({} , {user : 1 , _id : 0})  ; 
    if(!username.length){
      return res.status(404).json({message : "failed to fetch username"}) ; 

    }
    return res.status(200).json({username})
   
  }

  catch(error){
    console.error('Error fetching username ', error);
     return res.status(500).json({ message: 'Internal Server Error' });


  }

}