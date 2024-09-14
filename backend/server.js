import express from 'express';
import db from './config/database.js'; // Importing will trigger the connection
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes.js';
import  geminiroutes from "./routes/geminiroutes.js"
import DashboardRoute from './routes/Dashboard.js';
import passport from 'passport';
import cors from "cors" ; 
import dotenv from 'dotenv';
dotenv.config();
const port = process.env.PORT;
const app = express();

// Middleware setup
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
const coreOptions = {
  origin: "http://localhost:5173" ,
  methods : "GET , POST , PUT ,DELETE , PATCH , HEAD"  , 
  credentials :  true

}
app.use(cors(coreOptions))  ; 



// Initialize Passport after session middleware
app.use(passport.initialize());
app.use(passport.session());

// Use routes
app.use('/auth', authRoutes);
app.use('/gemini' , geminiroutes) ; 
app.use('/profile',  DashboardRoute); // Added dashboard routes

app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});
